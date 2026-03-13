"use client"

export const dynamic = "force-dynamic"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ImageUpload } from "@/components/admin/image-upload"
import { ArrowLeft, Save, X } from "lucide-react"
import { toast } from "sonner"

export default function NewProject() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    excerpt: "",
    category: "",
    technologies: [] as string[],
    featured: false,
    imageUrl: "",
    liveUrl: "",
    githubUrl: "",
    client: "",
    duration: "",
    services: [] as string[],
    achievements: [] as string[],
    challenges: [] as string[],
    solutions: [] as string[],
  })
  const [techInput, setTechInput] = useState("")
  const [serviceInput, setServiceInput] = useState("")
  const [achievementInput, setAchievementInput] = useState("")
  const [challengeInput, setChallengeInput] = useState("")
  const [solutionInput, setSolutionInput] = useState("")

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  const handleTitleChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      title: value,
      slug: value ? generateSlug(value) : prev.slug
    }))
  }

  const addTag = (value: string, field: 'technologies' | 'services' | 'achievements' | 'challenges' | 'solutions') => {
    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        [field]: [...prev[field], value.trim()]
      }))
    }
  }

  const removeTag = (index: number, field: 'technologies' | 'services' | 'achievements' | 'challenges' | 'solutions') => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title || !formData.slug || !formData.description || !formData.excerpt || !formData.category) {
      toast.error("Please fill in all required fields")
      return
    }

    setLoading(true)
    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to create project")
      }

      toast.success("Project created successfully!")
      router.push("/admin/projects")
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to create project"
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-main">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-main">
        <div className="text-center">Access Denied</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-main">
      <header className="bg-muted/30 border-b">
        <div className="container flex items-center justify-between h-16 px-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              asChild
            >
              <Link href="/admin/projects">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Projects
              </Link>
            </Button>
            <h1 className="text-xl font-semibold">Create New Project</h1>
          </div>
        </div>
      </header>

      <main className="container py-8 px-4 max-w-4xl">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
            <CardDescription>
              Fill in the details for your new project
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Project title"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug *</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    placeholder="project-slug"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt *</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                  placeholder="Brief description of the project"
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Detailed project description"
                  rows={5}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    placeholder="e.g., Web Development, E-Commerce"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client">Client</Label>
                  <Input
                    id="client"
                    value={formData.client}
                    onChange={(e) => setFormData(prev => ({ ...prev, client: e.target.value }))}
                    placeholder="Client name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Technologies</Label>
                <div className="flex gap-2">
                  <Input
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    placeholder="Add technology"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        if (techInput.trim()) {
                          addTag(techInput, 'technologies')
                          setTechInput("")
                        }
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      if (techInput.trim()) {
                        addTag(techInput, 'technologies')
                        setTechInput("")
                      }
                    }}
                  >
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.technologies.map((tech, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {tech}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => removeTag(index, 'technologies')}
                      />
                    </Badge>
                  ))}
                </div>
              </div>

              <ImageUpload
                value={formData.imageUrl}
                onChange={(url) => setFormData(prev => ({ ...prev, imageUrl: url }))}
                label="Project Image"
                uploadType="projects"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="liveUrl">Live URL</Label>
                  <Input
                    id="liveUrl"
                    value={formData.liveUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, liveUrl: e.target.value }))}
                    placeholder="https://project-demo.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="githubUrl">GitHub URL</Label>
                  <Input
                    id="githubUrl"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, githubUrl: e.target.value }))}
                    placeholder="https://github.com/user/project"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                    placeholder="e.g., 3 months"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                    className="rounded"
                  />
                  <Label htmlFor="featured">Featured Project</Label>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Services</Label>
                <div className="flex gap-2">
                  <Input
                    value={serviceInput}
                    onChange={(e) => setServiceInput(e.target.value)}
                    placeholder="Add service"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        if (serviceInput.trim()) {
                          addTag(serviceInput, 'services')
                          setServiceInput("")
                        }
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      if (serviceInput.trim()) {
                        addTag(serviceInput, 'services')
                        setServiceInput("")
                      }
                    }}
                  >
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.services.map((service, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {service}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => removeTag(index, 'services')}
                      />
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Achievements</Label>
                <div className="flex gap-2">
                  <Input
                    value={achievementInput}
                    onChange={(e) => setAchievementInput(e.target.value)}
                    placeholder="Add achievement"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        if (achievementInput.trim()) {
                          addTag(achievementInput, 'achievements')
                          setAchievementInput("")
                        }
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      if (achievementInput.trim()) {
                        addTag(achievementInput, 'achievements')
                        setAchievementInput("")
                      }
                    }}
                  >
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.achievements.map((achievement, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {achievement}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => removeTag(index, 'achievements')}
                      />
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Challenges</Label>
                <div className="flex gap-2">
                  <Input
                    value={challengeInput}
                    onChange={(e) => setChallengeInput(e.target.value)}
                    placeholder="Add challenge"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        if (challengeInput.trim()) {
                          addTag(challengeInput, 'challenges')
                          setChallengeInput("")
                        }
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      if (challengeInput.trim()) {
                        addTag(challengeInput, 'challenges')
                        setChallengeInput("")
                      }
                    }}
                  >
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.challenges.map((challenge, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {challenge}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => removeTag(index, 'challenges')}
                      />
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Solutions</Label>
                <div className="flex gap-2">
                  <Input
                    value={solutionInput}
                    onChange={(e) => setSolutionInput(e.target.value)}
                    placeholder="Add solution"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        if (solutionInput.trim()) {
                          addTag(solutionInput, 'solutions')
                          setSolutionInput("")
                        }
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      if (solutionInput.trim()) {
                        addTag(solutionInput, 'solutions')
                        setSolutionInput("")
                      }
                    }}
                  >
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.solutions.map((solution, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {solution}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => removeTag(index, 'solutions')}
                      />
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/admin/projects")}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  <Save className="h-4 w-4 mr-2" />
                  {loading ? "Creating..." : "Create Project"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
