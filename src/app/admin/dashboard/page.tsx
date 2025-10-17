"use client"

export const dynamic = "force-dynamic"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LogOut, Settings, FileText, Briefcase, Users, Mail, Eye, Edit, ExternalLink, Plus, TrendingUp, Star } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

interface Project {
  id: string
  title: string
  slug: string
  category: string
  featured: boolean
  createdAt: string
  updatedAt: string
  technologies: string[]
}

interface ProjectStats {
  total: number
  featured: number
  categories: { [key: string]: number }
  recent: Project[]
}

interface BlogPost {
  id: string
  title: string
  slug: string
  category: string
  featured: boolean
  createdAt: string
  updatedAt: string
  publishedAt: string
  author: string
}

interface BlogStats {
  total: number
  featured: number
  categories: { [key: string]: number }
  recent: BlogPost[]
}

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [projectStats, setProjectStats] = useState<ProjectStats | null>(null)
  const [blogStats, setBlogStats] = useState<BlogStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login")
    }
  }, [status, router])

  useEffect(() => {
    if (status === "authenticated") {
      fetchProjectStats()
      fetchBlogStats()
    }
  }, [status])

  const fetchProjectStats = async () => {
    try {
      setLoading(true)

      // Fetch all projects for accurate stats
      const [allResponse, recentResponse] = await Promise.all([
        fetch('/api/projects?limit=100'),
        fetch('/api/projects?limit=5')
      ])

      if (!allResponse.ok || !recentResponse.ok) throw new Error("Failed to fetch projects")

      const allData = await allResponse.json()
      const recentData = await recentResponse.json()

      // Calculate stats from all projects
      const stats: ProjectStats = {
        total: allData.pagination.total,
        featured: allData.projects.filter((p: Project) => p.featured).length,
        categories: allData.projects.reduce((acc: { [key: string]: number }, project: Project) => {
          acc[project.category] = (acc[project.category] || 0) + 1
          return acc
        }, {}),
        recent: recentData.projects
      }

      setProjectStats(stats)
    } catch (error) {
      console.error("Failed to fetch project stats:", error)
      toast.error("Failed to load project statistics")
    }
  }

  const fetchBlogStats = async () => {
    try {
      // Fetch all blog posts for accurate stats
      const [allResponse, recentResponse] = await Promise.all([
        fetch('/api/blog?limit=100'),
        fetch('/api/blog?limit=5')
      ])

      if (!allResponse.ok || !recentResponse.ok) throw new Error("Failed to fetch blog posts")

      const allData = await allResponse.json()
      const recentData = await recentResponse.json()

      // Calculate stats from all blog posts
      const stats: BlogStats = {
        total: allData.pagination.total,
        featured: allData.posts.filter((p: BlogPost) => p.featured).length,
        categories: allData.posts.reduce((acc: { [key: string]: number }, post: BlogPost) => {
          acc[post.category] = (acc[post.category] || 0) + 1
          return acc
        }, {}),
        recent: recentData.posts
      }

      setBlogStats(stats)
    } catch (error) {
      console.error("Failed to fetch blog stats:", error)
      toast.error("Failed to load blog statistics")
    } finally {
      setLoading(false)
    }
  }

  if (status === "loading" || loading) {
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
    <div className="min-h-screen bg-main">
     

      <main className="container my-10 py-8 px-4">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Welcome, {session.user?.name}</h2>
          <p className="text-muted-foreground">
            Manage your portfolio content from here.
          </p>
        </div>

        {/* Statistics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="glass-card hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{projectStats?.total || 0}</div>
              <p className="text-xs text-muted-foreground">
                Portfolio projects
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{blogStats?.total || 0}</div>
              <p className="text-xs text-muted-foreground">
                Published articles
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Featured Items</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{(projectStats?.featured || 0) + (blogStats?.featured || 0)}</div>
              <p className="text-xs text-muted-foreground">
                Projects & blog posts
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
              <Plus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <Button asChild size="sm" className="w-full hover-lift">
                <Link href={"/admin/projects/new" as any}>
                  Add Project
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Projects */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="glass-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Projects</CardTitle>
                    <CardDescription>
                      Your latest portfolio work
                    </CardDescription>
                  </div>
                  <Button asChild variant="outline" size="sm">
                    <Link href={"/admin/projects" as any}>
                      View All
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {projectStats?.recent.length === 0 ? (
                  <div className="text-center py-8">
                    <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Get started by creating your first project
                    </p>
                    <Button asChild>
                      <Link href={"/admin/projects/new" as any}>
                        <Plus className="h-4 w-4 mr-2" />
                        Create Project
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {projectStats?.recent.map((project) => (
                      <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{project.title}</h3>
                            {project.featured && (
                              <Badge variant="default" className="text-xs">
                                <Star className="h-3 w-3 mr-1" />
                                Featured
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {project.category} • {project.technologies.slice(0, 3).join(", ")}
                            {project.technologies.length > 3 && "..."}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Updated {new Date(project.updatedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button asChild variant="ghost" size="sm">
                            <Link href={`/projects/${project.slug}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button asChild variant="ghost" size="sm">
                            <Link href={`/admin/projects/${project.id}/edit` as any}>
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="glass-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Blog Posts</CardTitle>
                    <CardDescription>
                      Your latest articles
                    </CardDescription>
                  </div>
                  <Button asChild variant="outline" size="sm">
                    <Link href={"/admin/blog" as any}>
                      View All
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {blogStats?.recent.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No blog posts yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Get started by writing your first article
                    </p>
                    <Button asChild>
                      <Link href={"/admin/blog/new" as any}>
                        <Plus className="h-4 w-4 mr-2" />
                        Create Post
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {blogStats?.recent.map((post) => (
                      <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{post.title}</h3>
                            {post.featured && (
                              <Badge variant="default" className="text-xs">
                                <Star className="h-3 w-3 mr-1" />
                                Featured
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {post.category} • {post.author}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Published {new Date(post.publishedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button asChild variant="ghost" size="sm">
                            <Link href={`/blog/${post.slug}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button asChild variant="ghost" size="sm">
                            <Link href={`/admin/blog/${post.id}/edit` as any}>
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Blog Stats & Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Blog Categories</CardTitle>
                <CardDescription>
                  Distribution of blog posts by category
                </CardDescription>
              </CardHeader>
              <CardContent>
                {blogStats && Object.keys(blogStats.categories).length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {Object.entries(blogStats.categories).map(([category, count]) => (
                      <div key={category} className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="text-sm font-medium">{category}</span>
                        <Badge variant="secondary">{count}</Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No blog categories yet</p>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common management tasks
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild className="w-full justify-start hover-lift">
                  <Link href={"/admin/projects/new" as any}>
                    <Plus className="h-4 w-4 mr-2" />
                    New Project
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start hover-lift">
                  <Link href={"/admin/blog/new" as any}>
                    <FileText className="h-4 w-4 mr-2" />
                    New Blog Post
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start hover-lift">
                  <Link href={"/admin/contact" as any}>
                    <Mail className="h-4 w-4 mr-2" />
                    View Messages
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Project Categories</CardTitle>
                <CardDescription>
                  Distribution by category
                </CardDescription>
              </CardHeader>
              <CardContent>
                {projectStats && Object.keys(projectStats.categories).length > 0 ? (
                  <div className="space-y-3">
                    {Object.entries(projectStats.categories).map(([category, count]) => (
                      <div key={category} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{category}</span>
                        <Badge variant="secondary">{count}</Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No categories yet</p>
                )}
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Management</CardTitle>
                <CardDescription>
                  Full admin access
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild variant="outline" className="w-full justify-start hover-lift">
                  <Link href={"/admin/projects" as any}>
                    <Briefcase className="h-4 w-4 mr-2" />
                    All Projects
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start hover-lift">
                  <Link href={"/admin/blog" as any}>
                    <FileText className="h-4 w-4 mr-2" />
                    Blog Posts
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start hover-lift">
                  <Link href={"/admin/settings" as any}>
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}