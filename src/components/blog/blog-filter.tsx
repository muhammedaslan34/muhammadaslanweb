"use client"

import { useState } from "react"
import { Search, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { getPostCategories, getPostTags } from '@/data/blog'

const categories = ["All Posts", ...getPostCategories()]
const popularTags = getPostTags()

export function BlogFilter() {
  const [activeCategory, setActiveCategory] = useState("All Posts")
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <section className="py-12 border-b bg-muted/30">
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 glass-card"
            />
          </div>

          {/* Category Filter */}
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

          {/* Popular Tags */}
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-muted-foreground" />
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag) => (
                <Button
                  key={tag}
                  variant="outline"
                  size="sm"
                  className="glass-card hover-lift text-xs"
                >
                  #{tag}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}