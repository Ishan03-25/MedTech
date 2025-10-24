import type { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from './prisma'
import bcrypt from 'bcryptjs'

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma as any),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        identifier: { label: 'Email or Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const identifier = credentials?.identifier?.toString().trim()
        const password = credentials?.password?.toString()
        if (!identifier || !password) return null

        // Use case-insensitive exact matching to avoid unexpected finds.
        // Prefer email match when identifier looks like an email.
        let user = null
        try {
          if (identifier.includes('@')) {
            user = await prisma.user.findFirst({ where: { email: { equals: identifier, mode: 'insensitive' } } })
          } else {
            user = await prisma.user.findFirst({ where: { OR: [ { name: { equals: identifier, mode: 'insensitive' } }, { email: { equals: identifier, mode: 'insensitive' } } ] } })
          }
        } catch (e) {
          // In case the database/provider doesn't support `mode: 'insensitive'`, fall back to simple equality
          if (identifier.includes('@')) {
            user = await prisma.user.findFirst({ where: { email: identifier } })
          } else {
            user = await prisma.user.findFirst({ where: { OR: [{ name: identifier }, { email: identifier }] } })
          }
        }

        // Debugging aid: log which identifier attempted and which user id (if any) was found.
        // Do NOT log passwords.
        console.debug('auth: attempt', { identifier, foundUserId: user?.id ?? null })

        if (!user || !user.password) return null
        const valid = await bcrypt.compare(password, user.password)
        if (!valid) return null
        return { id: user.id, name: user.name ?? undefined, email: user.email ?? undefined }
      }
    }),
    ...(process.env.GITHUB_ID && process.env.GITHUB_SECRET
      ? [
          GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
          })
        ]
      : [])
  ],
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token, user }) {
      // attach user id to session safely for both first sign-in and subsequent requests
      if (session.user) {
        // @ts-ignore
        session.user.id = (user?.id ?? token?.sub) as string | undefined
      }
      return session
    }
  }
}

// Intentionally no default export here. The API route constructs the NextAuth handler.
