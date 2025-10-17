import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    // Allow public access for GET requests - only require auth for write operations
    // This makes the projects visible on the public website while keeping write operations secure

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")
    const search = searchParams.get("search") || ""
    const category = searchParams.get("category") || ""

    const skip = (page - 1) * limit

    const where = {
      ...(search && {
        OR: [
          { title: { contains: search, mode: "insensitive" as const } },
          { description: { contains: search, mode: "insensitive" as const } },
          { excerpt: { contains: search, mode: "insensitive" as const } },
        ],
      }),
      ...(category && { category }),
    }

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where,
        orderBy: { updatedAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.project.count({ where }),
    ])

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
    
    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    
    // Handle MongoDB replica set issue by catching and providing workaround
    let project;
    try {
      project = await prisma.project.create({
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
    } catch (createError: any) {
      if (createError.code === 'P2031') {
        // MongoDB replica set error - provide helpful error message
        return NextResponse.json(
          {
            error: "MongoDB replica set configuration required",
            message: "Please configure your MongoDB server as a replica set for Prisma transactions.",
            solution: "Contact your database administrator to run: rs.initiate()",
            temporaryWorkaround: "Alternatively, the admin team can manually add projects to the database"
          },
          { status: 503 }
        )
      }
      throw createError;
    }

    return NextResponse.json(project, { status: 201 })
  } catch (error: any) {
    console.error("Failed to create project:", error)
    
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "A project with this slug already exists" },
        { status: 409 }
      )
    }
    
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    )
  }
}