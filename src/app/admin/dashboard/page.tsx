"use client"

export const dynamic = "force-dynamic"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LogOut, Settings, FileText, Briefcase, Users, Mail } from "lucide-react"
import Link from "next/link"

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
        <div className="text-center">Loading...</div>
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
    <div className="min-h-screen bg-main">
      <header className="bg-muted/30 border-b">
        <div className="container flex items-center justify-between h-16 px-4">
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">
              {session.user?.email}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/api/auth/signout")}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8 px-4">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Welcome, {session.user?.name}</h2>
          <p className="text-muted-foreground">
            Manage your portfolio content from here.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="glass-card hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Briefcase className="h-5 w-5 mr-2 text-accent" />
                Projects
              </CardTitle>
              <CardDescription>
                Manage your portfolio projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full hover-lift">
                <Link href={"/admin/projects" as any}>
                  Manage Projects
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="glass-card hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-accent" />
                Blog Posts
              </CardTitle>
              <CardDescription>
                Create and edit blog posts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full hover-lift">
                <Link href={"/admin/blog" as any}>
                  Manage Blog
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="glass-card hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-accent" />
                Contact Messages
              </CardTitle>
              <CardDescription>
                View contact form submissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full hover-lift">
                <Link href={"/admin/contact" as any}>
                  View Messages
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="glass-card hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-accent" />
                User Management
              </CardTitle>
              <CardDescription>
                Manage admin users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full hover-lift">
                <Link href={"/admin/users" as any}>
                  Manage Users
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="glass-card hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2 text-accent" />
                Settings
              </CardTitle>
              <CardDescription>
                Configure site settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full hover-lift">
                <Link href={"/admin/settings" as any}>
                  Site Settings
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}