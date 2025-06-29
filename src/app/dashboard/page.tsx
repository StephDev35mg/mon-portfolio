'use client'
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { SiteHeader } from "@/components/site-header"
import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { User, Folder, Mail, Eye } from "lucide-react"
import dynamic from "next/dynamic"

// ChartAreaInteractive dynamique pour éviter SSR
const ChartAreaInteractive = dynamic(() => import("@/components/chart-area-interactive").then(mod => mod.ChartAreaInteractive), { ssr: false })

export default function DashboardPage() {
  const [totals, setTotals] = useState({
    skills: 0,
    projects: 0,
    messages: 0,
    visites: 0,
    loading: true,
  })
  const [visiteStats, setVisiteStats] = useState<{ date: string, count: number }[]>([])

  useEffect(() => {
    async function fetchTotals() {
      const [skills, projects, messages, visites, stats] = await Promise.all([
        fetch("/api/skills").then(r => r.json()),
        fetch("/api/projects").then(r => r.json()),
        fetch("/api/messages").then(r => r.json()),
        fetch("/api/visitepersonne").then(r => r.json()),
        fetch("/api/visitepersonne/stats").then(r => r.json()),
      ])
      setTotals({
        skills: Array.isArray(skills) ? skills.length : 0,
        projects: Array.isArray(projects) ? projects.length : 0,
        messages: Array.isArray(messages) ? messages.length : 0,
        visites: visites?.total || 0,
        loading: false,
      })
      setVisiteStats(Array.isArray(stats) ? stats : [])
    }
    fetchTotals()
  }, [])

  const cards = [
    {
      label: "Skills",
      value: totals.skills,
      icon: <User className="w-7 h-7 text-white drop-shadow" />, 
      gradient: "from-indigo-500 via-purple-500 to-pink-500",
    },
    {
      label: "Projects",
      value: totals.projects,
      icon: <Folder className="w-7 h-7 text-white drop-shadow" />, 
      gradient: "from-green-400 via-blue-500 to-purple-500",
    },
    {
      label: "Messages",
      value: totals.messages,
      icon: <Mail className="w-7 h-7 text-white drop-shadow" />, 
      gradient: "from-pink-500 via-red-500 to-yellow-500",
    },
    {
      label: "Visites",
      value: totals.visites,
      icon: <Eye className="w-7 h-7 text-white drop-shadow" />, 
      gradient: "from-yellow-400 via-orange-500 to-pink-500",
    },
  ]

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-col p-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mb-8">Bienvenue sur votre tableau de bord !</p>

          {/* Modern Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {cards.map((card, i) => (
              <Card
                key={card.label}
                className={`relative overflow-hidden shadow-xl rounded-2xl p-6 flex flex-col items-start justify-between min-h-[140px] bg-gradient-to-br ${card.gradient} transition-transform hover:scale-[1.03] hover:shadow-2xl group`}
              >
                <div className="absolute right-4 top-4 opacity-30 group-hover:opacity-50 transition-opacity scale-125">
                  {card.icon}
                </div>
                <div className="z-10">
                  <div className="text-lg font-semibold text-white/90 mb-2 drop-shadow">{card.label}</div>
                  <div className="text-4xl font-extrabold text-white drop-shadow animate-pulse">{totals.loading ? <span className="animate-spin inline-block w-6 h-6 border-4 border-white border-t-transparent rounded-full"></span> : card.value}</div>
                </div>
              </Card>
            ))}
          </div>

          {/* Graphique d'évolution des visites */}
          <div className="mb-10">
            <Card className="p-6">
              <div className="mb-4 text-xl font-bold text-primary">Évolution des visites (30 derniers jours)</div>
              <ChartAreaInteractive data={visiteStats} />
            </Card>
          </div>

        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
