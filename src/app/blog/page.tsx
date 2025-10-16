import type { Metadata } from 'next'
import { BlogHero } from '@/components/blog/blog-hero'
import { BlogGrid } from '@/components/blog/blog-grid'
import { BlogNewsletter } from '@/components/blog/blog-newsletter'

export const metadata: Metadata = {
  title: 'Blog - Muhammad Aslan | Web Development Insights & Tutorials',
  description: 'Read the latest articles about web development, WordPress, React, and modern web technologies.',
  keywords: ['web development blog', 'wordpress tutorials', 'react guides', 'programming articles'],
}

export default function BlogPage() {
  return (
    <div className="flex flex-col bg-main min-h-screen">
      <BlogHero />
      <BlogGrid />
      <BlogNewsletter />
    </div>
  )
}