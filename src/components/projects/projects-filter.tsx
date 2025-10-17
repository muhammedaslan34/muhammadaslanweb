"use client"

import { useState, useEffect } from "react"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

interface ProjectsFilterProps {
  activeCategory: string
  setActiveCategory: (category: string) => void
  searchTerm: string
  setSearchTerm: (term: string) => void
}

export function ProjectsFilter({
  activeCategory,
  setActiveCategory,
  searchTerm,
  setSearchTerm
}: ProjectsFilterProps) {
  const [categories, setCategories] = useState<string[]>(["All Projects"])

  // Fetch categories from database
  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/projects?limit=100')
      if (!response.ok) throw new Error('Failed to fetch projects')

      const data = await response.json()
      const projectCategories = data.projects.reduce((acc: string[], project: any) => {
        if (!acc.includes(project.category)) {
          acc.push(project.category)
        }
        return acc
      }, [])

      setCategories(["All Projects", ...projectCategories])
    } catch (error) {
      console.error('Error fetching categories:', error)
      toast.error('Failed to load categories')
    }
  }

  const clearAllFilters = () => {
    setActiveCategory("All Projects")
    setSearchTerm("")
  }

  const hasActiveFilters = activeCategory !== "All Projects" || searchTerm !== ""

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
        </div>
      </div>
    </section>
  )
}