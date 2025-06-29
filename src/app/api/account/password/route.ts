import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { PrismaClient } from "@prisma/client"
import bcryptjs from "bcryptjs"

const prisma = new PrismaClient()

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const data = await req.json()
  const { oldPassword, newPassword } = data

  const user = await prisma.user.findUnique({ where: { email: session.user.email } })
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  const isValid = await bcryptjs.compare(oldPassword ?? '', user.password)
  if (!isValid) {
    return NextResponse.json({ error: "Invalid current password" }, { status: 400 })
  }

  const hashed = await bcryptjs.hash(newPassword, 10)
  await prisma.user.update({
    where: { email: session.user.email },
    data: { password: hashed },
  })
  return NextResponse.json({ success: true })
} 