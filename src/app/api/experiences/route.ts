import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
  const experiences = await prisma.experiences.findMany()
  return NextResponse.json(experiences)
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
  const { titleExperience, company, period, descriptionExp } = data
  if (!titleExperience || !company || !period || !descriptionExp) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 })
  }
  const experience = await prisma.experiences.create({
    data: {
      titleExperience,
      company,
      period,
      descriptionExp,
      userId: user.id,
    },
  })
  return NextResponse.json(experience)
} 