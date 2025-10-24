import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../lib/prisma'
import crypto from 'node:crypto'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const email: string = body?.email
    if (!email) return NextResponse.json({ ok: false, error: 'Email is required' }, { status: 400 })

    const user = await prisma.user.findUnique({ where: { email } })
    // Always return success to avoid enumerating emails
    if (!user) return NextResponse.json({ ok: true })

    // Remove existing tokens for this identifier
    await prisma.verificationToken.deleteMany({ where: { identifier: email } })

    const token = crypto.randomBytes(32).toString('hex')
    const expires = new Date(Date.now() + 1000 * 60 * 60) // 1 hour

    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token,
        expires,
      },
    })

    const baseUrl = process.env.NEXTAUTH_URL || process.env.APP_URL || 'http://localhost:3000'
    const resetUrl = `${baseUrl}/auth/reset?token=${encodeURIComponent(token)}&email=${encodeURIComponent(email)}`

    // No SMTP configured — log the reset URL for development/testing. Replace with real email sending in production.
    console.log(`Password reset requested for ${email}. Reset URL: ${resetUrl}`)

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('request-reset error', err)
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 })
  }
}
