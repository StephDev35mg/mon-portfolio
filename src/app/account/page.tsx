import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { SiteHeader } from "@/components/site-header"
import { ProfileHeader } from "@/components/profile-header"
import { ProfileContent } from "@/components/profile-content"

export default async function AccountPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  const user = {
    name: session.user?.name || "",
    email: session.user?.email || "",
    image: session.user?.image || "/steph.jpg",
    location: "", // Ajoute ici si tu as la donnée
    joined: "",   // Ajoute ici si tu as la donnée
    badge: "Pro Member", // Exemple, à adapter
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
        <div className="flex flex-1 flex-col min-h-screen bg-background">
          <div className="container mx-auto px-4 py-8 max-w-4xl">
            <ProfileHeader user={user} />
            <ProfileContent user={user} />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
} 