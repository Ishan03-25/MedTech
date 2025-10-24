import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import prisma from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const { identifier, password } = await req.json()
    if (!identifier || !password) {
      return NextResponse.json({ ok: false, reason: "both" }, { status: 400 })
    }

    const byEmail = identifier.includes("@")
    const user = byEmail
      ? await prisma.user.findFirst({ where: { email: { equals: identifier, mode: "insensitive" } } })
      : await prisma.user.findFirst({ where: { OR: [ { name: { equals: identifier, mode: "insensitive" } }, { email: { equals: identifier, mode: "insensitive" } } ] } })

    if (!user || !user.password) {
      return NextResponse.json({ ok: false, reason: "identifier" }, { status: 200 })
    }

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      return NextResponse.json({ ok: false, reason: "password" }, { status: 200 })
    }

    return NextResponse.json({ ok: true }, { status: 200 })
  } catch (e) {
    return NextResponse.json({ ok: false, reason: "unknown" }, { status: 500 })
  }
}
