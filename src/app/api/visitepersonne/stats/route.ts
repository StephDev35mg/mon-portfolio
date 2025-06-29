import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
  // Date il y a 30 jours
  const start = new Date()
  start.setDate(start.getDate() - 29)
  start.setHours(0, 0, 0, 0)

  // Récupère toutes les visites depuis 30 jours
  const visites = await prisma.visitePersonne.findMany({
    where: { date: { gte: start } },
    orderBy: { date: "asc" },
  })

  // Grouper par jour
  const stats: Record<string, number> = {}
  for (let i = 0; i < 30; i++) {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    const key = d.toISOString().slice(0, 10)
    stats[key] = 0
  }
  visites.forEach(v => {
    const key = v.date.toISOString().slice(0, 10)
    if (stats[key] !== undefined) stats[key]++
  })

  // Retourne un tableau [{ date: 'YYYY-MM-DD', count: n }]
  const result = Object.entries(stats).map(([date, count]) => ({ date, count }))
  return NextResponse.json(result)
} 