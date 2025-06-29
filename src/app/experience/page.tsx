'use client'
import { useEffect, useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

export default function ExperiencesPage() {
  const [experiences, setExperiences] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<any | null>(null)
  const [form, setForm] = useState({
    titleExperience: '',
    company: '',
    period: '',
    descriptionExp: ''
  })
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<number | null>(null)

  useEffect(() => {
    fetchExperiences()
  }, [])

  const fetchExperiences = async () => {
    setLoading(true)
    const res = await fetch('/api/experiences')
    if (res.ok) {
      setExperiences(await res.json())
    }
    setLoading(false)
  }

  const openAddModal = () => {
    setEditing(null)
    setForm({ titleExperience: '', company: '', period: '', descriptionExp: '' })
    setShowModal(true)
  }

  const openEditModal = (exp: any) => {
    setEditing(exp)
    setForm({
      titleExperience: exp.titleExperience || '',
      company: exp.company || '',
      period: exp.period || '',
      descriptionExp: exp.descriptionExp || ''
    })
    setShowModal(true)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    let res
    if (editing) {
      res = await fetch(`/api/experiences/${editing.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
    } else {
      res = await fetch('/api/experiences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
    }
    if (res.ok) {
      toast(editing ? 'Expérience modifiée !' : 'Expérience ajoutée !', { description: editing ? 'L\'expérience a bien été modifiée.' : 'L\'expérience a bien été ajoutée.' })
      setShowModal(false)
      setForm({ titleExperience: '', company: '', period: '', descriptionExp: '' })
      setEditing(null)
      fetchExperiences()
    } else {
      const data = await res.json()
      toast('Erreur', { description: data.error || 'Erreur lors de la sauvegarde.' })
    }
    setSaving(false)
  }

  const handleDelete = async (id: number) => {
    setDeletingId(id)
    const res = await fetch(`/api/experiences/${id}`, { method: 'DELETE' })
    if (res.ok) {
      toast('Expérience supprimée !', { description: 'L\'expérience a bien été supprimée.' })
      fetchExperiences()
    } else {
      const data = await res.json()
      toast('Erreur', { description: data.error || 'Erreur lors de la suppression.' })
    }
    setDeletingId(null)
  }

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      } as React.CSSProperties}
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-col p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">Experiences</h1>
              <p className="text-muted-foreground">Votre parcours professionnel et vos expériences.</p>
            </div>
            <Button onClick={openAddModal} className="h-10">Ajouter une expérience</Button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <svg className="animate-spin h-10 w-10 text-purple-600" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
            </div>
          ) : experiences.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">Aucune expérience pour l'instant.</div>
          ) : (
            <div className="flex flex-col gap-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1">
                    <div className="font-semibold text-lg text-purple-900 dark:text-purple-200">{exp.titleExperience}</div>
                    <div className="text-sm text-muted-foreground">{exp.company} • {exp.period}</div>
                    <div className="mt-2 text-sm">{exp.descriptionExp}</div>
                  </div>
                  <div className="flex gap-2 mt-2 sm:mt-0">
                    <Button size="sm" variant="outline" onClick={() => openEditModal(exp)}>Éditer</Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(exp.id)} disabled={deletingId === exp.id}>
                      {deletingId === exp.id ? (
                        <svg className="animate-spin h-4 w-4 mx-auto" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                      ) : (
                        "Supprimer"
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Modal d'ajout/édition */}
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">{editing ? 'Éditer l\'expérience' : 'Ajouter une expérience'}</h2>
                <form onSubmit={handleSave} className="space-y-4">
                  <div>
                    <Label htmlFor="titleExperience">Titre</Label>
                    <Input id="titleExperience" value={form.titleExperience} onChange={e => setForm(f => ({ ...f, titleExperience: e.target.value }))} required />
                  </div>
                  <div>
                    <Label htmlFor="company">Entreprise</Label>
                    <Input id="company" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} required />
                  </div>
                  <div>
                    <Label htmlFor="period">Période</Label>
                    <Input id="period" value={form.period} onChange={e => setForm(f => ({ ...f, period: e.target.value }))} required />
                  </div>
                  <div>
                    <Label htmlFor="descriptionExp">Description</Label>
                    <Textarea id="descriptionExp" value={form.descriptionExp} onChange={e => setForm(f => ({ ...f, descriptionExp: e.target.value }))} required />
                  </div>
                  <div className="flex gap-2">
                    <Button type="button" variant="outline" className="flex-1" onClick={() => setShowModal(false)} disabled={saving}>Annuler</Button>
                    <Button type="submit" className="flex-1" disabled={saving}>
                      {saving ? (
                        <svg className="animate-spin h-5 w-5 mx-auto" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                      ) : (
                        editing ? 'Enregistrer' : 'Ajouter'
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