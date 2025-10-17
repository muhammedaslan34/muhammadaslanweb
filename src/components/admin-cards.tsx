"use client"

import { useEffect, useState } from "react"
import { TrendingUpIcon, TrendingDownIcon, Star, Plus } from "lucide-react"
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

export function AdminCards() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
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

      setStats(stats)
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error)
      // Set default/empty stats on error
      setStats({
        projects: { total: 0, featured: 0, change: 0 },
        blog: { total: 0, featured: 0, change: 0 },
        messages: { total: 0, unread: 0, change: 0 },
      })
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
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {/* Total Projects */}
      <Card className="@container/card">
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
      </Card>

      {/* Blog Posts */}
      <Card className="@container/card">
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
      </Card>

      {/* Messages */}
      <Card className="@container/card">
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
  )
}