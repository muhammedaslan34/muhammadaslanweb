import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
      const result = await prisma.blogPost.deleteMany({})
      
      return NextResponse.json({ 
        message: `Successfully deleted ${result.count} blog posts`,
        deletedCount: result.count
      })
    } catch (dbError) {
      console.error("Database connection failed:", dbError)
      return NextResponse.json(
        { error: "Database connection failed. Cannot delete posts." },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error("Failed to delete blog posts:", error)
    return NextResponse.json(
      { error: "Failed to delete blog posts" },
      { status: 500 }
    )
  }
}