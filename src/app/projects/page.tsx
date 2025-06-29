'use client'
import { useEffect, useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { SiteHeader } from "@/components/site-header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<any | null>(null)
  const [form, setForm] = useState({
    titleProject: '',
    imageProject: '',
    description_P: '',
    tech: '',
    liengithub: '',
    demo: ''
  })
  const [saving, setSaving] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    setLoading(true)
    const res = await fetch('/api/projects')
    if (res.ok) {
      setProjects(await res.json())
    }
    setLoading(false)
  }

  const openAddModal = () => {
    setEditing(null)
    setForm({ titleProject: '', imageProject: '', description_P: '', tech: '', liengithub: '', demo: '' })
    setShowModal(true)
  }

  const openEditModal = (project: any) => {
    setEditing(project)
    setForm({
      titleProject: project.titleProject || '',
      imageProject: project.imageProject || '',
      description_P: project.description_P || '',
      tech: project.tech || '',
      liengithub: project.liengithub || '',
      demo: project.demo || ''
    })
    setShowModal(true)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0])
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    let imageUrl = form.imageProject
    if (imageFile) {
      const formData = new FormData()
      formData.append('file', imageFile)
      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
      if (uploadRes.ok) {
        const data = await uploadRes.json()
        imageUrl = data.url
      } else {
        toast('Erreur', { description: 'Erreur l\'upload de l\'image.' })
        setSaving(false)
        return
      }
    }
    let res
    if (editing) {
      res = await fetch(`/api/projects/${editing.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, imageProject: imageUrl }),
      })
    } else {
      res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, imageProject: imageUrl }),
      })
    }
    if (res.ok) {
      toast(editing ? 'Projet modifié !' : 'Projet ajouté !', { description: editing ? 'Le projet a bien été modifié.' : 'Le projet a bien été ajouté.' })
      setShowModal(false)
      setForm({ titleProject: '', imageProject: '', description_P: '', tech: '', liengithub: '', demo: '' })
      setEditing(null)
      setImageFile(null)
      fetchProjects()
    } else {
      const data = await res.json()
      toast('Erreur', { description: data.error || 'Erreur lors de la sauvegarde.' })
    }
    setSaving(false)
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
              <h1 className="text-3xl font-bold">Projects</h1>
              <p className="text-muted-foreground">Vos projets récents et en cours s'affichent ici.</p>
            </div>
            <Button onClick={openAddModal} className="h-10">Ajouter un projet</Button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <svg className="animate-spin h-10 w-10 text-purple-600" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">Aucun projet pour l'instant.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="flex flex-col p-4">
                  <img src={project.imageProject} alt={project.titleProject} className="w-full h-32 object-cover rounded-lg mb-4 border" />
                  <CardHeader className="p-0 mb-2">
                    <CardTitle className="text-lg">{project.titleProject}</CardTitle>
                    <CardDescription className="truncate text-xs mt-1">{project.tech}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0 flex-1 flex flex-col">
                    <p className="text-sm mb-2 line-clamp-3">{project.description_P}</p>
                    <div className="flex gap-2 mt-auto">
                      {project.liengithub && <a href={project.liengithub} target="_blank" rel="noopener noreferrer" className="text-xs underline text-blue-600">GitHub</a>}
                      {project.demo && <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-xs underline text-green-600">Demo</a>}
                    </div>
                    <Button size="sm" variant="outline" className="mt-4" onClick={() => openEditModal(project)}>Éditer</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Modal d'ajout/édition */}
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">{editing ? 'Éditer le projet' : 'Ajouter un projet'}</h2>
                <form onSubmit={handleSave} className="space-y-4">
                  <div>
                    <Label htmlFor="titleProject">Titre</Label>
                    <Input id="titleProject" value={form.titleProject} onChange={e => setForm(f => ({ ...f, titleProject: e.target.value }))} required />
                  </div>
                  <div>
                    <Label htmlFor="imageProject">Image (URL)</Label>
                    <Input id="imageProject" value={form.imageProject} onChange={e => setForm(f => ({ ...f, imageProject: e.target.value }))} />
                  </div>
                  <div>
                    <Label htmlFor="imageFile">Image (upload)</Label>
                    <Input id="imageFile" type="file" accept="image/*" onChange={handleFileChange} />
                  </div>
                  {/* Aperçu de l'image */}
                  {(imageFile || form.imageProject) && (
                    <div className="my-2">
                      <img
                        src={imageFile ? URL.createObjectURL(imageFile) : form.imageProject}
                        alt="Aperçu"
                        className="w-full h-32 object-cover rounded-lg border"
                      />
                    </div>
                  )}
                  <div>
                    <Label htmlFor="description_P">Description</Label>
                    <Textarea id="description_P" value={form.description_P} onChange={e => setForm(f => ({ ...f, description_P: e.target.value }))} required />
                  </div>
                  <div>
                    <Label htmlFor="tech">Technologies</Label>
                    <Input id="tech" value={form.tech} onChange={e => setForm(f => ({ ...f, tech: e.target.value }))} required />
                  </div>
                  <div>
                    <Label htmlFor="liengithub">Lien GitHub</Label>
                    <Input id="liengithub" value={form.liengithub} onChange={e => setForm(f => ({ ...f, liengithub: e.target.value }))} />
                  </div>
                  <div>
                    <Label htmlFor="demo">Lien Demo</Label>
                    <Input id="demo" value={form.demo} onChange={e => setForm(f => ({ ...f, demo: e.target.value }))} />
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