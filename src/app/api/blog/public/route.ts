import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "20")
    const category = searchParams.get("category") || ""

    const skip = (page - 1) * limit

    const where = {
      ...(category && { category }),
    }

    try {
      const [posts, total] = await Promise.all([
        prisma.blogPost.findMany({
          where,
          orderBy: { publishedAt: "desc" },
          skip,
          take: limit,
          select: {
            id: true,
            title: true,
            slug: true,
            excerpt: true,
            category: true,
            tags: true,
            featured: true,
            author: true,
            authorAvatar: true,
            authorBio: true,
            publishedAt: true,
            readingTime: true,
            coverImage: true,
          },
        }),
        prisma.blogPost.count({ where }),
      ])

      return NextResponse.json({
        posts,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      })
    } catch (dbError) {
      console.error("Database connection failed, no posts available:", dbError)
      
      return NextResponse.json({
        posts: [],
        pagination: {
          page,
          limit,
          total: 0,
          pages: 0,
        },
      })
    }
  } catch (error) {
    console.error("Failed to fetch blog posts:", error)
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    )
  }
}