import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
  const total = await prisma.visitePersonne.count()
  return NextResponse.json({ total })
}

export async function POST(req: NextRequest) {
  // Récupère l'IP du client
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0] ||
    req.headers.get("x-real-ip") ||
    (req as any).ip ||
    "unknown"

  // Date du jour (00:00)
  const now = new Date()
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)

  // Vérifie si une visite existe déjà aujourd'hui pour cette IP
  const existing = await prisma.visitePersonne.findFirst({
    where: {
      ip: String(ip),
      date: {
        gte: startOfDay,
        lt: endOfDay,
      },
    },
  })
  if (existing) {
    return NextResponse.json(existing)
  }

  // Sinon, enregistre la visite
  const visite = await prisma.visitePersonne.create({
    data: { ip: String(ip) },
  })
  return NextResponse.json(visite)
} 