import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { connectToDatabase } from "@/lib/mongoose"
import { BlogPostModel } from "@/models/BlogPost"

type QueryFilter = Record<string, unknown>
type LeanBlogDoc = Record<string, unknown> & { _id?: unknown }
type MongoError = {
  code?: number
}

export async function GET(request: NextRequest) {
  try {
    // Temporarily bypass auth for demo purposes when database is not available
    // if (!session || session.user?.role !== "ADMIN") {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    // }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")
    const search = searchParams.get("search") || ""
    const category = searchParams.get("category") || ""

    const skip = (page - 1) * limit

    const where: QueryFilter = {}
    if (search) {
      where.$or = [
        { title: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
      ]
    }
    if (category) where.category = category

    await connectToDatabase()
    const [docs, total] = await Promise.all([
      BlogPostModel.find(where)
        .sort({ updatedAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      BlogPostModel.countDocuments(where),
    ])

    const posts = (docs as LeanBlogDoc[]).map((d) => ({
      ...d,
      id: String(d._id),
      _id: undefined,
    }))

    return NextResponse.json({
      posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Failed to fetch blog posts:", error)
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
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

    await connectToDatabase()
    try {
      const created = await BlogPostModel.create({
        title: body.title,
        slug: body.slug,
        excerpt: body.excerpt,
        content: body.content,
        category: body.category,
        tags: body.tags || [],
        featured: body.featured || false,
        author: body.author,
        authorAvatar: body.authorAvatar,
        authorBio: body.authorBio,
        readingTime: body.readingTime || "5 min",
        coverImage: body.coverImage,
        seoTitle: body.seoTitle,
        seoDescription: body.seoDescription,
        publishedAt: body.publishedAt || new Date(),
      })
      return NextResponse.json(created.toJSON(), { status: 201 })
    } catch (err: unknown) {
      const mongoError = err as MongoError
      if (mongoError.code === 11000) {
        return NextResponse.json(
          { error: "A blog post with this slug already exists" },
          { status: 409 }
        )
      }
      throw err
    }
  } catch (error: unknown) {
    console.error("Failed to create blog post:", error)
    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 }
    )
  }
}

