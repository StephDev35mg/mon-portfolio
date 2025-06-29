import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
  
  const projects = await prisma.projects.findMany()
  return NextResponse.json(projects)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const user = await prisma.user.findUnique({ where: { email: session.user.email } })
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }
  const data = await req.json()
  const { titleProject, imageProject, description_P, tech, liengithub, demo } = data
  if (!titleProject || !imageProject || !description_P || !tech) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 })
  }
  const project = await prisma.projects.create({
    data: {
      titleProject,
      imageProject,
      description_P,
      tech,
      liengithub,
      demo,
      userId: user.id,
    },
  })
  return NextResponse.json(project)
} 