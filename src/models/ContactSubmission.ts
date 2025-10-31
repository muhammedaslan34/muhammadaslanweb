import mongoose, { Schema, Document, models, model } from "mongoose"

export type SubmissionStatus = "NEW" | "READ" | "REPLIED" | "ARCHIVED"

export interface ContactSubmissionDocument extends Document {
  name: string
  email: string
  budget?: string
  timeline?: string
  message: string
  status: SubmissionStatus
  createdAt: Date
  updatedAt: Date
}

const ContactSubmissionSchema = new Schema<ContactSubmissionDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    budget: { type: String },
    timeline: { type: String },
    message: { type: String, required: true },
    status: { type: String, enum: ["NEW", "READ", "REPLIED", "ARCHIVED"], default: "NEW" },
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

export const ContactSubmissionModel = (models.ContactSubmission as mongoose.Model<ContactSubmissionDocument>) || model<ContactSubmissionDocument>("ContactSubmission", ContactSubmissionSchema)


