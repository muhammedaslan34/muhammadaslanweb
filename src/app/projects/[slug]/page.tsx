import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { connectToDatabase } from '@/lib/mongoose'
import { ProjectModel } from '@/models/Project'
import { ProjectHero } from '@/components/project/ProjectHero'
import { ProjectHeader } from '@/components/project/ProjectHeader'
import { ProjectInfoBar } from '@/components/project/ProjectInfoBar'
import { ProjectOverview } from '@/components/project/ProjectOverview'
import { ImageGallery } from '@/components/project/ImageGallery'
import { FeatureSection } from '@/components/project/FeatureSection'
import { ProjectFeatures } from '@/components/project/ProjectFeatures'
import { TechStack } from '@/components/project/TechStack'
import { ProjectTimeline } from '@/components/project/ProjectTimeline'
import { ResultsSection } from '@/components/project/ResultsSection'
import { RelatedProjects } from '@/components/project/RelatedProjects'
import { ProjectCTA } from '@/components/project/ProjectCTA'
import { ExtendedProject, Project } from '@/types/project'

interface ProjectPageProps {
  params: Promise<{
    slug: string
  }>
}

async function getProjectBySlug(slug: string) {
  try {
    await connectToDatabase()
    const doc = await ProjectModel.findOne({ slug }).lean()
    if (!doc) return null

    // Transform to ExtendedProject format
    const project = {
      ...doc,
      id: String((doc as any)._id),
      _id: undefined,
      createdAt: String((doc as any).createdAt),
      updatedAt: String((doc as any).updatedAt),
      date: String((doc as any).createdAt),
      category: Array.isArray((doc as any).category) ? (doc as any).category : [(doc as any).category],
      status: 'completed' as const,
      links: {
        github: (doc as any).githubUrl,
        live: (doc as any).liveUrl,
      }
    } as ExtendedProject

    return project
  } catch (error) {
    console.error('Error fetching project:', error)
    return null
  }
}

async function getRelatedProjects(currentSlug: string, category: string, limit = 3) {
  try {
    await connectToDatabase()
    const docs = await ProjectModel.find({
      slug: { $ne: currentSlug },
      category: category
    })
      .limit(limit)
      .lean()

    return docs.map(doc => ({
      ...doc,
      id: String((doc as any)._id),
      _id: undefined,
      createdAt: String((doc as any).createdAt),
      updatedAt: String((doc as any).updatedAt)
    })) as Project[]
  } catch (error) {
    console.error('Error fetching related projects:', error)
    return []
  }
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    return {
      title: 'Project Not Found - Muhammad Aslan',
      description: 'The requested project could not be found.'
    }
  }

  return {
    title: `${project.title} - Muhammad Aslan Portfolio`,
    description: project.excerpt || project.description,
    keywords: [...project.technologies, 'web development', 'portfolio', 'case study'],
    openGraph: {
      title: project.title,
      description: project.excerpt || project.description,
      images: project.imageUrl ? [project.imageUrl] : [],
    }
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  // Get related projects
  const relatedProjects = await getRelatedProjects(
    slug,
    Array.isArray(project.category) ? project.category[0] : project.category,
    3
  )

  const projectStatus = project.status || 'completed'

  // Convert challenges/solutions to proper format
  const challenge = project.challenges && project.challenges.length > 0
    ? project.challenges.join(' ')
    : project.challenge

  const solution = project.solutions && project.solutions.length > 0
    ? project.solutions.join(' ')
    : project.solution

  return (
    <div className="min-h-screen bg-main">
      {/* Back to Projects Navigation */}
      <div className="container pt-24 pb-4">
        <Button variant="ghost" asChild className="hover-lift">
          <Link href="/projects" className="flex items-center gap-2">
            <ArrowLeft size={16} />
            <span>Back to Projects</span>
          </Link>
        </Button>
      </div>

      {/* Project Header - New Component */}
      <ProjectHeader
        title={project.title}
        category={Array.isArray(project.category) ? project.category[0] : project.category}
        status={projectStatus}
        date={new Date(project.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        description={project.excerpt || project.description}
        githubUrl={project.githubUrl || '#'}
        liveUrl={project.liveUrl || '#'}
        imageUrl={project.imageUrl}
      />

      {/* Tech Stack Info - New Component */}
      <TechStack
        technologies={project.technologies}
        clientName={project.client || 'Personal Project'}
        projectDate={project.duration || 'Ongoing'}
      />

      {/* Project Overview */}
      <ProjectOverview
        description={project.description}
        challenge={challenge}
        solution={solution}
        objectives={project.services}
      />

      {/* Key Features - New Component */}
      {project.features && project.features.length > 0 && (
        <ProjectFeatures features={project.features} />
      )}

      {/* Image Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <ImageGallery images={project.gallery} />
      )}

      {/* Project Timeline - New Component (if timeline data exists) */}
      {project.timeline && project.timeline.length > 0 && (
        <ProjectTimeline timeline={project.timeline} />
      )}

      {/* Results Section */}
      <ResultsSection
        metrics={project.metrics}
        testimonials={project.testimonials}
        achievements={project.achievements}
      />

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <RelatedProjects projects={relatedProjects} />
      )}

      {/* Call to Action */}
      <ProjectCTA variant="contact" />
    </div>
  )
}
