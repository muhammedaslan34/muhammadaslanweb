"use client"

import { useEffect, useState } from "react"
import { TrendingUpIcon, TrendingDownIcon, Star, Plus, Briefcase, FileText, Settings, Mail } from "lucide-react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"

interface DashboardStats {
  projects: {
    total: number
    featured: number
    change: number
  }
  blog: {
    total: number
    featured: number
    change: number
  }
  messages: {
    total: number
    unread: number
    change: number
  }
}

interface RecentItem {
  id: string
  title: string
  url: string
  type: 'project' | 'blog'
  featured?: boolean
  createdAt: string
  author?: string
  category?: string
}

export function AdminCards() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [recentItems, setRecentItems] = useState<RecentItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [projectsRes, blogRes] = await Promise.all([
        fetch('/api/projects?limit=100'),
        fetch('/api/blog?limit=100'),
      ])

      const projectsData = await projectsRes.json()
      const blogData = await blogRes.json()

      const stats: DashboardStats = {
        projects: {
          total: projectsData.pagination?.total || 0,
          featured: projectsData.projects?.filter((p: any) => p.featured).length || 0,
          change: 12.5, // Mock change percentage
        },
        blog: {
          total: blogData.pagination?.total || 0,
          featured: blogData.posts?.filter((p: any) => p.featured).length || 0,
          change: 8.2, // Mock change percentage
        },
        messages: {
          total: 0, // Mock messages count
          unread: 0, // Mock unread count
          change: -2.1, // Mock change percentage
        },
      }

      // Prepare recent items
      const recentProjects: RecentItem[] = (projectsData.projects || [])
        .slice(0, 3)
        .map((project: any) => ({
          id: project.id,
          title: project.title,
          url: `/admin/projects/${project.id}/edit`,
          type: 'project' as const,
          featured: project.featured,
          createdAt: project.createdAt,
          category: project.category,
        }))

      const recentBlogs: RecentItem[] = (blogData.posts || [])
        .slice(0, 3)
        .map((post: any) => ({
          id: post.id,
          title: post.title,
          url: `/admin/blog/${post.id}/edit`,
          type: 'blog' as const,
          featured: post.featured,
          createdAt: post.publishedAt || post.createdAt,
          author: post.author,
          category: post.category,
        }))

      // Combine and sort by date
      const allRecentItems = [...recentProjects, ...recentBlogs]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5)

      setStats(stats)
      setRecentItems(allRecentItems)
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error)
      // Set default/empty stats on error
      setStats({
        projects: { total: 0, featured: 0, change: 0 },
        blog: { total: 0, featured: 0, change: 0 },
        messages: { total: 0, unread: 0, change: 0 },
      })
      setRecentItems([])
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="space-y-2">
              <div className="h-4 bg-muted rounded w-24"></div>
              <div className="h-8 bg-muted rounded w-16"></div>
            </CardHeader>
          </Card>
        ))}
      </div>
    )
  }

  const formatChange = (change: number) => ({
    icon: change >= 0 ? TrendingUpIcon : TrendingDownIcon,
    text: `${change >= 0 ? '+' : ''}${change.toFixed(1)}%`,
    color: change >= 0 ? 'text-green-600' : 'text-red-600',
  })

  return (
    <>
      <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {/* Total Projects */}
      <Card className="@container/card hover:shadow-md transition-shadow cursor-pointer">
        <Link href="/admin/projects" className="block h-full">
          <CardHeader className="relative">
            <CardDescription>Total Projects</CardDescription>
            <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
              {stats?.projects.total || 0}
            </CardTitle>
            <div className="absolute right-4 top-4">
              <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                {(() => {
                  const changeData = formatChange(stats?.projects.change || 0)
                  const Icon = changeData.icon
                  return (
                    <>
                      <Icon className="size-3" />
                      {changeData.text}
                    </>
                  )
                })()}
              </Badge>
            </div>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Portfolio projects <Star className="size-4" />
            </div>
            <div className="text-muted-foreground">
              {stats?.projects.featured || 0} featured
            </div>
          </CardFooter>
        </Link>
      </Card>

      {/* Blog Posts */}
      <Card className="@container/card hover:shadow-md transition-shadow cursor-pointer">
        <Link href="/admin/blog" className="block h-full">
          <CardHeader className="relative">
            <CardDescription>Blog Posts</CardDescription>
            <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
              {stats?.blog.total || 0}
            </CardTitle>
            <div className="absolute right-4 top-4">
              <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                {(() => {
                  const changeData = formatChange(stats?.blog.change || 0)
                  const Icon = changeData.icon
                  return (
                    <>
                      <Icon className="size-3" />
                      {changeData.text}
                    </>
                  )
                })()}
              </Badge>
            </div>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Published articles <TrendingUpIcon className="size-4" />
            </div>
            <div className="text-muted-foreground">
              {stats?.blog.featured || 0} featured
            </div>
          </CardFooter>
        </Link>
      </Card>

      {/* Messages */}
      <Card className="@container/card hover:shadow-md transition-shadow cursor-pointer">
        <Link href="/admin/contact" className="block h-full">
          <CardHeader className="relative">
            <CardDescription>Contact Messages</CardDescription>
            <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
              {stats?.messages.total || 0}
            </CardTitle>
            <div className="absolute right-4 top-4">
              <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                {(() => {
                  const changeData = formatChange(stats?.messages.change || 0)
                  const Icon = changeData.icon
                  return (
                    <>
                      <Icon className="size-3" />
                      {changeData.text}
                    </>
                  )
                })()}
              </Badge>
            </div>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Contact inquiries <TrendingUpIcon className="size-4" />
            </div>
            <div className="text-muted-foreground">
              {stats?.messages.unread || 0} unread
            </div>
          </CardFooter>
        </Link>
      </Card>

      {/* Quick Actions */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Quick Actions</CardDescription>
          <CardTitle className="@[250px]/card:text-xl text-lg font-semibold">
            Create New
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button asChild size="sm" className="w-full justify-start">
            <Link href="/admin/projects/new">
              <Plus className="size-4 mr-2" />
              New Project
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm" className="w-full justify-start">
            <Link href="/admin/blog/new">
              <Plus className="size-4 mr-2" />
              New Blog Post
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>

    {/* Recent Items Section */}
    {recentItems.length > 0 && (
      <div className="px-4 lg:px-6">
        <div className="grid grid-cols-1 gap-4 @xl/main:grid-cols-2">
          {/* Recent Projects & Blog Posts */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="size-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>
                Latest projects and blog posts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                        item.type === 'project' ? 'bg-blue-500' : 'bg-green-500'
                      }`} />
                      <div className="min-w-0 flex-1">
                        <Link
                          href={item.url}
                          className="font-medium hover:text-primary transition-colors truncate block"
                        >
                          {item.title}
                        </Link>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                          <span className="capitalize">{item.type}</span>
                          {item.category && <span>• {item.category}</span>}
                          {item.author && <span>• {item.author}</span>}
                          {item.featured && (
                            <Badge variant="secondary" className="text-xs">
                              <Star className="size-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground flex-shrink-0">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex gap-2">
                <Button asChild variant="outline" size="sm" className="flex-1">
                  <Link href="/admin/projects">
                    View All Projects
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm" className="flex-1">
                  <Link href="/admin/blog">
                    View All Posts
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions & Links */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="size-5" />
                Quick Actions
              </CardTitle>
              <CardDescription>
                Create new content and manage categories
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Button asChild size="sm" className="w-full justify-start">
                  <Link href="/admin/projects/new">
                    <Plus className="size-4 mr-2" />
                    New Project
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm" className="w-full justify-start">
                  <Link href="/admin/blog/new">
                    <FileText className="size-4 mr-2" />
                    New Blog Post
                  </Link>
                </Button>
              </div>

              <div className="border-t pt-4">
                <h4 className="text-sm font-medium mb-2">Management</h4>
                <div className="space-y-2">
                  <Button asChild variant="ghost" size="sm" className="w-full justify-start">
                    <Link href="/admin/projects">
                      <Briefcase className="size-4 mr-2" />
                      All Projects
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" size="sm" className="w-full justify-start">
                    <Link href="/admin/blog">
                      <FileText className="size-4 mr-2" />
                      Blog Posts
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" size="sm" className="w-full justify-start">
                    <Link href="/admin/contact">
                      <Mail className="size-4 mr-2" />
                      Contact Messages
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" size="sm" className="w-full justify-start">
                    <Link href="/admin/settings">
                      <Settings className="size-4 mr-2" />
                      Settings
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )}
    </>
  )
}