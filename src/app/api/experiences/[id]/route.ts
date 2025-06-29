import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const user = await prisma.user.findUnique({ where: { email: session.user.email } })
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }
  const id = params.id
  const data = await req.json()
  const { titleExperience, company, period, descriptionExp } = data
  // Vérifie que l'expérience appartient à l'utilisateur
  const experience = await prisma.experiences.findUnique({ where: { id: Number(id) } })
  if (!experience || experience.userId !== user.id) {
    return NextResponse.json({ error: "Not found or forbidden" }, { status: 404 })
  }
  const updated = await prisma.experiences.update({
    where: { id: Number(id) },
    data: { titleExperience, company, period, descriptionExp },
  })
  return NextResponse.json(updated)
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const user = await prisma.user.findUnique({ where: { email: session.user.email } })
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }
  const id = params.id
  const experience = await prisma.experiences.findUnique({ where: { id: Number(id) } })
  if (!experience || experience.userId !== user.id) {
    return NextResponse.json({ error: "Not found or forbidden" }, { status: 404 })
  }
  await prisma.experiences.delete({ where: { id: Number(id) } })
  return NextResponse.json({ success: true })
} 