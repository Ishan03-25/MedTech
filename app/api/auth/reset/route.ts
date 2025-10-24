import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const token: string = body?.token
    const email: string = body?.email
    const password: string = body?.password

    if (!token || !email || !password) return NextResponse.json({ ok: false, error: 'Missing fields' }, { status: 400 })

    const v = await prisma.verificationToken.findUnique({ where: { token } })
    if (!v || v.identifier !== email) return NextResponse.json({ ok: false, error: 'Invalid token' }, { status: 400 })

    if (v.expires < new Date()) {
      // expired
      await prisma.verificationToken.deleteMany({ where: { token } })
      return NextResponse.json({ ok: false, error: 'Token expired' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return NextResponse.json({ ok: false, error: 'User not found' }, { status: 400 })

    const hashed = await bcrypt.hash(password, 10)
    await prisma.user.update({ where: { email }, data: { password: hashed } })

    // consume token
    await prisma.verificationToken.deleteMany({ where: { token } })

    // Optionally, invalidate sessions here (left as future improvement)

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('reset error', err)
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 })
  }
}
