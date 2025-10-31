import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { connectToDatabase } from "@/lib/mongoose"
import { ProjectModel } from "@/models/Project"

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase()

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")
    const search = searchParams.get("search") || ""
    const category = searchParams.get("category") || ""
    const featured = searchParams.get("featured") === "true"

    const skip = (page - 1) * limit

    const where: any = {}
    if (search) {
      where.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
      ]
    }
    if (category) where.category = category
    if (featured) where.featured = true

    const [docs, total] = await Promise.all([
      ProjectModel.find(where)
        .sort({ updatedAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      ProjectModel.countDocuments(where),
    ])

    const projects = docs.map((d: any) => ({ ...d, id: String(d._id), _id: undefined }))

    return NextResponse.json({
      projects,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Failed to fetch projects:", error)
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    await connectToDatabase()

    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    try {
      // Uniqueness pre-check for clearer error message
      const existing = await ProjectModel.findOne({ slug: body.slug }).select({ _id: 1 }).lean()
      if (existing) {
        return NextResponse.json(
          { error: "A project with this slug already exists" },
          { status: 409 }
        )
      }

      const created = await ProjectModel.create({
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
      })
      const json = created.toJSON()
      return NextResponse.json(json, { status: 201 })
    } catch (err: any) {
      if (err?.code === 11000) {
        return NextResponse.json(
          { error: "A project with this slug already exists" },
          { status: 409 }
        )
      }
      if (err?.name === 'ValidationError') {
        const messages = Object.values(err.errors || {}).map((e: any) => e.message)
        return NextResponse.json(
          { error: messages.join(', ') || 'Validation failed' },
          { status: 400 }
        )
      }
      throw err
    }
  } catch (error: any) {
    console.error("Failed to create project:", error)

    const devMessage = typeof error?.message === 'string' ? error.message : 'Failed to create project'
    const message = process.env.NODE_ENV !== 'production' ? devMessage : 'Failed to create project'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}