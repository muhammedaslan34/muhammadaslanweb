'use client'

import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Calendar, User, Clock } from 'lucide-react'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { ProjectStatus } from '@/types/project'

interface ProjectInfoBarProps {
  client?: string
  date: string
  status: ProjectStatus
  duration?: string
  technologies: string[]
}

const statusConfig = {
  completed: {
    label: 'Completed',
    color: 'bg-green-500/10 text-green-600 border-green-500/20'
  },
  'in-progress': {
    label: 'In Progress',
    color: 'bg-blue-500/10 text-blue-600 border-blue-500/20'
  },
  planned: {
    label: 'Planned',
    color: 'bg-purple-500/10 text-purple-600 border-purple-500/20'
  }
}

export function ProjectInfoBar({
  client,
  date,
  status,
  duration,
  technologies
}: ProjectInfoBarProps) {
  const statusStyle = statusConfig[status]

  return (
    <motion.section
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.3 }}
      className="py-8 border-y border-border bg-muted/30"
    >
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Project Info */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Project Info
            </h3>
            <div className="space-y-3">
              {client && (
                <div className="flex items-center gap-2 text-foreground">
                  <User className="w-4 h-4 text-accent" />
                  <span className="text-sm">{client}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-foreground">
                <Calendar className="w-4 h-4 text-accent" />
                <span className="text-sm">
                  {new Date(date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long'
                  })}
                </span>
              </div>
              {duration && (
                <div className="flex items-center gap-2 text-foreground">
                  <Clock className="w-4 h-4 text-accent" />
                  <span className="text-sm">{duration}</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Status */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Status
            </h3>
            <Badge
              variant="outline"
              className={`${statusStyle.color} border`}
            >
              {statusStyle.label}
            </Badge>
          </motion.div>

          {/* Technologies */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {technologies.slice(0, 4).map((tech, index) => (
                <Badge
                  key={index}
                  className="bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20 transition-colors text-xs"
                >
                  {tech}
                </Badge>
              ))}
              {technologies.length > 4 && (
                <Badge className="bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20 transition-colors text-xs">
                  +{technologies.length - 4} more
                </Badge>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
