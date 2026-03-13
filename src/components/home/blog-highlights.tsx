'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar, Clock } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

type BlogPostCard = {
  title: string
  excerpt: string
  date: string
  readingTime: string
  slug: string
}

type BlogApiPost = {
  title: string
  excerpt: string
  publishedAt: string
  content: string
  slug: string
}

type BlogApiResponse = {
  posts: BlogApiPost[]
}

export function BlogHighlights() {
  const [posts, setPosts] = useState<BlogPostCard[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBlogPosts()
  }, [])

  const fetchBlogPosts = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/blog?limit=3')
      if (!response.ok) throw new Error('Failed to fetch blog posts')

      const data = (await response.json()) as BlogApiResponse
      const transformedPosts: BlogPostCard[] = data.posts.map((post) => ({
        title: post.title,
        excerpt: post.excerpt,
        date: post.publishedAt,
        readingTime: `${Math.ceil(post.content.length / 1000)} min read`,
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
      <section className="relative py-16 md:py-24">
        <div className="from-accent/15 pointer-events-none absolute inset-0 bg-gradient-to-b via-transparent to-transparent" />
        <div className="container">
          <div className="mb-12 space-y-4 text-center">
            <h2 className="heading-lg">Latest from the Blog</h2>
            <p className="body-lg text-muted-foreground mx-auto max-w-2xl">
              Loading latest blog posts...
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="bg-muted mb-2 h-4 w-3/4 rounded" />
                  <div className="bg-muted h-3 w-1/2 rounded" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="bg-muted h-3 rounded" />
                    <div className="bg-muted h-3 w-5/6 rounded" />
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
    <section className="relative py-16 md:py-24">
      <div className="from-accent/15 pointer-events-none absolute inset-0 bg-gradient-to-b via-transparent to-transparent" />
      <div className="container">
        <motion.div
          className="mb-12 space-y-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="heading-lg">Latest from the Blog</h2>
          <p className="body-lg text-muted-foreground mx-auto max-w-2xl">
            Insights, tutorials, and thoughts on web development and WordPress
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full border-border/60 bg-background/85 shadow-sm backdrop-blur-sm transition-all hover:border-accent/40 hover:shadow-lg">
                <CardHeader>
                  <div className="text-muted-foreground mb-2 flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{post.readingTime}</span>
                    </div>
                  </div>
                  <CardTitle className="text-xl transition-colors hover:text-primary">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="body-sm mb-4">
                    {post.excerpt}
                  </CardDescription>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-primary inline-flex items-center gap-1 text-sm font-medium hover:underline"
                  >
                    Read more <ArrowRight className="h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Button asChild>
            <Link href="/blog">View All Posts</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
