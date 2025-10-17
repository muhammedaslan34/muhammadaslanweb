"use client"

import { useState, useMemo } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { ExternalLink, Calendar, Eye, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { projects } from "@/data/projects"
import type { Project } from "@/data/projects"

const PreviewModal = dynamic(() => import("@/components/preview/preview-modal").then(mod => ({ default: mod.PreviewModal })), {
  ssr: false
})

interface ProjectsGridProps {
  activeCategory: string
  searchTerm: string
}

export function ProjectsGrid({ activeCategory, searchTerm }: ProjectsGridProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  const handlePreview = (project: Project) => {
    setSelectedProject(project)
    setIsPreviewOpen(true)
  }

  const handleClosePreview = () => {
    setIsPreviewOpen(false)
    setSelectedProject(null)
  }

  // Filter projects based on active filters
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      // Category filter
      const categoryMatch = activeCategory === "All Projects" || project.category === activeCategory

      // Search filter
      const searchMatch = searchTerm === "" ||
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))

      return categoryMatch && searchMatch
    })
  }, [activeCategory, searchTerm])

  return (
    <section className="py-24">
      <div className="container">
        {/* Results Summary */}
        <div className="mb-8">
          <p className="body-sm text-muted-foreground">
            Showing {filteredProjects.length} of {projects.length} projects
            {activeCategory !== "All Projects" && ` in ${activeCategory}`}
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
            <Card key={project.id} className={`glass-card hover-lift group overflow-hidden ${
              project.featured ? 'md:col-span-2 lg:col-span-1' : ''
            }`}>
              {/* Project Image */}
              <div className="aspect-video bg-gradient-to-br from-accent/20 to-primary/20 relative overflow-hidden">
                {project.imageUrl?.includes('dtmasters') ? (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-primary/10 flex items-center justify-center">
                    <span className="body-sm text-muted-foreground">Project Preview</span>
                  </div>
                )}
                {project.featured && (
                  <div className="absolute top-4 left-4 px-2 py-1 bg-accent text-white text-xs rounded-full">
                    Featured
                  </div>
                )}
              </div>

              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-accent font-medium">{project.category}</span>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(project.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <CardTitle className="text-xl group-hover:text-accent transition-colors">
                  {project.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <CardDescription className="body-sm">
                  {project.excerpt}
                </CardDescription>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="inline-flex items-center rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex space-x-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handlePreview(project)}
                    className="glass-card hover-lift"
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Preview
                  </Button>
                  {project.liveUrl && (
                    <Button size="sm" variant="outline" asChild className="glass-card hover-lift">
                      <a href={project.liveUrl!} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                  <Button size="sm" variant="outline" asChild className="glass-card hover-lift">
                    <Link href={`/projects/${project.slug}`}>
                      <ArrowRight className="mr-2 h-4 w-4" />
                      Read More
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        ) : (
          <div className="text-center py-16">
            <div className="space-y-4">
              <h3 className="heading-sm text-muted-foreground">No projects found</h3>
              <p className="body-sm text-muted-foreground">
                Try adjusting your filters or search terms to find what you're looking for.
              </p>
            </div>
          </div>
        )}

        {/* CTA Section */}
        {filteredProjects.length > 0 && (
          <div className="text-center mt-12">
            <p className="body-sm text-muted-foreground mb-4">
              Want to see more projects or discuss a custom solution?
            </p>
            <Button asChild className="hover-lift">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        )}

        {/* Preview Modal */}
        {selectedProject && (
          <PreviewModal
            isOpen={isPreviewOpen}
            onClose={handleClosePreview}
            project={{
              id: selectedProject.id,
              title: selectedProject.title,
              liveUrl: selectedProject.liveUrl || 'https://example.com'
            }}
          />
        )}
      </div>
    </section>
  )
}