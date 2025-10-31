// Extended Project Types for Project Details Page

export interface ProjectFeature {
  title: string
  description: string
  icon?: string
}

export interface ProjectImage {
  url: string
  alt: string
  caption?: string
}

export interface ProjectMetric {
  label: string
  value: string
  suffix?: string
}

export interface ProjectTestimonial {
  quote: string
  author: string
  role: string
  avatar?: string
}

export interface ProjectHero {
  image: string
  video?: string
  alt: string
}

export interface ProjectLinks {
  github?: string
  live?: string
  caseStudy?: string
}

export type ProjectStatus = 'completed' | 'in-progress' | 'planned'

// Extended Project interface matching PRD requirements
export interface ExtendedProject {
  id: string
  slug: string
  title: string
  subtitle?: string
  category: string[]
  client?: string
  date: string
  status: ProjectStatus
  hero?: ProjectHero
  description: string
  excerpt: string
  challenge?: string
  solution?: string
  technologies: string[]
  links: ProjectLinks
  features?: ProjectFeature[]
  gallery?: ProjectImage[]
  metrics?: ProjectMetric[]
  testimonials?: ProjectTestimonial[]
  relatedProjects?: string[]
  imageUrl?: string
  liveUrl?: string
  githubUrl?: string
  duration?: string
  services?: string[]
  achievements?: string[]
  challenges?: string[]
  solutions?: string[]
  featured: boolean
  createdAt: string
  updatedAt: string
}

// Base Project type from database
export interface Project {
  id: string
  title: string
  slug: string
  description: string
  excerpt: string
  category: string
  technologies: string[]
  featured: boolean
  imageUrl?: string
  liveUrl?: string
  githubUrl?: string
  client?: string
  duration?: string
  services?: string[]
  achievements?: string[]
  challenges?: string[]
  solutions?: string[]
  createdAt: string
  updatedAt: string
}
