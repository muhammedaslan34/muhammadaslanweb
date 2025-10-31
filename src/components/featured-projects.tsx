'use client'

import Link from "next/link"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { toast } from "sonner"

const Gallery4 = dynamic(() => import("@/components/blocks/gallery4").then(mod => ({ default: mod.Gallery4 })), {
  ssr: false,
  loading: () => (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="container mx-auto">
        <div className="mb-8 flex items-end justify-between md:mb-14 lg:mb-16">
          <div className="flex flex-col gap-4">
            <h2 className="heading-lg">Featured Projects</h2>
            <p className="max-w-lg body-lg text-muted-foreground">Loading projects...</p>
          </div>
        </div>
      </div>
    </section>
  )
})

type GalleryItem = {
  id: string
  title: string
  description: string
  href: string
  image: string
}

export function FeaturedProjects() {
  const [featuredProjects, setFeaturedProjects] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFeaturedProjects()
  }, [])

  const fetchFeaturedProjects = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/projects?featured=true&limit=6')
      if (!response.ok) throw new Error('Failed to fetch featured projects')

      const data = await response.json()

      // Transform project data to match Gallery4 format
      const transformedProjects: GalleryItem[] = data.projects.map((project: any) => ({
        id: project.id,
        title: project.title,
        description: project.description,
        href: `/projects/${project.slug}`,
        image: project.imageUrl || "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      }))

      setFeaturedProjects(transformedProjects)
    } catch (error) {
      console.error('Error fetching featured projects:', error)
      toast.error('Failed to load featured projects')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container mx-auto">
          <div className="mb-8 flex items-end justify-between md:mb-14 lg:mb-16">
            <div className="flex flex-col gap-4">
              <h2 className="heading-lg">Featured Projects</h2>
              <p className="max-w-lg body-lg text-muted-foreground">Loading featured projects...</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      <Gallery4
        title="Featured Projects"
        description="A showcase of recent work demonstrating technical expertise and creative solutions across various industries and technologies."
        items={featuredProjects}
      />
      <div className="container text-center pb-16">
        <Button asChild className="hover-lift">
          <Link href="/projects">View All Projects</Link>
        </Button>
      </div>
    </>
  )
}