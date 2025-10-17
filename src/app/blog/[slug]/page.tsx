import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { Calendar, Clock, User, ArrowLeft, Share2 } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import type { Metadata } from 'next'
import { blogPosts, getPostBySlug } from '@/data/blog'

// Generate static params for all blog posts
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

// Generate metadata for each blog post
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.seoTitle || `${post.title} - Muhammad Aslan`,
    description: post.seoDescription || post.excerpt,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags,
    },
  }
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="flex flex-col bg-main min-h-screen">
      {/* Blog Post Header */}
      <div className="container py-12">
        <Link href="/blog" className="inline-flex items-center text-muted-foreground hover:text-accent mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Blog
        </Link>

        <article className="max-w-4xl mx-auto">
          {/* Post Meta */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-accent font-medium">{post.category}</span>
              <Button variant="outline" size="sm" className="glass-card hover-lift">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
            
            <h1 className="heading-lg mb-6">{post.title}</h1>
            
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-6">
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  {post.author}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  {new Date(post.publishedAt).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  {post.readingTime}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Post Content */}
          <div className="prose prose-lg prose-accent max-w-none">
            <MDXRemote source={post.content} />
          </div>

          {/* Post Footer */}
          <div className="mt-12 pt-8 border-t">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Written by {post.author}</h3>
                <p className="text-muted-foreground">{post.authorBio || 'Web developer specializing in modern web technologies.'}</p>
              </div>
              <Link href="/contact">
                <Button className="hover-lift">Get in Touch</Button>
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}