"use client"

import * as React from "react"
import Link from "next/link"
import {
  Briefcase,
  FileText,
  LayoutDashboard,
  Mail,
  Settings,
  Users,
  LogOut,
  Plus,
  Star,
} from "lucide-react"
import { useSession, signOut } from "next-auth/react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function AdminSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession()

  const adminData = {
    user: {
      name: session?.user?.name || "Admin",
      email: session?.user?.email || "admin@example.com",
      avatar: session?.user?.image || "/avatars/admin.jpg",
    },
    navMain: [
      {
        title: "Dashboard",
        url: "/admin/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Projects",
        url: "/admin/projects",
        icon: Briefcase,
      },
      {
        title: "Blog",
        url: "/admin/blog",
        icon: FileText,
      },
      {
        title: "Messages",
        url: "/admin/contact",
        icon: Mail,
      },
    ],
    navSecondary: [
      {
        title: "Settings",
        url: "/admin/settings",
        icon: Settings,
      },
      {
        title: "Users",
        url: "/admin/users",
        icon: Users,
      },
    ],
    quickActions: [
      {
        title: "New Project",
        url: "/admin/projects/new",
        icon: Plus,
      },
      {
        title: "New Blog Post",
        url: "/admin/blog/new",
        icon: FileText,
      },
    ],
  }

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/admin/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <LayoutDashboard className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Portfolio Admin</span>
                  <span className="truncate text-xs">Management Panel</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={adminData.navMain} />
        <NavSecondary items={adminData.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={adminData.user} />
      </SidebarFooter>
    </Sidebar>
  )
}