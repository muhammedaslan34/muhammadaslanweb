import mongoose, { Schema, Document, models, model } from "mongoose"

export interface ProjectDocument extends Document {
  title: string
  slug: string
  description: string
  excerpt: string
  category: string
  technologies: string[]
  featured: boolean
  imageUrl?: string
  liveUrl?: string
  githubUrl?: string
  client?: string
  duration?: string
  services: string[]
  achievements: string[]
  challenges: string[]
  solutions: string[]
  createdAt: Date
  updatedAt: Date
}

const ProjectSchema = new Schema<ProjectDocument>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String, required: true },
    excerpt: { type: String, required: true },
    category: { type: String, required: true },
    technologies: { type: [String], default: [] },
    featured: { type: Boolean, default: false },
    imageUrl: { type: String },
    liveUrl: { type: String },
    githubUrl: { type: String },
    client: { type: String },
    duration: { type: String },
    services: { type: [String], default: [] },
    achievements: { type: [String], default: [] },
    challenges: { type: [String], default: [] },
    solutions: { type: [String], default: [] },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform: (_doc, ret) => {
        // Expose id as string and hide _id
        ret.id = ret._id?.toString()
        delete ret._id
        return ret
      },
    },
  }
)

export const ProjectModel = (models.Project as mongoose.Model<ProjectDocument>) || model<ProjectDocument>("Project", ProjectSchema)


