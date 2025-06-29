'use client'
import { useEffect, useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { SiteHeader } from "@/components/site-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export default function SkillsPage() {
  const [skills, setSkills] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ nameSkills: '', imageSkills: '', category: '' })
  const [adding, setAdding] = useState(false)

  // Fetch skills
  useEffect(() => {
    fetchSkills()
  }, [])

  const fetchSkills = async () => {
    setLoading(true)
    const res = await fetch('/api/skills')
    if (res.ok) {
      setSkills(await res.json())
    }
    setLoading(false)
  }

  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault()
    setAdding(true)
    const res = await fetch('/api/skills', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      toast('Skill ajouté !', { description: 'Le skill a bien été ajouté.' })
      setShowModal(false)
      setForm({ nameSkills: '', imageSkills: '', category: '' })
      fetchSkills()
    } else {
      const data = await res.json()
      toast('Erreur', { description: data.error || 'Erreur lors de l\'ajout.' })
    }
    setAdding(false)
  }

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
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">Skills</h1>
              <p className="text-muted-foreground">Retrouvez ici vos compétences principales.</p>
            </div>
            <Button onClick={() => setShowModal(true)} className="h-10">Ajouter un skill</Button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <svg className="animate-spin h-10 w-10 text-purple-600" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
            </div>
          ) : skills.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">Aucun skill pour l'instant.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {skills.map((skill) => (
                <Card key={skill.id} className="flex flex-col items-center p-4">
                  <img src={skill.imageSkills} alt={skill.nameSkills} className="w-20 h-20 object-cover rounded-full mb-4 border" />
                  <CardHeader className="p-0 mb-2">
                    <CardTitle className="text-lg text-center">{skill.nameSkills}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 text-center">
                    <span className="inline-block px-2 py-1 text-xs rounded bg-muted text-muted-foreground">{skill.category}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Modal d'ajout */}
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg w-full max-w-sm">
                <h2 className="text-xl font-bold mb-4">Ajouter un skill</h2>
                <form onSubmit={handleAddSkill} className="space-y-4">
                  <div>
                    <Label htmlFor="nameSkills">Nom du skill</Label>
                    <Input id="nameSkills" value={form.nameSkills} onChange={e => setForm(f => ({ ...f, nameSkills: e.target.value }))} required />
                  </div>
                  <div>
                    <Label htmlFor="imageSkills">Image (URL)</Label>
                    <Input id="imageSkills" value={form.imageSkills} onChange={e => setForm(f => ({ ...f, imageSkills: e.target.value }))} required />
                  </div>
                  <div>
                    <Label htmlFor="category">Catégorie</Label>
                    <Input id="category" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} required />
                  </div>
                  <div className="flex gap-2">
                    <Button type="button" variant="outline" className="flex-1" onClick={() => setShowModal(false)} disabled={adding}>Annuler</Button>
                    <Button type="submit" className="flex-1" disabled={adding}>
                      {adding ? (
                        <svg className="animate-spin h-5 w-5 mx-auto" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                        </svg>
                      ) : (
                        "Ajouter"
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
} 