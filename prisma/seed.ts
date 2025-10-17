import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')
  console.log('MONGODB_URI:', process.env.MONGODB_URI)

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12)
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@muhammadaslan.com' },
    update: {},
    create: {
      email: 'admin@muhammadaslan.com',
      name: 'Muhammad Aslan',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })

  console.log('Created admin user:', adminUser)

  // Create projects
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
    },
    {
      title: "Restaurant Management System",
      slug: "restaurant-management",
      description: "Complete restaurant management solution with online ordering, table reservations, and inventory management.",
      excerpt: "Restaurant POS system with online ordering, reservations, and inventory tracking.",
      category: "Hospitality",
      technologies: ["React", "Node.js", "Express", "MongoDB", "Socket.io"],
      featured: false,
      imageUrl: "/images/projects/restaurant.jpg",
      liveUrl: "https://restaurant-demo.com",
      githubUrl: "https://github.com/username/restaurant-system",
      client: "Restaurant Chain",
      duration: "3 months",
      services: ["Web Development", "Mobile App", "POS Integration", "Inventory System"],
      achievements: [
        "Streamlined order processing by 50%",
        "Reduced food waste through inventory tracking",
        "Implemented real-time order updates",
        "Created customer loyalty program"
      ],
      challenges: [
        "Real-time order processing",
        "Inventory management",
        "Multiple location support",
        "Payment integration"
      ],
      solutions: [
        "WebSocket implementation",
        "Automated inventory tracking",
        "Multi-tenant architecture",
        "Secure payment gateway"
      ]
    },
    {
      title: "Learning Management System",
      slug: "learning-management",
      description: "Educational platform with course creation, student enrollment, and progress tracking.",
      excerpt: "Comprehensive LMS with video streaming, quizzes, and certification system.",
      category: "Education",
      technologies: ["Next.js", "React", "Node.js", "PostgreSQL", "AWS"],
      featured: true,
      imageUrl: "/images/projects/lms.jpg",
      liveUrl: "https://lms-demo.com",
      githubUrl: "https://github.com/username/learning-system",
      client: "Education Institute",
      duration: "5 months",
      services: ["Web Development", "Video Streaming", "Assessment System", "Mobile App"],
      achievements: [
        "Served 10,000+ students",
        "Achieved 99.8% uptime",
        "Implemented adaptive learning",
        "Created certification system"
      ],
      challenges: [
        "Video streaming optimization",
        "Scalability requirements",
        "Assessment engine",
        "Certificate generation"
      ],
      solutions: [
        "CDN integration for videos",
        "Cloud architecture design",
        "Dynamic quiz system",
        "Automated certificate generation"
      ]
    },
    {
      title: "Healthcare Portal",
      slug: "healthcare-portal",
      description: "Patient management system with appointment scheduling, medical records, and telemedicine capabilities.",
      excerpt: "Healthcare platform with telemedicine, appointment booking, and patient management.",
      category: "Healthcare",
      technologies: ["React", "Node.js", "Express", "MongoDB", "WebRTC"],
      featured: false,
      imageUrl: "/images/projects/healthcare.jpg",
      liveUrl: "https://healthcare-demo.com",
      client: "Medical Center",
      duration: "4 months",
      services: ["Web Development", "Telemedicine", "HIPAA Compliance", "Mobile App"],
      achievements: [
        "Implemented secure video consultations",
        "Reduced no-show rates by 30%",
        "Digitized patient records",
        "Created appointment reminders"
      ],
      challenges: [
        "HIPAA compliance",
        "Secure video streaming",
        "Medical record security",
        "Appointment scheduling"
      ],
      solutions: [
        "End-to-end encryption",
        "Secure WebRTC implementation",
        "Role-based access control",
        "Automated scheduling system"
      ]
    }
  ]

  for (const projectData of projects) {
    await prisma.project.upsert({
      where: { slug: projectData.slug },
      update: projectData,
      create: projectData,
    })
  }

  console.log('Created projects')

  // Create blog posts
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

## Creating Custom Blocks

\`\`\`javascript
// Example of a custom block registration
wp.blocks.registerBlockType('my-theme/custom-block', {
  title: 'Custom Block',
  icon: 'smiley',
  category: 'common',
  edit: function(props) {
    return (
      <div className={props.className}>
        <p>Hello, Custom Block!</p>
      </div>
    );
  },
  save: function(props) {
    return (
      <div className={props.className}>
        <p>Hello, Custom Block!</p>
      </div>
    );
  },
});
\`\`\`

## Best Practices

1. **Plan Your Block Structure**: Before coding, map out what blocks you'll need
2. **Use Component-Based Architecture**: Keep your blocks modular and reusable
3. **Implement Proper Styling**: Use CSS-in-JS or traditional CSS for consistent styling
4. **Test Thoroughly**: Ensure blocks work across different themes and devices
5. **Document Everything**: Provide clear documentation for content creators

## Conclusion

The WordPress block editor opens up new possibilities for theme development. By embracing this technology, you can create more flexible, user-friendly themes that stand out in the crowded WordPress ecosystem.

Remember that the key to successful block theme development is understanding both the technical aspects and the user experience considerations. Start simple, iterate often, and always keep the end-user in mind.`,
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

### 3. **Streaming and Suspense**
- Progressive rendering
- Improved perceived performance
- Better user experience

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

### Step 3: Convert Components

Update your components to work with Server Components:

\`\`\`typescript
// Before (Client Component)
export default function BlogPost({ post }) {
  return <div>{post.title}</div>
}

// After (Server Component)
export default function BlogPost({ post }) {
  return <div>{post.title}</div>
}
\`\`\`

## Common Pitfalls

1. **Client-Side Only Code**: Move client-side code to \`'use client'\` components
2. **Data Fetching**: Use the new data fetching patterns
3. **Styling**: Update CSS-in-JS libraries for Server Components
4. **Metadata**: Use the new metadata API

## Best Practices

1. **Start Small**: Migrate one route at a time
2. **Test Thoroughly**: Ensure functionality is preserved
3. **Leverage Server Components**: Use them wherever possible
4. **Optimize Data Fetching**: Take advantage of the new patterns

## Conclusion

Migrating to the App Router requires careful planning and execution, but the benefits in performance and developer experience are well worth the effort.

Take your time, test thoroughly, and don't hesitate to consult the official Next.js documentation for specific use cases.`,
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

### 4. **Code Optimization**

Minimize and optimize code:
- Minify CSS/JS files
- Remove unused CSS/JS
- Optimize database queries
- Use HTTP/2

### 5. **Plugin Management**

Manage plugins effectively:
- Remove unused plugins
- Choose lightweight alternatives
- Update regularly
- Monitor plugin performance

## Tools and Plugins

### Caching Plugins
- WP Rocket
- W3 Total Cache
- WP Super Cache

### Image Optimization
- Smush
- ShortPixel
- Imagify

### Performance Monitoring
- Query Monitor
- New Relic
- Google PageSpeed Insights

## Conclusion

WordPress performance optimization is an ongoing process. Stay updated with the latest techniques and tools to ensure your site remains fast and efficient.

Remember that performance optimization should be part of your development workflow, not an afterthought.`,
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

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    })
  }

  console.log('Created blog posts')
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