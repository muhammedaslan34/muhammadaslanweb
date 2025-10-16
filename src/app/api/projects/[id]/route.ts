import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const project = await prisma.project.findUnique({
      where: { id: params.id },
    })

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    return NextResponse.json(project)
  } catch (error) {
    console.error("Failed to fetch project:", error)
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    
    const project = await prisma.project.update({
      where: { id: params.id },
      data: {
        title: body.title,
        slug: body.slug,
        description: body.description,
        excerpt: body.excerpt,
        category: body.category,
        technologies: body.technologies || [],
        featured: body.featured || false,
        imageUrl: body.imageUrl,
        liveUrl: body.liveUrl,
        githubUrl: body.githubUrl,
        client: body.client,
        duration: body.duration,
        services: body.services || [],
        achievements: body.achievements || [],
        challenges: body.challenges || [],
        solutions: body.solutions || [],
      },
    })

    return NextResponse.json(project)
  } catch (error: any) {
    console.error("Failed to update project:", error)
    
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "A project with this slug already exists" },
        { status: 409 }
      )
    }
    
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }
    
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await prisma.project.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Failed to delete project:", error)
    
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }
    
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    )
  }
}