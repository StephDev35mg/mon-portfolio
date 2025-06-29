import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
  
  
  const skills = await prisma.skills.findMany()
  return NextResponse.json(skills)
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
  const { nameSkills, imageSkills, category } = data
  if (!nameSkills || !imageSkills || !category) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 })
  }
  const skill = await prisma.skills.create({
    data: {
      nameSkills,
      imageSkills,
      category,
      userId: user.id,
    },
  })
  return NextResponse.json(skill)
} 