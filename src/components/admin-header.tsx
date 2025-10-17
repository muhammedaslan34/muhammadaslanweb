"use client"

import { usePathname } from "next/navigation"
import { Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSession, signOut } from "next-auth/react"

export function AdminHeader() {
  const { data: session } = useSession()
  const pathname = usePathname()

  const getPageTitle = () => {
    const path = pathname.replace("/admin/", "")
    switch (path) {
      case "dashboard":
        return "Dashboard"
      case "projects":
        return "All Projects"
      case "projects/new":
        return "New Project"
      case "blog":
        return "Blog Posts"
      case "blog/new":
        return "New Blog Post"
      case "contact":
        return "Contact Messages"
      case "settings":
        return "Settings"
      default:
        if (path.startsWith("projects/") || path.startsWith("blog/")) {
          return "Edit Content"
        }
        return "Admin Panel"
    }
  }

  return (
    <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        <div>
          <h1 className="text-xl font-semibold">{getPageTitle()}</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground hidden sm:inline-block">
            {session?.user?.email}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  )
}