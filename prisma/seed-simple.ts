import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Start simple seeding...')
  console.log('MONGODB_URI:', process.env.MONGODB_URI)

  // Create admin user using create if not exists
  const hashedPassword = await bcrypt.hash('admin123', 12)
  try {
    const existingAdmin = await prisma.user.findUnique({
      where: { email: 'admin@muhammadaslan.com' }
    })

    if (!existingAdmin) {
      const adminUser = await prisma.user.create({
        data: {
          email: 'admin@muhammadaslan.com',
          name: 'Muhammad Aslan',
          password: hashedPassword,
          role: 'ADMIN',
        }
      })
      console.log('Created admin user:', adminUser.email)
    } else {
      console.log('Admin user already exists:', existingAdmin.email)
    }
  } catch (error: any) {
    console.log('Error with admin user:', error.message)
  }

  // Sample project data
  const projects = [
    {
      title: "DT Masters - Driving School Platform",
      slug: "dtmasters",
      description: "A comprehensive driving school management system with booking, scheduling, and student progress tracking.",
      excerpt: "Modern driving school platform with real-time booking, instructor management, and progress tracking.",
      category: "Web Development",
      technologies: ["WordPress", "PHP", "MySQL", "JavaScript", "Bootstrap"],
      featured: true,
      imageUrl: "/images/projects/dtmasters.jpg",
      liveUrl: "https://dtmasters.com",
      client: "DT Masters Driving School",
      duration: "3 months",
      services: ["Web Design", "Development", "Booking System", "Database Design"],
      achievements: [
        "Increased student enrollment by 40%",
        "Reduced administrative workload by 60%",
        "Implemented automated scheduling system",
        "Created mobile-responsive interface"
      ],
      challenges: [
        "Complex scheduling requirements",
        "Real-time availability updates",
        "Payment integration",
        "Progress tracking system"
      ],
      solutions: [
        "Custom booking algorithm",
        "Real-time database synchronization",
        "Payment gateway integration",
        "Interactive dashboard design"
      ]
    },
    {
      title: "E-Commerce Fashion Store",
      slug: "fashion-store",
      description: "A full-featured e-commerce platform with product management, shopping cart, and payment integration.",
      excerpt: "Modern fashion e-commerce site with inventory management and secure payment processing.",
      category: "E-Commerce",
      technologies: ["Next.js", "React", "Node.js", "MongoDB", "Stripe"],
      featured: true,
      imageUrl: "/images/projects/fashion-store.jpg",
      liveUrl: "https://fashion-store-demo.com",
      githubUrl: "https://github.com/username/fashion-store",
      client: "Fashion Boutique",
      duration: "4 months",
      services: ["E-Commerce Development", "UI/UX Design", "Payment Integration", "SEO"],
      achievements: [
        "Achieved 99.9% uptime",
        "Implemented advanced search functionality",
        "Optimized for mobile commerce",
        "Integrated multiple payment methods"
      ],
      challenges: [
        "Large product catalog management",
        "Performance optimization",
        "Secure payment processing",
        "Inventory synchronization"
      ],
      solutions: [
        "Efficient database architecture",
        "Image optimization and CDN",
        "PCI compliant payment system",
        "Real-time inventory tracking"
      ]
    },
    {
      title: "Real Estate Portal",
      slug: "real-estate-portal",
      description: "A comprehensive real estate platform with property listings, search filters, and agent management.",
      excerpt: "Property management platform with advanced search, virtual tours, and agent tools.",
      category: "Real Estate",
      technologies: ["WordPress", "PHP", "JavaScript", "Mapbox API", "MySQL"],
      featured: false,
      imageUrl: "/images/projects/real-estate.jpg",
      liveUrl: "https://realestate-demo.com",
      client: "Real Estate Agency",
      duration: "2 months",
      services: ["Web Development", "Map Integration", "Property Management", "Agent Dashboard"],
      achievements: [
        "Increased property inquiries by 35%",
        "Implemented virtual tour feature",
        "Created advanced search filters",
        "Built agent management system"
      ],
      challenges: [
        "Complex search functionality",
        "Map integration",
        "Property image management",
        "Agent-client communication"
      ],
      solutions: [
        "Custom search algorithm",
        "Interactive map implementation",
        "Image optimization system",
        "Integrated messaging system"
      ]
    }
  ]

  // Create projects using create if not exists (no transactions)
  let projectCount = 0
  for (const projectData of projects) {
    try {
      const existingProject = await prisma.project.findUnique({
        where: { slug: projectData.slug }
      })

      if (!existingProject) {
        await prisma.project.create({
          data: projectData
        })
        projectCount++
        console.log(`Created project: ${projectData.slug}`)
      } else {
        console.log(`Project already exists: ${projectData.slug}`)
      }
    } catch (error: any) {
      console.log(`Error with project ${projectData.slug}:`, error.message)
    }
  }
  console.log(`Created ${projectCount} new project(s)`)

  // Sample blog post data
  const blogPosts = [
    {
      title: "Building Modern WordPress Themes with Block Editor",
      slug: "modern-wordpress-themes-block-editor",
      excerpt: "Learn how to create custom WordPress themes that leverage the full power of the Gutenberg block editor for maximum flexibility.",
      content: `# Building Modern WordPress Themes with Block Editor

WordPress has evolved significantly with the introduction of the Gutenberg block editor. This powerful tool has transformed how we create and manage content, offering unprecedented flexibility for both developers and content creators.

## What is the Block Editor?

The Gutenberg block editor, introduced in WordPress 5.0, represents a fundamental shift in how content is created and managed. Instead of a single content field, it uses a block-based approach where each piece of content is a separate block.

## Key Benefits

### 1. **Flexibility**
- Custom blocks can be created for specific content types
- Blocks can be reused across different pages and posts
- Layouts can be easily modified without touching code

### 2. **User Experience**
- Intuitive drag-and-drop interface
- Real-time preview of changes
- Mobile-responsive editing

### 3. **Developer Control**
- Precise control over block behavior
- Custom styling options
- Integration with modern JavaScript frameworks

## Conclusion

The WordPress block editor opens up new possibilities for theme development. By embracing this technology, you can create more flexible, user-friendly themes that stand out in the crowded WordPress ecosystem.`,
      category: "WordPress",
      tags: ["WordPress", "Gutenberg", "PHP", "JavaScript", "Theme Development"],
      featured: true,
      author: "Muhammad Aslan",
      authorBio: "Web developer specializing in WordPress and modern web technologies.",
      readingTime: "8 min read",
      coverImage: "/images/blog/wordpress-block-editor.jpg",
      seoTitle: "Building Modern WordPress Themes with Block Editor | Muhammad Aslan",
      seoDescription: "Learn how to create custom WordPress themes that leverage the full power of the Gutenberg block editor for maximum flexibility."
    },
    {
      title: "Next.js 14 App Router: Complete Migration Guide",
      slug: "nextjs-14-app-router-migration-guide",
      excerpt: "Everything you need to know about migrating to Next.js 14's App Router, including best practices and common pitfalls.",
      content: `# Next.js 14 App Router: Complete Migration Guide

Next.js 14 introduced significant improvements to the App Router, making it more powerful and flexible than ever before. This guide will help you migrate your existing Next.js applications to take advantage of these new features.

## What is the App Router?

The App Router is a new routing paradigm in Next.js that leverages React Server Components (RSC) and provides a more intuitive way to build layouts, loading states, and error boundaries.

## Key Benefits

### 1. **Server Components by Default**
- Improved performance by default
- Reduced client-side JavaScript
- Better SEO capabilities

### 2. **Nested Layouts**
- Shared UI between routes
- Persistent state across navigation
- Complex routing patterns made simple

## Migration Steps

### Step 1: Update Dependencies

\`\`\`bash
npm install next@14 react@18 react-dom@18
\`\`\`

### Step 2: Update Project Structure

Move your pages to the \`app\` directory:

\`\`\`
src/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx           # Home page
│   ├── about/
│   │   └── page.tsx       # About page
│   └── blog/
│       ├── page.tsx       # Blog listing
│       └── [slug]/
│           └── page.tsx   # Blog post
└── components/
    └── ...
\`\`\`

## Conclusion

Migrating to the App Router requires careful planning and execution, but the benefits in performance and developer experience are well worth the effort.`,
      category: "React & Next.js",
      tags: ["Next.js", "React", "TypeScript", "App Router", "Migration"],
      featured: true,
      author: "Muhammad Aslan",
      authorBio: "Full-stack developer with expertise in React and Next.js.",
      readingTime: "12 min read",
      coverImage: "/images/blog/nextjs-app-router.jpg",
      seoTitle: "Next.js 14 App Router: Complete Migration Guide | Muhammad Aslan",
      seoDescription: "Everything you need to know about migrating to Next.js 14's App Router, including best practices and common pitfalls."
    },
    {
      title: "Optimizing WordPress Performance in 2024",
      slug: "wordpress-performance-optimization-2024",
      excerpt: "Proven strategies to make your WordPress site lightning fast with modern optimization techniques and tools.",
      content: `# Optimizing WordPress Performance in 2024

WordPress performance optimization has evolved significantly over the years. In this guide, we'll explore the latest techniques and tools to make your WordPress site lightning fast.

## Why Performance Matters

- **User Experience**: Faster sites provide better user experience
- **SEO**: Google uses page speed as a ranking factor
- **Conversions**: Faster sites have higher conversion rates
- **Mobile**: Performance is crucial on mobile devices

## Core Web Vitals

Understanding and optimizing for Core Web Vitals is essential:

1. **Largest Contentful Paint (LCP)**: Main content loading time
2. **First Input Delay (FID)**: Interactivity measurement
3. **Cumulative Layout Shift (CLS)**: Visual stability

## Optimization Strategies

### 1. **Hosting Environment**

Choose the right hosting solution:
- Managed WordPress hosting
- CDN integration
- Server location matters
- PHP version optimization

### 2. **Caching Strategy**

Implement comprehensive caching:
- Page caching
- Browser caching
- Object caching
- Database query caching

### 3. **Image Optimization**

Optimize images for web:
- Use modern formats (WebP, AVIF)
- Implement lazy loading
- Compress images
- Use responsive images

## Conclusion

WordPress performance optimization is an ongoing process. Stay updated with the latest techniques and tools to ensure your site remains fast and efficient.`,
      category: "Performance",
      tags: ["WordPress", "Performance", "Optimization", "Core Web Vitals", "Speed"],
      featured: false,
      author: "Muhammad Aslan",
      authorBio: "Performance optimization specialist with WordPress expertise.",
      readingTime: "10 min read",
      coverImage: "/images/blog/wordpress-performance.jpg",
      seoTitle: "Optimizing WordPress Performance in 2024 | Muhammad Aslan",
      seoDescription: "Proven strategies to make your WordPress site lightning fast with modern optimization techniques and tools."
    }
  ]

  // Create blog posts using create if not exists (no transactions)
  let postCount = 0
  for (const post of blogPosts) {
    try {
      const existingPost = await prisma.blogPost.findUnique({
        where: { slug: post.slug }
      })

      if (!existingPost) {
        await prisma.blogPost.create({
          data: post
        })
        postCount++
        console.log(`Created blog post: ${post.slug}`)
      } else {
        console.log(`Blog post already exists: ${post.slug}`)
      }
    } catch (error: any) {
      console.log(`Error with blog post ${post.slug}:`, error.message)
    }
  }
  console.log(`Created ${postCount} new blog post(s)`)
  console.log('Simple seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })