import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { connectToDatabase } from "./mongoose"
import { UserModel } from "@/models/User"

type DbUser = {
  _id?: unknown
  id?: unknown
  email?: string | null
  name?: string | null
  role?: string
  password?: string
}

// Extend the built-in session and JWT types
declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      role: string
    }
  }

  interface User {
    id: string
    name?: string | null
    email?: string | null
    image?: string | null
    role: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        await connectToDatabase()
        const user = await UserModel.findOne({ email: credentials.email }).lean()
        const userData = user as DbUser | null

        if (!userData) {
          return null
        }

        if (!userData.password) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          userData.password
        )

        if (!isPasswordValid) {
          return null
        }

        return {
          id: String(userData._id || userData.id),
          email: userData.email,
          name: userData.name,
          role: userData.role || "USER",
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub!
        session.user.role = token.role as string
      }
      return session
    }
  },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  }
}
