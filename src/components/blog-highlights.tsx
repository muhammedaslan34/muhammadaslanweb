'use client'

import Link from "next/link"
import { Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useState, useEffect } from "react"
import { toast } from "sonner"

export function BlogHighlights() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBlogPosts()
  }, [])

  const fetchBlogPosts = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/blog?limit=3')
      if (!response.ok) throw new Error('Failed to fetch blog posts')

      const data = await response.json()

      // Transform blog data to match the component format
      const transformedPosts = data.posts.map((post: any) => ({
        title: post.title,
        excerpt: post.excerpt,
        date: post.publishedAt,
        readingTime: `${Math.ceil(post.content.length / 1000)} min read`, // Rough estimate
        slug: post.slug,
      }))

      setPosts(transformedPosts)
    } catch (error) {
      console.error('Error fetching blog posts:', error)
      toast.error('Failed to load blog posts')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container">
          <div className="text-center space-y-4 mb-12">
            <h2 className="heading-lg">Latest from the Blog</h2>
            <p className="body-lg text-muted-foreground max-w-2xl mx-auto">
              Loading latest blog posts...
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-3 bg-muted rounded"></div>
                    <div className="h-3 bg-muted rounded w-5/6"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="container">
        <div className="text-center space-y-4 mb-12">
          <h2 className="heading-lg">Latest from the Blog</h2>
          <p className="body-lg text-muted-foreground max-w-2xl mx-auto">
            Insights, tutorials, and thoughts on web development and WordPress
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{post.readingTime}</span>
                  </div>
                </div>
                <CardTitle className="text-xl hover:text-primary transition-colors">
                  <Link href={`/blog/${post.slug}` as any}>
                    {post.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="body-sm mb-4">
                  {post.excerpt}
                </CardDescription>
                <Link
                  href={`/blog/${post.slug}` as any}
                  className="text-primary hover:underline font-medium text-sm"
                >
                  Read more →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild>
            <Link href="/blog">View All Posts</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}