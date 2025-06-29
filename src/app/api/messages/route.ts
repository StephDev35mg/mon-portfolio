import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  // On récupère tous les messages, triés du plus récent au plus ancien
  const messages = await prisma.message.findMany({
    orderBy: { createdAt: "desc" },
  })
  return NextResponse.json(messages)
}

export async function POST(req: NextRequest) {
  const data = await req.json()
  const { name, email, subject, commentaire } = data
  if (!name || !email || !subject) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 })
  }
  const message = await prisma.message.create({
    data: { name, email, subject, commentaire },
  })
  return NextResponse.json(message)
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 })
  }
  try {
    await prisma.message.delete({ where: { id: Number(id) } })
    return NextResponse.json({ success: true })
  } catch (e) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }
} 