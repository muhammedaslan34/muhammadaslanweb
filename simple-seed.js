const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('Start simple seeding...')
  
  // Clear existing data first
  await prisma.blogPost.deleteMany({})
  await prisma.project.deleteMany({})
  await prisma.user.deleteMany({})
  
  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12)
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@muhammadaslan.com',
      name: 'Muhammad Aslan',
      password: hashedPassword,
      role: 'ADMIN',
    }
  })
  console.log('Created admin user:', adminUser.email)

  // Create blog posts
  const blogPosts = [
    {
      title: "Building Modern WordPress Themes with Block Editor",
      slug: "modern-wordpress-themes-block-editor",
      excerpt: "Learn how to create custom WordPress themes that leverage the full power of the Gutenberg block editor for maximum flexibility.",
      content: "# Building Modern WordPress Themes with Block Editor\n\nWordPress has evolved significantly with the introduction of the Gutenberg block editor...",
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
      content: "# Next.js 14 App Router: Complete Migration Guide\n\nNext.js 14 introduced significant improvements to the App Router...",
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
      content: "# Optimizing WordPress Performance in 2024\n\nWordPress performance optimization has evolved significantly over the years...",
      category: "Performance",
      tags: ["WordPress", "Performance", "Optimization", "Core Web Vitals", "Speed"],
      featured: false,
      author: "Muhammad Aslan",
      authorBio: "Performance optimization specialist with WordPress expertise.",
      readingTime: "10 min read",
      coverImage: "/images/blog/wordpress-performance.jpg",
      seoTitle: "Optimizing WordPress Performance in 2024 | Muhammad Aslan",
      seoDescription: "Proven strategies to make your WordPress site lightning fast with modern optimization techniques and tools."
    },
    {
      title: "Modern JavaScript Frameworks Comparison 2024",
      slug: "javascript-frameworks-comparison-2024",
      excerpt: "A comprehensive comparison of React, Vue, Angular, and Svelte for modern web development in 2024.",
      content: "# Modern JavaScript Frameworks Comparison 2024\n\nChoosing the right JavaScript framework is crucial for your project's success...",
      category: "JavaScript",
      tags: ["JavaScript", "React", "Vue", "Angular", "Svelte", "Framework"],
      featured: true,
      author: "Muhammad Aslan",
      authorBio: "JavaScript expert with experience in multiple frameworks.",
      readingTime: "15 min read",
      coverImage: "/images/blog/js-frameworks.jpg",
      seoTitle: "Modern JavaScript Frameworks Comparison 2024 | Muhammad Aslan",
      seoDescription: "A comprehensive comparison of React, Vue, Angular, and Svelte for modern web development in 2024."
    },
    {
      title: "Full-Stack Development with TypeScript",
      slug: "fullstack-development-typescript",
      excerpt: "Building end-to-end web applications with TypeScript for both frontend and backend development.",
      content: "# Full-Stack Development with TypeScript\n\nTypeScript has become the go-to choice for scalable web applications...",
      category: "TypeScript",
      tags: ["TypeScript", "Full-Stack", "Node.js", "React", "Development"],
      featured: false,
      author: "Muhammad Aslan",
      authorBio: "TypeScript enthusiast and full-stack developer.",
      readingTime: "11 min read",
      coverImage: "/images/blog/typescript-fullstack.jpg",
      seoTitle: "Full-Stack Development with TypeScript | Muhammad Aslan",
      seoDescription: "Building end-to-end web applications with TypeScript for both frontend and backend development."
    },
    {
      title: "Database Design Best Practices",
      slug: "database-design-best-practices",
      excerpt: "Essential principles and patterns for designing scalable and maintainable database schemas.",
      content: "# Database Design Best Practices\n\nProper database design is the foundation of any successful application...",
      category: "Database",
      tags: ["Database", "Design", "SQL", "NoSQL", "Architecture"],
      featured: false,
      author: "Muhammad Aslan",
      authorBio: "Database architect with expertise in both SQL and NoSQL systems.",
      readingTime: "13 min read",
      coverImage: "/images/blog/database-design.jpg",
      seoTitle: "Database Design Best Practices | Muhammad Aslan",
      seoDescription: "Essential principles and patterns for designing scalable and maintainable database schemas."
    },
    {
      title: "API Development with Express.js and TypeScript",
      slug: "api-development-express-typescript",
      excerpt: "Building robust and scalable REST APIs using Express.js and TypeScript with modern best practices.",
      content: "# API Development with Express.js and TypeScript\n\nCreating robust APIs is essential for modern web applications...",
      category: "Backend",
      tags: ["Express.js", "TypeScript", "API", "Node.js", "REST"],
      featured: true,
      author: "Muhammad Aslan",
      authorBio: "Backend developer specializing in Node.js and API design.",
      readingTime: "14 min read",
      coverImage: "/images/blog/express-typescript.jpg",
      seoTitle: "API Development with Express.js and TypeScript | Muhammad Aslan",
      seoDescription: "Building robust and scalable REST APIs using Express.js and TypeScript with modern best practices."
    },
    {
      title: "Mobile-First Responsive Design in 2024",
      slug: "mobile-first-responsive-design-2024",
      excerpt: "Modern approaches to creating responsive web designs that work perfectly across all devices.",
      content: "# Mobile-First Responsive Design in 2024\n\nWith mobile traffic dominating the web, mobile-first design is more important than ever...",
      category: "Design",
      tags: ["Responsive Design", "CSS", "Mobile-First", "UI/UX", "Web Design"],
      featured: false,
      author: "Muhammad Aslan",
      authorBio: "UI/UX designer with focus on responsive and mobile-first design.",
      readingTime: "9 min read",
      coverImage: "/images/blog/mobile-first-design.jpg",
      seoTitle: "Mobile-First Responsive Design in 2024 | Muhammad Aslan",
      seoDescription: "Modern approaches to creating responsive web designs that work perfectly across all devices."
    }
  ]

  let postCount = 0
  for (const post of blogPosts) {
    try {
      await prisma.blogPost.create({
        data: post
      })
      postCount++
      console.log(`Created blog post: ${post.title}`)
    } catch (error) {
      console.log(`Error with blog post ${post.slug}:`, error.message)
    }
  }
  
  console.log(`Created ${postCount} blog post(s)`)
  console.log('Seeding finished.')
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