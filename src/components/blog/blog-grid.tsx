"use client"

import Link from "next/link"
import { Calendar, Clock, ArrowRight, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useState, useEffect } from "react"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  slug: string
  category: string
  tags: string[]
  featured: boolean
  author: string
  authorAvatar?: string
  authorBio?: string
  publishedAt: string
  updatedAt: string
  readingTime: string
  coverImage?: string
  seoTitle?: string
  seoDescription?: string
}

export function BlogGrid() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/blog/public?limit=20')
        if (!response.ok) {
          throw new Error('Failed to fetch posts')
        }
        const data = await response.json()
        setPosts(data.posts || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch posts')
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (loading) {
    return (
      <section className="py-24">
        <div className="container">
          <div className="text-center">
            <p className="text-muted-foreground">Loading blog posts...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-24">
        <div className="container">
          <div className="text-center">
            <p className="text-red-500">Error: {error}</p>
          </div>
        </div>
      </section>
    )
  }

  const featuredPosts = posts.filter(post => post.featured).slice(0, 2)
  const recentPosts = posts.slice(0, 9)

  if (posts.length === 0) {
    return (
      <section className="py-24">
        <div className="container">
          <div className="text-center py-12">
            <h2 className="heading-md mb-4">No Blog Posts Yet</h2>
            <p className="text-muted-foreground mb-8">
              Blog posts will appear here once they are created in the admin panel.
            </p>
          </div>
        </div>
      </section>
    )
  }
  
  return (
    <section className="py-24">
      <div className="container">
        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <div className="mb-16">
            <h2 className="heading-md mb-8">Featured Articles</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post, index) => (
              <Card key={post.id} className="glass-card hover-lift group overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-accent/20 to-primary/20 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-primary/10 flex items-center justify-center">
                    <span className="body-sm text-muted-foreground">Featured Article</span>
                  </div>
                  <div className="absolute top-4 left-4 px-3 py-1 bg-accent text-white text-xs rounded-full">
                    Featured
                  </div>
                </div>

                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-accent font-medium">{post.category}</span>
                    <div className="flex items-center text-xs text-muted-foreground space-x-4">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(post.publishedAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {post.readingTime}
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-xl group-hover:text-accent transition-colors">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <CardDescription className="body-sm">
                    {post.excerpt}
                  </CardDescription>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{post.author}</span>
                    </div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-accent hover:underline font-medium text-sm flex items-center"
                    >
                      Read more
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        )}

        {/* All Posts */}
        {recentPosts.length > 0 && (
          <div>
            <h2 className="heading-md mb-8">Recent Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts.map((post, index) => (
              <Card key={post.id} className="glass-card hover-lift group">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-accent font-medium">{post.category}</span>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {post.readingTime}
                    </div>
                  </div>
                  <CardTitle className="text-lg group-hover:text-accent transition-colors">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </CardTitle>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <CardDescription className="body-sm">
                    {post.excerpt}
                  </CardDescription>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-accent hover:underline font-medium text-sm flex items-center"
                  >
                    Read article
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        )}

        {posts.length > 9 && (
          <div className="text-center mt-12">
            <Button variant="outline" className="glass-card hover-lift">
              Load More Articles
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}