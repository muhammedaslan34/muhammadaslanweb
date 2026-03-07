'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight } from 'lucide-react'
import { fadeInUp, staggerContainer, cardHover } from '@/lib/animations'
import { Project } from '@/types/project'

interface RelatedProjectsProps {
  projects: Project[]
}

export function RelatedProjects({ projects }: RelatedProjectsProps) {
  if (!projects || projects.length === 0) return null

  return (
    <motion.section
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.2 }}
      className="py-16 md:py-24 bg-muted/30"
    >
      <div className="container">
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Related Projects
          </h2>
          <p className="text-muted-foreground text-lg">
            Explore more of our work
          </p>
        </motion.div>

        {/* Desktop Grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6">
          {projects.slice(0, 3).map((project, index) => (
            <motion.div
              key={project.id}
              variants={fadeInUp}
              whileHover="hover"
              initial="rest"
            >
              <motion.div variants={cardHover}>
                <Link href={`/projects/${project.slug}`}>
                  <Card className="glass-card h-full overflow-hidden hover:border-accent/50 transition-colors duration-300 group">
                    {/* Project Image */}
                    <div className="relative h-48 w-full overflow-hidden bg-muted">
                      {project.imageUrl ? (
                        <Image
                          src={project.imageUrl}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 1024px) 100vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent/20 to-accent/5">
                          <span className="text-4xl font-bold text-accent/30">
                            {project.title.charAt(0)}
                          </span>
                        </div>
                      )}
                      {project.featured && (
                        <Badge className="absolute top-3 right-3 bg-accent">
                          Featured
                        </Badge>
                      )}
                    </div>

                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {project.category}
                        </Badge>
                      </div>
                      <CardTitle className="group-hover:text-accent transition-colors">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {project.excerpt}
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.slice(0, 3).map((tech, techIndex) => (
                            <Badge
                              key={techIndex}
                              variant="outline"
                              className="text-xs"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        <ArrowRight className="w-5 h-5 text-accent group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Mobile/Tablet Horizontal Scroll */}
        <div className="lg:hidden overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
          <div className="flex gap-4" style={{ width: 'max-content' }}>
            {projects.slice(0, 4).map((project, index) => (
              <motion.div
                key={project.id}
                variants={fadeInUp}
                className="w-[300px] md:w-[350px]"
              >
                <Link href={`/projects/${project.slug}`}>
                  <Card className="glass-card h-full overflow-hidden hover:border-accent/50 transition-colors group">
                    <div className="relative h-40 w-full overflow-hidden bg-muted">
                      {project.imageUrl ? (
                        <Image
                          src={project.imageUrl}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="350px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent/20 to-accent/5">
                          <span className="text-4xl font-bold text-accent/30">
                            {project.title.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>

                    <CardHeader>
                      <Badge variant="secondary" className="text-xs w-fit mb-2">
                        {project.category}
                      </Badge>
                      <CardTitle className="group-hover:text-accent transition-colors text-lg">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2 text-sm">
                        {project.excerpt}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* View All Projects Button */}
        <motion.div variants={fadeInUp} className="text-center mt-12">
          <Button asChild size="lg" className="hover-lift">
            <Link href="/projects" className="flex items-center gap-2">
              View All Projects
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </motion.section>
  )
}
