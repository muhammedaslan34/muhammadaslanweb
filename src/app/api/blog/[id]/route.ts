import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { connectToDatabase } from "@/lib/mongoose"
import { BlogPostModel } from "@/models/BlogPost"

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
    const post = await BlogPostModel.findById(id).lean()

    if (!post) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error("Failed to fetch blog post:", error)
    return NextResponse.json(
      { error: "Failed to fetch blog post" },
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

    const updated = await BlogPostModel.findByIdAndUpdate(
      id,
      {
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
        readingTime: body.readingTime,
        coverImage: body.coverImage,
        seoTitle: body.seoTitle,
        seoDescription: body.seoDescription,
        publishedAt: body.publishedAt,
      },
      { new: true }
    )

    if (!updated) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }

    return NextResponse.json(updated.toJSON())
  } catch (error: unknown) {
    console.error("Failed to update blog post:", error)

    return NextResponse.json(
      { error: "Failed to update blog post" },
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
    const deleted = await BlogPostModel.findByIdAndDelete(id)
    if (!deleted) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }
    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    console.error("Failed to delete blog post:", error)

    return NextResponse.json(
      { error: "Failed to delete blog post" },
      { status: 500 }
    )
  }
}
