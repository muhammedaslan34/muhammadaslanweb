"use client"

export const dynamic = "force-dynamic"

import { useSession } from "next-auth/react"
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { AdminHeader } from "@/components/admin-header"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  const isLoginPage = pathname === "/admin/login"

  useEffect(() => {
    if (!isLoginPage && status === "unauthenticated") {
      router.push("/admin/login")
    }
  }, [status, router, isLoginPage])

  if (isLoginPage) {
    return <>{children}</>
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-main">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto mb-4"></div>
          <div>Loading admin panel...</div>
        </div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-main">
        <div className="text-center">Access Denied</div>
      </div>
    )
  }

  return (
    <SidebarProvider>
      <AdminSidebar variant="inset" />
      <SidebarInset>
        <div className="flex flex-1 flex-col">
          <AdminHeader />
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {children}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
