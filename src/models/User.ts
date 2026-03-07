import mongoose, { Schema, Document, models, model } from "mongoose"

export type UserRole = "USER" | "ADMIN"

export interface UserDocument extends Document {
  email: string
  name?: string
  password: string
  avatar?: string
  role: UserRole
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<UserDocument>(
  {
    email: { type: String, required: true, unique: true, index: true },
    name: { type: String },
    password: { type: String, required: true },
    avatar: { type: String },
    role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform: (_doc, ret) => {
        ret.id = ret._id?.toString()
        delete ret._id
        delete (ret as any).password
        return ret
      },
    },
  }
)

export const UserModel = (models.User as mongoose.Model<UserDocument>) || model<UserDocument>("User", UserSchema)


