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
  const { titleProject, imageProject, description_P, tech, liengithub, demo } = data
  // Vérifie que le projet appartient à l'utilisateur
  const project = await prisma.projects.findUnique({ where: { id: Number(id) } })
  if (!project || project.userId !== user.id) {
    return NextResponse.json({ error: "Not found or forbidden" }, { status: 404 })
  }
  const updated = await prisma.projects.update({
    where: { id: Number(id) },
    data: { titleProject, imageProject, description_P, tech, liengithub, demo },
  })
  return NextResponse.json(updated)
} 