import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { connectToDatabase } from "@/lib/mongoose"
import { BlogPostModel } from "@/models/BlogPost"

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectToDatabase()
    const result = await BlogPostModel.deleteMany({})
    return NextResponse.json({ 
      message: `Successfully deleted ${result.deletedCount || 0} blog posts`,
      deletedCount: result.deletedCount || 0
    })
  } catch (error) {
    console.error("Failed to delete blog posts:", error)
    return NextResponse.json(
      { error: "Failed to delete blog posts" },
      { status: 500 }
    )
  }
}