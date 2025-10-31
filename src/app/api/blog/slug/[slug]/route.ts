import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongoose"
import { BlogPostModel } from "@/models/BlogPost"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    await connectToDatabase()
    const doc = await BlogPostModel.findOne({ slug }).lean()
    if (!doc) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }
    const post = { ...doc, id: String((doc as any)._id), _id: undefined }
    return NextResponse.json(post)
  } catch (error) {
    console.error("Failed to fetch blog post:", error)
    return NextResponse.json(
      { error: "Failed to fetch blog post" },
      { status: 500 }
    )
  }
}