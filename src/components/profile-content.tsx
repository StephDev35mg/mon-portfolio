'use client'
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Lock, Save } from "lucide-react"
import { toast } from "sonner"

interface ProfileContentProps {
  user: {
    name?: string
    email?: string
  }
}

export function ProfileContent({ user }: ProfileContentProps) {
  // Etats pour le profil
  const [name, setName] = useState(user.name || "")
  const [email, setEmail] = useState(user.email || "")
  const [profileLoading, setProfileLoading] = useState(false)
  const [profileMsg, setProfileMsg] = useState<string | null>(null)

  // Etats pour le mot de passe
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordLoading, setPasswordLoading] = useState(false)
  const [passwordMsg, setPasswordMsg] = useState<string | null>(null)

  // Sauvegarder profil
  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setProfileLoading(true)
    setProfileMsg(null)
    try {
      const res = await fetch("/api/account/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      })
      const data = await res.json()
      if (res.ok) {
        toast.success("Profil mis à jour !", {
          description: "Vos informations ont bien été enregistrées.",
        })
      } else {
        setProfileMsg(data.error || "Erreur lors de la sauvegarde.")
      }
    } catch (err) {
      setProfileMsg("Erreur réseau.")
    }
    setProfileLoading(false)
  }

  // Changer mot de passe
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordLoading(true)
    setPasswordMsg(null)
    if (newPassword !== confirmPassword) {
      setPasswordMsg("Les mots de passe ne correspondent pas.")
      setPasswordLoading(false)
      return
    }
    try {
      const res = await fetch("/api/account/password", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ oldPassword, newPassword }),
      })
      const data = await res.json()
      if (res.ok) {
        setPasswordMsg("Mot de passe changé !")
        setOldPassword("")
        setNewPassword("")
        setConfirmPassword("")
        toast("Mot de passe changé !", {
          description: "Votre mot de passe a été mis à jour avec succès.",
        })
      } else {
        setPasswordMsg(data.error || "Erreur lors du changement de mot de passe.")
      }
    } catch (err) {
      setPasswordMsg("Erreur réseau.")
    }
    setPasswordLoading(false)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
      {/* Informations Personnelles */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Informations Personnelles
          </CardTitle>
          <CardDescription>Modifiez vos informations de profil</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleProfileSave} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom complet</Label>
              <Input id="name" value={name} onChange={e => setName(e.target.value)} placeholder="Entrez votre nom" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Adresse email</Label>
              <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Entrez votre email" />
            </div>
            <Button className="w-full" type="submit" disabled={profileLoading}>
              {profileLoading ? (
                <svg className="animate-spin h-5 w-5 mx-auto" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Sauvegarder les modifications
                </>
              )}
            </Button>
            {profileMsg && <div className="text-center text-sm mt-2 text-muted-foreground">{profileMsg}</div>}
          </form>
        </CardContent>
      </Card>

      {/* Sécurité et Mot de Passe */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Sécurité et Mot de Passe
          </CardTitle>
          <CardDescription>Gérez votre mot de passe et paramètres de sécurité</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Mot de passe actuel</Label>
              <Input id="current-password" type="password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} placeholder="Entrez votre mot de passe actuel" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">Nouveau mot de passe</Label>
              <Input id="new-password" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Entrez un nouveau mot de passe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
              <Input id="confirm-password" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirmez le nouveau mot de passe" />
            </div>
            <Button className="w-full" variant="outline" type="submit" disabled={passwordLoading}>
              {passwordLoading ? (
                <svg className="animate-spin h-5 w-5 mx-auto" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
              ) : (
                <>
                  <Lock className="w-4 h-4 mr-2" />
                  Changer le mot de passe
                </>
              )}
            </Button>
            {passwordMsg && <div className={`text-center text-sm mt-2 ${passwordMsg.includes('!') ? 'text-green-600' : 'text-red-600'}`}>{passwordMsg}</div>}
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 