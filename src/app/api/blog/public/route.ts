import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongoose"
import { BlogPostModel } from "@/models/BlogPost"

type QueryFilter = Record<string, unknown>
type LeanBlogDoc = Record<string, unknown> & { _id?: unknown }

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "20")
    const category = searchParams.get("category") || ""

    const skip = (page - 1) * limit

    const where: QueryFilter = {}
    if (category) where.category = category

    await connectToDatabase()
    const [docs, total] = await Promise.all([
      BlogPostModel.find(where)
        .sort({ publishedAt: -1 })
        .skip(skip)
        .limit(limit)
        .select({
          title: 1,
          slug: 1,
          excerpt: 1,
          category: 1,
          tags: 1,
          featured: 1,
          author: 1,
          authorAvatar: 1,
          authorBio: 1,
          publishedAt: 1,
          readingTime: 1,
          coverImage: 1,
        })
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
