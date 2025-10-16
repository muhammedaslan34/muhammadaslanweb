"use client"

import { useState } from 'react'
import { ProjectsFilter } from '@/components/projects/projects-filter'
import { ProjectsGrid } from '@/components/projects/projects-grid'

export function ProjectsClient() {
  const [activeCategory, setActiveCategory] = useState("All Projects")
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTechnologies, setActiveTechnologies] = useState<string[]>([])

  return (
    <>
      <ProjectsFilter 
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        activeTechnologies={activeTechnologies}
        setActiveTechnologies={setActiveTechnologies}
      />
      <ProjectsGrid 
        activeCategory={activeCategory}
        searchTerm={searchTerm}
        activeTechnologies={activeTechnologies}
      />
    </>
  )
}