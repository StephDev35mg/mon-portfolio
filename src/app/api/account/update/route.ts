import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const data = await req.json()
  const { name, email } = data

  try {
    const user = await prisma.user.update({
      where: { email: session.user.email },
      data: { nameUser: name, email },
    })
    return NextResponse.json({ user })
  } catch (error) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 })
  }
} 