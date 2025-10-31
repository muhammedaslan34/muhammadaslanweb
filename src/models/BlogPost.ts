import mongoose, { Schema, Document, models, model } from "mongoose"

export interface BlogPostDocument extends Document {
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  featured: boolean
  author: string
  authorAvatar?: string
  authorBio?: string
  publishedAt: Date
  updatedAt: Date
  readingTime: string
  coverImage?: string
  seoTitle?: string
  seoDescription?: string
}

const BlogPostSchema = new Schema<BlogPostDocument>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    tags: { type: [String], default: [] },
    featured: { type: Boolean, default: false },
    author: { type: String, required: true },
    authorAvatar: { type: String },
    authorBio: { type: String },
    publishedAt: { type: Date, default: () => new Date() },
    readingTime: { type: String, default: "5 min" },
    coverImage: { type: String },
    seoTitle: { type: String },
    seoDescription: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform: (_doc, ret) => {
        ret.id = ret._id?.toString()
        delete ret._id
        return ret
      },
    },
  }
)

export const BlogPostModel = (models.BlogPost as mongoose.Model<BlogPostDocument>) || model<BlogPostDocument>("BlogPost", BlogPostSchema)


