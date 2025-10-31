import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Calendar, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { connectToDatabase } from '@/lib/mongoose'
import { ProjectModel } from '@/models/Project'

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
    return { ...doc, id: String((doc as any)._id), _id: undefined } as any
  } catch (error) {
    console.error('Error fetching project:', error)
    return null
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
    description: project.excerpt,
    keywords: [...project.technologies, 'web development', 'portfolio', 'case study'],
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-main">
      <div className="container py-12 pt-24">
        {/* Back Button */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="hover-lift">
            <Link href="/projects" className="flex items-center space-x-2">
              <ArrowLeft size={16} />
              <span>Back to Projects</span>
            </Link>
          </Button>
        </div>

        {/* Project Header */}
        <div className="mb-12">
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-sm text-accent font-medium">{project.category}</span>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-1" />
              {new Date(project.createdAt).toLocaleDateString()}
            </div>
            {project.featured && (
              <span className="px-2 py-1 bg-accent text-white text-xs rounded-full">
                Featured
              </span>
            )}
          </div>
          
          <h1 className="heading-lg mb-4">{project.title}</h1>
          <p className="body-lg text-muted-foreground mb-6">{project.excerpt}</p>
          
          <div className="flex space-x-4">
            {project.liveUrl && (
              <Button asChild className="hover-lift">
                <a href={project.liveUrl!} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Live Site
                </a>
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Project Overview */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Project Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-gray max-w-none">
                  <p className="body-md mb-4">{project.description}</p>
                  {project.client && (
                    <p className="body-md mb-4"><strong>Client:</strong> {project.client}</p>
                  )}
                  {project.duration && (
                    <p className="body-md mb-4"><strong>Duration:</strong> {project.duration}</p>
                  )}
                  {project.services && (
                    <div className="mb-4">
                      <strong>Services:</strong>
                      <ul className="list-disc list-inside mt-2">
                        {project.services.map((service: string, index: number) => (
                          <li key={index} className="body-md">{service}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Technologies Used */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Technologies Used</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.technologies.map((tech: string, index: number) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50">
                      <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-foreground">{tech}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Challenges & Solutions */}
            {project.challenges && project.challenges.length > 0 && (
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Challenges & Solutions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {project.challenges.map((challenge: string, index: number) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 rounded-full bg-destructive mt-2 flex-shrink-0"></div>
                        <p className="body-sm text-muted-foreground">{challenge}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Solutions */}
            {project.solutions && project.solutions.length > 0 && (
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Our Solutions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {project.solutions.map((solution: string, index: number) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                        <p className="body-sm text-muted-foreground">{solution}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Project Tags */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Technologies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech: string, index: number) => (
                    <span
                      key={index}
                      className="inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            {project.achievements && project.achievements.length > 0 && (
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {project.achievements.map((achievement: string, index: number) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                        <p className="body-sm text-muted-foreground">{achievement}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Project Actions */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Project Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {project.liveUrl && (
                  <Button asChild className="w-full hover-lift">
                    <a href={project.liveUrl!} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Visit Live Site
                    </a>
                  </Button>
                )}
                {project.githubUrl && (
                  <Button variant="outline" asChild className="w-full hover-lift">
                    <a href={project.githubUrl!} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View on GitHub
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}