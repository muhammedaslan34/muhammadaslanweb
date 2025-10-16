import type { Metadata } from 'next'
import { ProjectsHero } from '@/components/projects/projects-hero'
import { ProjectsClient } from '@/components/projects/projects-client'

export const metadata: Metadata = {
  title: 'Projects - Muhammad Aslan | Web Development Portfolio',
  description: 'Explore my portfolio of web development projects including WordPress sites, e-commerce platforms, and custom web applications.',
  keywords: ['web development projects', 'portfolio', 'WordPress', 'Next.js', 'React', 'e-commerce'],
}

export default function ProjectsPage() {
  return (
    <div className="flex flex-col bg-main min-h-screen">
      <ProjectsHero />
      <ProjectsClient />
    </div>
  )
}