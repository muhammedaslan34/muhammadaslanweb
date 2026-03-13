'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { fadeInLeft, fadeInRight, badgeAnimation, staggerContainer } from '@/lib/animations'
import { ExternalLink, Github } from 'lucide-react'

interface ProjectHeroProps {
  title: string
  subtitle?: string
  categories: string[]
  imageUrl?: string
  heroImage?: string
  heroAlt?: string
  liveUrl?: string
  githubUrl?: string
}

export function ProjectHero({
  title,
  subtitle,
  categories,
  imageUrl,
  heroImage,
  heroAlt = 'Project hero image',
  liveUrl,
  githubUrl
}: ProjectHeroProps) {
  const imageSrc = heroImage || imageUrl || '/placeholder-project.jpg'

  return (
    <motion.section
      initial="initial"
      animate="animate"
      className="py-12 md:py-20 bg-muted/30"
    >
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Project Title & Info */}
          <motion.div
            variants={staggerContainer}
            className="space-y-6"
          >
            {/* Category Badges */}
            <motion.div
              variants={badgeAnimation}
              className="flex flex-wrap gap-2"
            >
              {categories.map((category, index) => (
                <Badge
                  key={index}
                  className="bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20 transition-colors text-sm"
                >
                  {category}
                </Badge>
              ))}
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={fadeInLeft}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight"
            >
              {title}
            </motion.h1>

            {/* Subtitle */}
            {subtitle && (
              <motion.p
                variants={fadeInLeft}
                className="text-lg md:text-xl text-muted-foreground"
              >
                {subtitle}
              </motion.p>
            )}

            {/* Project Links */}
            {(liveUrl || githubUrl) && (
              <motion.div
                variants={fadeInLeft}
                className="flex flex-wrap gap-3 pt-2"
              >
                {liveUrl && (
                  <Button
                    asChild
                    className="bg-accent hover:bg-accent/90 text-accent-foreground hover-lift"
                  >
                    <a
                      href={liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Live Demo
                    </a>
                  </Button>
                )}
                {githubUrl && (
                  <Button
                    asChild
                    variant="outline"
                    className="border-accent text-accent hover:bg-accent/10 hover-lift"
                  >
                    <a
                      href={githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Github className="w-4 h-4" />
                      View on GitHub
                    </a>
                  </Button>
                )}
              </motion.div>
            )}
          </motion.div>

          {/* Right Column - Project Image */}
          <motion.div
            variants={fadeInRight}
            className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src={imageSrc}
              alt={heroAlt}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              quality={90}
            />
            {/* Optional gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent" />
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
