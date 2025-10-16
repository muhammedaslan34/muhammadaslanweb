# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start development server on localhost:3000
- `npm run dev:port` - Start development server on custom port
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Database
- `npm run db:seed` - Seed database with initial data using `tsx prisma/seed.ts`

## Architecture Overview

This is a Next.js 15 portfolio website with TypeScript, using the App Router and MongoDB with Prisma ORM.

### Key Technologies
- **Framework**: Next.js 15 with App Router and typed routes
- **Database**: MongoDB with Prisma ORM
- **Authentication**: NextAuth.js with credentials provider and role-based access
- **Styling**: Tailwind CSS with custom UI components
- **Animations**: Framer Motion and GSAP
- **Content**: MDX support for blog posts

### Database Models
- **User**: Authentication with role-based access (USER/ADMIN)
- **Project**: Portfolio projects with categories, technologies, and metadata
- **BlogPost**: Blog content with SEO fields and categorization
- **ContactSubmission**: Contact form submissions with status tracking

### Key Directories
- `src/app/` - Next.js App Router pages and API routes
- `src/components/` - Reusable React components organized by feature
- `src/lib/` - Utility functions, Prisma client, and auth configuration
- `prisma/` - Database schema and seed files

### Authentication System
- Uses NextAuth.js with Prisma adapter
- Custom credentials provider with bcrypt password hashing
- Role-based access control (USER/ADMIN roles)
- Admin dashboard at `/admin/` routes protected by authentication
- Custom sign-in page at `/admin/login`

### Content Management
- Admin dashboard for managing projects and content
- Project management with full CRUD operations
- Contact form submissions tracking with status management
- Blog system ready for content creation

### Styling Patterns
- Uses `@/` import alias for src directory
- Custom UI components following Radix UI patterns
- Tailwind CSS with custom color schemes and animations
- Component-based architecture with shared UI elements

### Environment Setup
- Requires `MONGODB_URI` for database connection
- Requires NextAuth configuration with `NEXTAUTH_SECRET` and `NEXTAUTH_URL`
- Development environment supports hot reloading and TypeScript checking