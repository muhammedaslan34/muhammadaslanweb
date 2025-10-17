import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    try {
      const post = await prisma.blogPost.findUnique({
        where: { slug },
      })

      if (!post) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 })
      }

      return NextResponse.json(post)
    } catch (dbError) {
      console.error("Database connection failed, no posts available:", dbError)
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }
  } catch (error) {
    console.error("Failed to fetch blog post:", error)
    return NextResponse.json(
      { error: "Failed to fetch blog post" },
      { status: 500 }
    )
  }
}