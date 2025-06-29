"use client"

import * as React from "react"
import {
  IconBrain,
  IconBriefcase,
 
  IconDashboard,
  
  IconFolder,
  IconMessage2
  
} from "@tabler/icons-react"
import { useSession } from "next-auth/react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Skills",
      url: "/skills",
      icon: IconBrain,
    },
    {
      title: "Project",
      url: "/projects",
      icon: IconFolder,
    },
    {
      title: "Experiences",
      url: "/experience",
      icon: IconBriefcase,
    },
    {
      title: "Messages",
      url: "/messages",
      icon: IconMessage2,
    },
  ],
  
    
  
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession()
  const user = session?.user

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarContent>
        <NavMain items={data.navMain} />
        
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: user?.name || "",
            email: user?.email || "",
            avatar: user?.image || "/avatars/shadcn.jpg",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  )
}
