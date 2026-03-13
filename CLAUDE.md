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

This is a Next.js 15 portfolio website with TypeScript, using App Router and MongoDB with Prisma ORM. The application serves as both a public portfolio showcase and an admin content management system.

### Key Technologies
- **Framework**: Next.js 15 with App Router, TypeScript, and static generation
- **Database**: MongoDB with Prisma ORM and type-safe queries
- **Authentication**: NextAuth.js with JWT strategy and credentials provider
- **Styling**: Tailwind CSS v4 with custom UI components and shadcn/ui patterns
- **Animations**: Framer Motion for page transitions and GSAP for complex animations
- **Content**: MDX support for blog posts with rehype plugins
- **Icons**: Lucide React with consistent icon system

### Database Models
The application uses four primary models:
- **User**: Authentication with email/password and role-based access (USER/ADMIN)
- **Project**: Portfolio projects with slug routing, technologies array, and rich metadata
- **BlogPost**: Blog content with SEO optimization, tags, and author information
- **ContactSubmission**: Form submissions with status tracking and admin management

### Application Structure

#### Public Routes (Portfolio)
- `/` - Hero section with featured projects and service overview
- `/about` - Personal story, skills, and experience showcase
- `/projects` - Portfolio gallery with filtering and detailed project pages
- `/projects/[slug]` - Individual project details with live previews
- `/blog` - Blog listing with dynamic content from admin system
- `/blog/[slug]` - Individual blog post pages
- `/services` - Service offerings and development packages
- `/contact` - Contact form with budget and timeline selection
- `/pricing` - Service packages and pricing information

#### Admin System (`/admin/*`)
- `/admin/login` - Custom authentication page with credentials
- `/admin/dashboard` - Admin overview with statistics and quick actions
- `/admin/projects` - CRUD interface for portfolio projects
- `/admin/projects/new` - Project creation form
- `/admin/projects/[id]/edit` - Project editing interface
- `/admin/blog` - Blog post management system
- `/admin/blog/new` - Blog post creation with rich editor
- `/admin/blog/[id]/edit` - Blog post editing interface

#### API Routes (`/api/*`)
- `/api/auth/[...nextauth]` - NextAuth.js authentication handler
- `/api/projects` - Projects CRUD endpoints with MongoDB integration
- `/api/projects/[id]` - Individual project operations
- `/api/blog` - Blog posts CRUD with admin authentication
- `/api/blog/[id]` - Individual blog post operations
- `/api/blog/public` - Public blog endpoint without authentication
- `/api/blog/slug/[slug]` - Blog post by slug lookup
- `/api/contact` - Contact form submission handler
- `/api/upload` - File upload handling for images

### Authentication Architecture
The authentication system uses NextAuth.js with a custom implementation:
- **Strategy**: JWT-based sessions for stateless authentication
- **Provider**: Custom credentials provider with bcrypt password hashing
- **Adapter**: Prisma adapter for user session management in MongoDB
- **Role System**: USER/ADMIN roles with protected route middleware
- **Session Extension**: Custom session callbacks to include role information
- **Protected Routes**: Admin routes automatically redirect to login if unauthenticated

### Content Management System
The admin system provides full content management capabilities:
- **Project Management**: Create, edit, delete projects with image uploads
- **Blog System**: Rich text editing with markdown support and SEO optimization
- **Contact Management**: View and manage contact form submissions with status tracking
- **Media Handling**: Image upload and management for projects and blog posts
- **SEO Tools**: Meta title, description, and slug management for all content

### Component Architecture
- **UI Components**: Custom implementations of common patterns (buttons, forms, cards)
- **Layout Components**: Reusable layouts for admin and public sections
- **Feature Components**: Specialized components organized by feature area
- **Custom Avatar**: HTML-based avatar component replacing Radix UI dependency
- **Responsive Design**: Mobile-first approach with Tailwind CSS breakpoints

### Development Patterns
- **Import Alias**: Uses `@/` for clean imports from src directory
- **TypeScript**: Strict type checking with Prisma-generated types
- **Error Handling**: Comprehensive error boundaries and API error responses
- **Performance**: Static generation where possible, dynamic routes for content
- **SEO**: Meta tags, Open Graph, and structured data implementation

### Environment Requirements
- **MONGODB_URI**: MongoDB connection string for database access
- **NEXTAUTH_SECRET**: Secret key for JWT token signing
- **NEXTAUTH_URL**: Application URL for NextAuth.js callbacks
- **Node.js**: Version 18.x or higher for optimal Next.js 15 support

### Known Issues and Solutions
- **Avatar Component**: Uses custom HTML implementation instead of Radix UI due to module resolution issues
- **Dynamic Routes**: Admin routes use `force-dynamic` export for proper authentication
- **CSS Warnings**: Complex Tailwind selectors may generate PostCSS warnings (non-breaking)