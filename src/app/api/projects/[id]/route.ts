import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { connectToDatabase } from "@/lib/mongoose"
import { ProjectModel } from "@/models/Project"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectToDatabase()
    const { id } = await params
    const project = await ProjectModel.findById(id).lean()

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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()

    const updated = await ProjectModel.findByIdAndUpdate(
      id,
      {
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
      { new: true }
    )

    if (!updated) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    return NextResponse.json(updated.toJSON())
  } catch (error: unknown) {
    console.error("Failed to update project:", error)

    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectToDatabase()
    const { id } = await params
    const deleted = await ProjectModel.findByIdAndDelete(id)
    if (!deleted) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }
    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    console.error("Failed to delete project:", error)

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code?: string }).code === "P2031"
    ) {
      // MongoDB replica set error
      return NextResponse.json(
        {
          error: "MongoDB replica set configuration required",
          message: "Please configure your MongoDB server as a replica set for Prisma transactions.",
          solution: "Contact your database administrator to run: rs.initiate()"
        },
        { status: 503 }
      )
    }

    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    )
  }
}
