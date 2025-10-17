"use client"

export const dynamic = "force-dynamic"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { AdminCards } from "@/components/admin-cards"

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login")
    }
  }, [status, router])

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-main">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto mb-4"></div>
          <div>Loading dashboard...</div>
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
    <>
      {/* Header */}
      <div className="px-4 lg:px-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Welcome, {session.user?.name}</h2>
          <p className="text-muted-foreground">
            Manage your portfolio content from here.
          </p>
        </div>
      </div>

      {/* Dashboard Cards */}
      <AdminCards />
    </>
  )
}