"use client"

import { Search, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getProjectCategories, getProjectTechnologies } from "@/data/projects"

const categories = ["All Projects", ...getProjectCategories()]
const technologies = getProjectTechnologies()

interface ProjectsFilterProps {
  activeCategory: string
  setActiveCategory: (category: string) => void
  searchTerm: string
  setSearchTerm: (term: string) => void
  activeTechnologies: string[]
  setActiveTechnologies: (technologies: string[]) => void
}

export function ProjectsFilter({
  activeCategory,
  setActiveCategory,
  searchTerm,
  setSearchTerm,
  activeTechnologies,
  setActiveTechnologies
}: ProjectsFilterProps) {
  const toggleTechnology = (tech: string) => {
    if (activeTechnologies.includes(tech)) {
      setActiveTechnologies(activeTechnologies.filter(t => t !== tech))
    } else {
      setActiveTechnologies([...activeTechnologies, tech])
    }
  }

  const clearAllFilters = () => {
    setActiveCategory("All Projects")
    setSearchTerm("")
    setActiveTechnologies([])
  }

  const hasActiveFilters = activeCategory !== "All Projects" || searchTerm !== "" || activeTechnologies.length > 0

  return (
    <section className="py-12 border-b bg-muted/30">
      <div className="container">
        <div className="space-y-6">
          {/* Search and Clear Filters */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 glass-card"
              />
            </div>
            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearAllFilters}
                className="glass-card hover-lift"
              >
                <X className="mr-2 h-4 w-4" />
                Clear Filters
              </Button>
            )}
          </div>

          {/* Category Filter */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(category)}
                  className={activeCategory === category ? "hover-lift" : "glass-card hover-lift"}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Technology Filter */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-sm font-medium text-muted-foreground">Technologies</h3>
              {activeTechnologies.length > 0 && (
                <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full">
                  {activeTechnologies.length} selected
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <Button
                  key={tech}
                  variant={activeTechnologies.includes(tech) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleTechnology(tech)}
                  className={activeTechnologies.includes(tech) ? "hover-lift text-xs" : "glass-card hover-lift text-xs"}
                >
                  {tech}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}