import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import prisma from "@/lib/prisma"

export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not allowed in production" }, { status: 403 })
  }

  const email = "test@example.com"
  const name = "testuser"
  const plainPassword = "Password123!"

  try {
    const hashed = await bcrypt.hash(plainPassword, 10)

    const user = await prisma.user.upsert({
      where: { email },
      update: { name, password: hashed },
      create: { email, name, password: hashed },
    })

    return NextResponse.json({
      ok: true,
      user: { id: user.id, email: user.email, name: user.name },
      credentials: { identifier: email, password: plainPassword, altIdentifier: name },
      note: "Use identifier as email or username with the password above.",
    })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "Unknown error" }, { status: 500 })
  }
}
