const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

const uri = "mongodb://root:c4IjIRunf7kZ297RAv4dkh53o75pSE7x3uAH6P4fiu5N7gK1Kq2BY4N80AHU5D1U@37.60.251.163:5777/muhammedaslanweb?authSource=admin";

async function seedEnhanced() {
  const client = new MongoClient(uri);

  try {
    console.log('Starting enhanced MongoDB seeding...');
    await client.connect();
    const db = client.db();

    // Create admin user
    const usersCollection = db.collection('users');
    const hashedPassword = await bcrypt.hash('admin123', 12);

    const existingAdmin = await usersCollection.findOne({ email: 'admin@muhammadaslan.com' });
    if (!existingAdmin) {
      const adminUser = {
        email: 'admin@muhammadaslan.com',
        name: 'Muhammad Aslan',
        password: hashedPassword,
        role: 'ADMIN',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      await usersCollection.insertOne(adminUser);
      console.log('Created admin user:', adminUser.email);
    } else {
      console.log('Admin user already exists:', existingAdmin.email);
    }

    // Enhanced projects collection with 12 projects
    const projectsCollection = db.collection('projects');
    const projects = [
      // Original 3 projects
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
        ],
        createdAt: new Date(),
        updatedAt: new Date()
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
        ],
        createdAt: new Date(),
        updatedAt: new Date()
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
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // New 9 projects
      {
        title: "Task Management SaaS",
        slug: "task-management-saas",
        description: "A comprehensive task management and project collaboration platform with real-time updates and team features.",
        excerpt: "Collaborative task management platform with real-time updates, team workspaces, and advanced analytics.",
        category: "SaaS",
        technologies: ["React", "Node.js", "PostgreSQL", "Socket.io", "Redis"],
        featured: true,
        imageUrl: "/images/projects/task-saas.jpg",
        liveUrl: "https://taskmanager-demo.com",
        githubUrl: "https://github.com/username/task-saas",
        client: "Tech Startup",
        duration: "6 months",
        services: ["SaaS Development", "Real-time Features", "Team Collaboration", "Analytics"],
        achievements: [
          "Reached 10,000+ active users",
          "Implemented real-time collaboration",
          "Achieved sub-100ms response times",
          "Built comprehensive analytics dashboard"
        ],
        challenges: [
          "Real-time synchronization across users",
          "Scalability for thousands of concurrent users",
          "Complex permission system",
          "Data migration from legacy system"
        ],
        solutions: [
          "WebSocket implementation with Socket.io",
          "Microservices architecture",
          "Role-based access control system",
          "Gradual migration strategy"
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Fitness Tracking Mobile App",
        slug: "fitness-tracking-app",
        description: "A comprehensive fitness tracking mobile application with workout plans, nutrition tracking, and social features.",
        excerpt: "Mobile fitness app with personalized workouts, nutrition tracking, and community challenges.",
        category: "Mobile App",
        technologies: ["React Native", "Node.js", "MongoDB", "Firebase", "HealthKit"],
        featured: false,
        imageUrl: "/images/projects/fitness-app.jpg",
        liveUrl: "https://fitness-app-demo.com",
        client: "Health & Wellness Company",
        duration: "5 months",
        services: ["Mobile Development", "Health Integration", "Social Features", "Analytics"],
        achievements: [
          "50,000+ downloads in first month",
          "4.8-star rating on app stores",
          "Integrated with 10+ wearable devices",
          "Built active community of 15,000+ users"
        ],
        challenges: [
          "Cross-platform performance optimization",
          "Health data privacy compliance",
          "Offline functionality requirements",
          "Real-time synchronization challenges"
        ],
        solutions: [
          "Optimized React Native components",
          "HIPAA-compliant data handling",
          "Local storage with sync strategy",
          "Efficient data synchronization algorithms"
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "AI Content Generator Platform",
        slug: "ai-content-generator",
        description: "An AI-powered content generation platform that creates blog posts, social media content, and marketing copy.",
        excerpt: "AI content platform generating blog posts, social media content, and marketing materials automatically.",
        category: "AI & Machine Learning",
        technologies: ["Python", "FastAPI", "React", "TensorFlow", "OpenAI API", "PostgreSQL"],
        featured: true,
        imageUrl: "/images/projects/ai-content.jpg",
        liveUrl: "https://aiwriter-demo.com",
        client: "Marketing Agency",
        duration: "4 months",
        services: ["AI Development", "Content Generation", "API Integration", "Machine Learning"],
        achievements: [
          "Generated 100,000+ pieces of content",
          "Reduced content creation time by 80%",
          "Achieved 95% customer satisfaction",
          "Integrated with 5+ marketing platforms"
        ],
        challenges: [
          "Large language model optimization",
          "Content quality assurance",
          "Scalable API architecture",
          "Real-time content generation"
        ],
        solutions: [
          "Fine-tuned language models",
          "Automated quality scoring system",
          "Microservices with load balancing",
          "Stream processing for real-time generation"
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Educational Learning Platform",
        slug: "educational-platform",
        description: "A comprehensive online learning platform with video courses, quizzes, assignments, and progress tracking.",
        excerpt: "Online learning platform featuring video courses, interactive quizzes, and comprehensive progress tracking.",
        category: "Education",
        technologies: ["Next.js", "Node.js", "PostgreSQL", "AWS S3", "WebRTC"],
        featured: false,
        imageUrl: "/images/projects/education-platform.jpg",
        liveUrl: "https://learnhub-demo.com",
        client: "Education Technology Company",
        duration: "7 months",
        services: ["Platform Development", "Video Streaming", "Assessment System", "Cloud Infrastructure"],
        achievements: [
          "Onboarded 50+ educational institutions",
          "200,000+ student enrollments",
          "99.9% platform uptime",
          "Reduced administrative costs by 40%"
        ],
        challenges: [
          "Video streaming at scale",
          "Real-time collaboration features",
          "Complex assessment system",
          "Multi-tenant architecture"
        ],
        solutions: [
          "Cloud-based video processing",
          "WebRTC for real-time features",
          "Modular assessment engine",
          "Isolated tenant databases"
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Restaurant Delivery App",
        slug: "restaurant-delivery-app",
        description: "A food delivery platform connecting restaurants with customers, featuring real-time order tracking and payment processing.",
        excerpt: "Food delivery platform with real-time order tracking, restaurant management, and customer reviews.",
        category: "Food Tech",
        technologies: ["React Native", "Node.js", "MongoDB", "Google Maps API", "Stripe"],
        featured: true,
        imageUrl: "/images/projects/delivery-app.jpg",
        liveUrl: "https://foodie-delivery-demo.com",
        client: "Restaurant Chain",
        duration: "5 months",
        services: ["Mobile App Development", "Real-time Tracking", "Payment Integration", "Map Integration"],
        achievements: [
          "500+ restaurant partnerships",
          "100,000+ orders processed",
          "4.7-star customer rating",
          "Reduced delivery times by 30%"
        ],
        challenges: [
          "Real-time order tracking",
          "Multi-restaurant inventory management",
          "Payment gateway integration",
          "Route optimization algorithms"
        ],
        solutions: [
          "WebSocket for real-time updates",
          "Centralized inventory system",
          "Multiple payment gateway support",
          "Google Maps optimization API"
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Social Media Analytics Dashboard",
        slug: "social-media-analytics",
        description: "A comprehensive analytics dashboard for tracking social media performance across multiple platforms.",
        excerpt: "Social media analytics platform providing insights, reporting, and performance optimization tools.",
        category: "Analytics",
        technologies: ["Vue.js", "Python", "Django", "PostgreSQL", "Redis", "Chart.js"],
        featured: false,
        imageUrl: "/images/projects/analytics-dashboard.jpg",
        liveUrl: "https://social-analytics-demo.com",
        client: "Marketing Agency",
        duration: "3 months",
        services: ["Dashboard Development", "Data Visualization", "API Integration", "Analytics"],
        achievements: [
          "Integrated 10+ social media platforms",
          "Processed 1M+ data points daily",
          "Improved campaign performance by 45%",
          "Reduced reporting time by 70%"
        ],
        challenges: [
          "Large-scale data processing",
          "Real-time data visualization",
          "Multiple API integrations",
          "Complex reporting requirements"
        ],
        solutions: [
          "Distributed data processing pipeline",
          "Efficient chart rendering optimizations",
          "Robust API integration framework",
          "Flexible reporting engine"
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Blockchain Voting System",
        slug: "blockchain-voting",
        description: "A secure blockchain-based voting system for transparent and verifiable elections.",
        excerpt: "Secure voting platform using blockchain technology for transparent and tamper-proof elections.",
        category: "Blockchain",
        technologies: ["Solidity", "Web3.js", "React", "Node.js", "Ethereum", "IPFS"],
        featured: true,
        imageUrl: "/images/projects/blockchain-voting.jpg",
        liveUrl: "https://secure-vote-demo.com",
        client: "Government Organization",
        duration: "8 months",
        services: ["Blockchain Development", "Smart Contracts", "Security Audit", "Web3 Integration"],
        achievements: [
          "Successfully conducted 3 elections",
          "100,000+ secure votes cast",
          "Zero security incidents",
          "99.9% system reliability"
        ],
        challenges: [
          "Blockchain security implementation",
          "Voter privacy protection",
          "Scalability for large elections",
          "User-friendly blockchain interaction"
        ],
        solutions: [
          "Multi-layer security architecture",
          "Zero-knowledge proof implementation",
          "Layer 2 scaling solution",
          "Intuitive Web3 wallet integration"
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "IoT Home Automation System",
        slug: "iot-home-automation",
        description: "A comprehensive IoT home automation system with smart device integration, voice control, and energy monitoring.",
        excerpt: "Smart home automation platform with IoT device integration, voice commands, and energy optimization.",
        category: "IoT",
        technologies: ["Node.js", "MQTT", "React", "Arduino", "Raspberry Pi", "MongoDB"],
        featured: false,
        imageUrl: "/images/projects/iot-automation.jpg",
        liveUrl: "https://smarthome-demo.com",
        client: "Smart Home Company",
        duration: "4 months",
        services: ["IoT Development", "Hardware Integration", "Mobile App", "Cloud Platform"],
        achievements: [
          "Integrated 50+ smart devices",
          "Reduced energy consumption by 30%",
          "Achieved 99% system reliability",
          "Built intuitive mobile control app"
        ],
        challenges: [
          "Device compatibility across brands",
          "Real-time communication protocols",
          "Network security implementation",
          "Scalable cloud infrastructure"
        ],
        solutions: [
          "Universal device adapter system",
          "MQTT protocol implementation",
          "End-to-end encryption",
          "Microservices cloud architecture"
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Video Streaming Platform",
        slug: "video-streaming-platform",
        description: "A scalable video streaming platform with live broadcasting, video-on-demand, and social features.",
        excerpt: "Video streaming platform supporting live broadcasts, VOD content, and interactive social features.",
        category: "Streaming",
        technologies: ["React", "Node.js", "WebRTC", "FFmpeg", "AWS CloudFront", "Redis"],
        featured: true,
        imageUrl: "/images/projects/video-streaming.jpg",
        liveUrl: "https://streamhub-demo.com",
        client: "Media Company",
        duration: "6 months",
        services: ["Streaming Platform", "Live Broadcasting", "Video Processing", "Social Features"],
        achievements: [
          "1M+ concurrent streams supported",
          "99.95% uptime during peak events",
          "Reduced latency to under 2 seconds",
          "Built engaged community of 500K+ users"
        ],
        challenges: [
          "Scalable video processing pipeline",
          "Low-latency streaming requirements",
          "Content delivery optimization",
          "Real-time interaction features"
        ],
        solutions: [
          "Distributed transcoding system",
          "Edge computing with CDN integration",
          "Adaptive bitrate streaming",
          "WebSocket for real-time interactions"
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    let projectCount = 0;
    for (const projectData of projects) {
      const existingProject = await projectsCollection.findOne({ slug: projectData.slug });
      if (!existingProject) {
        await projectsCollection.insertOne(projectData);
        projectCount++;
        console.log(`Created project: ${projectData.slug}`);
      } else {
        console.log(`Project already exists: ${projectData.slug}`);
      }
    }
    console.log(`Created ${projectCount} new project(s)`);

    // Enhanced blog posts collection with 12 posts
    const blogCollection = db.collection('blogPosts');
    const blogPosts = [
      // Original 3 blog posts
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
        seoDescription: "Learn how to create custom WordPress themes that leverage the full power of the Gutenberg block editor for maximum flexibility.",
        publishedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
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
        seoDescription: "Everything you need to know about migrating to Next.js 14's App Router, including best practices and common pitfalls.",
        publishedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
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
        seoDescription: "Proven strategies to make your WordPress site lightning fast with modern optimization techniques and tools.",
        publishedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // New 9 blog posts
      {
        title: "Mastering React Hooks: Advanced Patterns and Best Practices",
        slug: "react-hooks-advanced-patterns",
        excerpt: "Deep dive into advanced React Hooks patterns, custom hooks, and performance optimization techniques.",
        content: `# Mastering React Hooks: Advanced Patterns and Best Practices

React Hooks have revolutionized how we write React components. In this comprehensive guide, we'll explore advanced patterns and best practices that will take your React skills to the next level.

## Custom Hooks Architecture

Creating reusable custom hooks is one of the most powerful patterns in React:

\`\`\`javascript
// Example: useLocalStorage hook
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      return initialValue
    }
  })

  const setValue = (value) => {
    try {
      setStoredValue(value)
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.log(error)
    }
  }

  return [storedValue, setValue]
}
\`\`\`

## Performance Optimization

### Memoization Strategies
- Use useMemo for expensive calculations
- Implement useCallback for function references
- Consider React.memo for component optimization

### State Management Patterns
- Lift state up when necessary
- Use context for global state
- Implement proper dependency arrays

## Conclusion

Mastering React Hooks requires understanding both the API and the underlying principles. Focus on writing clean, reusable, and performant code.`,
        category: "React & Next.js",
        tags: ["React", "Hooks", "JavaScript", "Performance", "Best Practices"],
        featured: true,
        author: "Muhammad Aslan",
        authorBio: "React specialist with 5+ years of experience building scalable applications.",
        readingTime: "15 min read",
        coverImage: "/images/blog/react-hooks.jpg",
        seoTitle: "Mastering React Hooks: Advanced Patterns and Best Practices | Muhammad Aslan",
        seoDescription: "Deep dive into advanced React Hooks patterns, custom hooks, and performance optimization techniques.",
        publishedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Building Scalable APIs with Node.js and Express",
        slug: "scalable-nodejs-apis",
        excerpt: "Learn how to build production-ready, scalable APIs using Node.js, Express, and modern architecture patterns.",
        content: `# Building Scalable APIs with Node.js and Express

Creating APIs that can handle growth requires careful planning and the right architectural patterns. This guide covers everything you need to build scalable Node.js applications.

## Architecture Patterns

### Microservices vs Monolith
Understanding when to use each approach:
- Microservices for large, complex applications
- Monolith for smaller teams and simpler applications
- Consider hybrid approaches

### Layered Architecture
Implement proper separation of concerns:
- Controllers for request handling
- Services for business logic
- Repositories for data access
- Models for data structures

## Performance Optimization

### Database Optimization
- Implement proper indexing strategies
- Use connection pooling
- Consider read replicas for high traffic
- Implement caching layers

### Code Optimization
- Use async/await properly
- Implement streaming for large data
- Optimize memory usage
- Profile and identify bottlenecks

## Security Best Practices

- Implement proper authentication and authorization
- Validate and sanitize all inputs
- Use HTTPS everywhere
- Implement rate limiting
- Keep dependencies updated

## Conclusion

Building scalable APIs is about making smart architectural decisions early and optimizing continuously based on real-world usage patterns.`,
        category: "Backend Development",
        tags: ["Node.js", "Express", "API", "Architecture", "Performance"],
        featured: false,
        author: "Muhammad Aslan",
        authorBio: "Backend developer specializing in Node.js and cloud architecture.",
        readingTime: "12 min read",
        coverImage: "/images/blog/nodejs-apis.jpg",
        seoTitle: "Building Scalable APIs with Node.js and Express | Muhammad Aslan",
        seoDescription: "Learn how to build production-ready, scalable APIs using Node.js, Express, and modern architecture patterns.",
        publishedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "The Ultimate Guide to CSS Grid and Flexbox",
        slug: "css-grid-flexbox-guide",
        excerpt: "Complete guide to modern CSS layout with Grid and Flexbox, including when to use each and how they work together.",
        content: `# The Ultimate Guide to CSS Grid and Flexbox

Modern CSS provides two powerful layout systems: Grid and Flexbox. Understanding when and how to use each is crucial for building responsive, maintainable layouts.

## CSS Grid: Two-Dimensional Layouts

Grid excels at creating complex, two-dimensional layouts:

\`\`\`css
.grid-container {
  display: grid;
  grid-template-columns: 250px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  gap: 1rem;
  min-height: 100vh;
}

.grid-header { grid-area: 1 / 1 / 2 / 4; }
.grid-sidebar { grid-area: 2 / 1 / 3 / 2; }
.grid-main { grid-area: 2 / 2 / 3 / 3; }
.grid-ads { grid-area: 2 / 3 / 3 / 4; }
.grid-footer { grid-area: 3 / 1 / 4 / 4; }
\`\`\`

## Flexbox: One-Dimensional Layouts

Flexbox is perfect for component-level layouts:

\`\`\`css
.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.flex-item {
  flex: 1;
}
\`\`\`

## When to Use Each

### Use Grid When:
- Creating overall page layouts
- Working with two-dimensional grids
- Need precise control over both rows and columns

### Use Flexbox When:
- Aligning items in a single dimension
- Building component layouts
- Need content distribution

## Combining Both

The most powerful approach is using them together:

\`\`\`css
.grid-card {
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: 1rem;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
\`\`\`

## Conclusion

Mastering both Grid and Flexbox gives you complete control over modern layouts. They're not competitors – they're complementary tools in your CSS toolkit.`,
        category: "Web Development",
        tags: ["CSS", "Grid", "Flexbox", "Layout", "Frontend"],
        featured: true,
        author: "Muhammad Aslan",
        authorBio: "Frontend developer passionate about modern CSS and responsive design.",
        readingTime: "10 min read",
        coverImage: "/images/blog/css-grid-flexbox.jpg",
        seoTitle: "The Ultimate Guide to CSS Grid and Flexbox | Muhammad Aslan",
        seoDescription: "Complete guide to modern CSS layout with Grid and Flexbox, including when to use each and how they work together.",
        publishedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Database Design Patterns for Modern Applications",
        slug: "database-design-patterns",
        excerpt: "Explore essential database design patterns, normalization techniques, and best practices for scalable applications.",
        content: `# Database Design Patterns for Modern Applications

Effective database design is crucial for application performance, scalability, and maintainability. This guide covers essential patterns and best practices.

## Normalization vs Denormalization

### Normalization Benefits
- Reduced data redundancy
- Improved data integrity
- Easier maintenance
- Consistent data

### When to Denormalize
- Read-heavy workloads
- Performance-critical queries
- Reporting and analytics
- Caching strategies

## Common Design Patterns

### 1. Single Table Inheritance
Use when you have related entities with shared fields:

\`\`\`sql
CREATE TABLE users (
  id INT PRIMARY KEY,
  type ENUM('admin', 'customer', 'vendor'),
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  -- Common fields
  phone VARCHAR(20),
  created_at TIMESTAMP,

  -- Type-specific fields stored in JSON
  metadata JSON
);
\`\`\`

### 2. Many-to-Many Relationships
Implement with junction tables:

\`\`\`sql
CREATE TABLE users (id INT PRIMARY KEY, name VARCHAR(100));
CREATE TABLE roles (id INT PRIMARY KEY, name VARCHAR(100));
CREATE TABLE user_roles (
  user_id INT,
  role_id INT,
  granted_at TIMESTAMP,
  PRIMARY KEY (user_id, role_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (role_id) REFERENCES roles(id)
);
\`\`\`

### 3. Event Sourcing Pattern
Store all changes as events:

\`\`\`sql
CREATE TABLE events (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  aggregate_id VARCHAR(50) NOT NULL,
  event_type VARCHAR(100) NOT NULL,
  event_data JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_aggregate (aggregate_id),
  INDEX idx_created (created_at)
);
\`\`\`

## Performance Optimization

### Indexing Strategy
- Create indexes on frequently queried columns
- Use composite indexes for multi-column queries
- Monitor index usage with EXPLAIN
- Consider covering indexes for read-heavy queries

### Query Optimization
- Use appropriate JOIN types
- Avoid SELECT * in production
- Implement query result caching
- Use database-specific optimizations

## NoSQL Considerations

When using NoSQL databases:
- Design for your access patterns
- Understand consistency models
- Implement proper data modeling
- Consider sharding strategies early

## Conclusion

Good database design is about finding the right balance between normalization, performance, and maintainability. Always consider your specific use case and requirements.`,
        category: "Database",
        tags: ["Database", "SQL", "Design Patterns", "Performance", "Architecture"],
        featured: false,
        author: "Muhammad Aslan",
        authorBio: "Database architect with experience in both SQL and NoSQL systems.",
        readingTime: "14 min read",
        coverImage: "/images/blog/database-design.jpg",
        seoTitle: "Database Design Patterns for Modern Applications | Muhammad Aslan",
        seoDescription: "Explore essential database design patterns, normalization techniques, and best practices for scalable applications.",
        publishedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Implementing CI/CD Pipelines for Modern Web Applications",
        slug: "cicd-pipelines-web-applications",
        excerpt: "Complete guide to setting up continuous integration and deployment pipelines for modern web applications.",
        content: `# Implementing CI/CD Pipelines for Modern Web Applications

Continuous Integration and Continuous Deployment (CI/CD) are essential practices for modern software development. This guide covers setting up robust pipelines for web applications.

## CI/CD Fundamentals

### Continuous Integration
- Automated code testing
- Code quality checks
- Integration testing
- Automated builds

### Continuous Deployment
- Automated deployments
- Environment management
- Rollback strategies
- Monitoring and alerting

## Pipeline Architecture

### Stage 1: Code Quality
\`\`\`yaml
# GitHub Actions example
name: Code Quality
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test
      - name: Run linting
        run: npm run lint
      - name: Type checking
        run: npm run type-check
\`\`\`

### Stage 2: Build and Package
\`\`\`yaml
name: Build
on:
  workflow_run:
    workflows: ["Code Quality"]
    types:
      - completed

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Build application
        run: npm run build
      - name: Build Docker image
        run: docker build -t myapp:${GITHUB_SHA} .
      - name: Push to registry
        run: docker push myapp:${GITHUB_SHA}
\`\`\`

### Stage 3: Deployment
\`\`\`yaml
name: Deploy
on:
  workflow_run:
    workflows: ["Build"]
    types:
      - completed

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: production
    steps:
      - name: Deploy to production
        run: |
          kubectl set image deployment/myapp \
            myapp=myapp:${GITHUB_SHA}
      - name: Health check
        run: curl -f https://myapp.com/health
\`\`\`

## Best Practices

### Security
- Never commit secrets to version control
- Use environment-specific configurations
- Implement proper access controls
- Scan for vulnerabilities

### Monitoring
- Track deployment success rates
- Monitor application performance
- Set up alerting for failures
- Log deployment events

### Testing Strategy
- Unit tests for individual components
- Integration tests for API endpoints
- End-to-end tests for user flows
- Performance tests for load testing

## Tools and Platforms

### CI/CD Platforms
- GitHub Actions
- GitLab CI/CD
- Jenkins
- CircleCI
- Travis CI

### Container Orchestration
- Kubernetes
- Docker Swarm
- AWS ECS
- Google Cloud Run

## Conclusion

A well-designed CI/CD pipeline improves code quality, reduces deployment risks, and enables faster delivery of features. Start simple and gradually add complexity as needed.`,
        category: "DevOps",
        tags: ["CI/CD", "DevOps", "GitHub Actions", "Docker", "Kubernetes"],
        featured: true,
        author: "Muhammad Aslan",
        authorBio: "DevOps engineer specializing in automation and cloud infrastructure.",
        readingTime: "11 min read",
        coverImage: "/images/blog/cicd-pipelines.jpg",
        seoTitle: "Implementing CI/CD Pipelines for Modern Web Applications | Muhammad Aslan",
        seoDescription: "Complete guide to setting up continuous integration and deployment pipelines for modern web applications.",
        publishedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Web Security Best Practices: Protecting Your Applications",
        slug: "web-security-best-practices",
        excerpt: "Essential security practices every web developer should know to protect applications from common vulnerabilities.",
        content: `# Web Security Best Practices: Protecting Your Applications

Security should be a fundamental consideration in web development, not an afterthought. This guide covers essential practices to protect your applications.

## Common Vulnerabilities and Mitigations

### 1. SQL Injection
**Problem**: Malicious SQL code injected through input fields
**Solution**: Use parameterized queries and ORMs

\`\`\`javascript
// Bad: Vulnerable to SQL injection
const query = \`SELECT * FROM users WHERE email = '${email}'\`;

// Good: Using parameterized queries
const query = 'SELECT * FROM users WHERE email = ?';
db.query(query, [email]);
\`\`\`

### 2. Cross-Site Scripting (XSS)
**Problem**: Malicious scripts injected into web pages
**Solution**: Sanitize and escape user input

\`\`\`javascript
// Bad: Directly rendering user input
div.innerHTML = userComment;

// Good: Sanitizing input
div.textContent = userComment;
// or using a sanitization library
div.innerHTML = DOMPurify.sanitize(userComment);
\`\`\`

### 3. Authentication and Authorization
**Problem**: Weak authentication mechanisms
**Solution**: Implement proper auth systems

\`\`\`javascript
// Use strong password hashing
const bcrypt = require('bcrypt');
const hashedPassword = await bcrypt.hash(password, 12);

// Implement session management
const session = require('express-session');
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));
\`\`\`

## Security Headers

### Essential Headers
\`\`\`javascript
// Express.js example
const helmet = require('helmet');
app.use(helmet());

// Custom headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  next();
});
\`\`\`

## Data Protection

### Encryption
- Use HTTPS everywhere
- Encrypt sensitive data at rest
- Implement proper key management
- Use strong encryption algorithms

### Data Validation
\`\`\`javascript
// Input validation example
const Joi = require('joi');

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])')).required(),
  age: Joi.number().integer().min(18).max(120)
});

const { error } = userSchema.validate(req.body);
if (error) {
  return res.status(400).json({ error: error.details[0].message });
}
\`\`\`

## API Security

### Rate Limiting
\`\`\`javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP'
});

app.use('/api/', limiter);
\`\`\`

### CORS Configuration
\`\`\`javascript
const cors = require('cors');

app.use(cors({
  origin: ['https://yourdomain.com'],
  credentials: true,
  optionsSuccessStatus: 200
}));
\`\`\`

## Monitoring and Logging

### Security Monitoring
- Log authentication attempts
- Monitor for unusual activity
- Set up security alerts
- Regular security audits

### Best Practices
- Keep dependencies updated
- Use security scanning tools
- Implement proper error handling
- Regular security training

## Conclusion

Security is an ongoing process, not a one-time implementation. Stay informed about new vulnerabilities and continuously improve your security practices.`,
        category: "Security",
        tags: ["Security", "Web Development", "Authentication", "HTTPS", "Best Practices"],
        featured: false,
        author: "Muhammad Aslan",
        authorBio: "Security engineer passionate about building secure web applications.",
        readingTime: "13 min read",
        coverImage: "/images/blog/web-security.jpg",
        seoTitle: "Web Security Best Practices: Protecting Your Applications | Muhammad Aslan",
        seoDescription: "Essential security practices every web developer should know to protect applications from common vulnerabilities.",
        publishedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Mobile-First Responsive Design: A Complete Guide",
        slug: "mobile-first-responsive-design",
        excerpt: "Master mobile-first responsive design principles, techniques, and best practices for modern web development.",
        content: `# Mobile-First Responsive Design: A Complete Guide

Mobile-first design is no longer optional – it's essential. With over 50% of web traffic coming from mobile devices, designing for mobile first ensures better user experiences and improved performance.

## Why Mobile-First?

### Performance Benefits
- Faster loading times on mobile devices
- Better performance scores
- Improved user experience
- Higher conversion rates

### SEO Advantages
- Google's mobile-first indexing
- Better search rankings
- Improved crawl efficiency
- Enhanced user experience signals

## Core Principles

### 1. Start with Mobile
Design your mobile layout first, then progressively enhance for larger screens:

\`\`\`css
/* Mobile-first approach */
.container {
  width: 100%;
  padding: 1rem;
}

.card {
  width: 100%;
  margin-bottom: 1rem;
}

/* Tablet styles */
@media (min-width: 768px) {
  .container {
    max-width: 750px;
    margin: 0 auto;
  }

  .card {
    width: calc(50% - 1rem);
    display: inline-block;
    vertical-align: top;
  }
}

/* Desktop styles */
@media (min-width: 1024px) {
  .container {
    max-width: 1200px;
  }

  .card {
    width: calc(33.333% - 1rem);
  }
}
\`\`\`

### 2. Flexible Typography
Use relative units for scalable text:

\`\`\`css
html {
  font-size: 16px; /* Base font size */
}

h1 {
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  line-height: 1.2;
}

p {
  font-size: clamp(0.875rem, 2vw, 1rem);
  line-height: 1.6;
}
\`\`\`

### 3. Responsive Images
Optimize images for different screen sizes:

\`\`\`html
<picture>
  <source media="(max-width: 768px)" srcset="image-small.jpg">
  <source media="(max-width: 1024px)" srcset="image-medium.jpg">
  <img src="image-large.jpg" alt="Responsive image" loading="lazy">
</picture>
\`\`\`

## Layout Techniques

### CSS Grid for Complex Layouts
\`\`\`css
.grid-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 768px) {
  .grid-layout {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .grid-layout {
    grid-template-columns: repeat(3, 1fr);
  }
}
\`\`\`

### Flexbox for Component Layouts
\`\`\`css
.flex-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (min-width: 768px) {
  .flex-container {
    flex-direction: row;
    align-items: center;
  }
}
\`\`\`

## Performance Optimization

### Critical CSS
Inline critical CSS for above-the-fold content:

\`\`\`html
<style>
  /* Critical CSS for mobile first view */
  .hero { min-height: 100vh; }
  .title { font-size: 2rem; }
</style>
\`\`\`

### Lazy Loading
Implement lazy loading for images and components:

\`\`\`html
<img src="placeholder.jpg" data-src="actual-image.jpg"
     alt="Lazy loaded image" class="lazy" loading="lazy">
\`\`\`

### Resource Optimization
- Minify CSS and JavaScript
- Optimize images (WebP format)
- Use CDNs for static assets
- Implement proper caching strategies

## Testing and Tools

### Testing Tools
- Chrome DevTools Device Mode
- Responsive Design Checker
- BrowserStack for cross-browser testing
- Lighthouse for performance testing

### Design Tools
- Figma's responsive design features
- Adobe XD's responsive resize
- Sketch's responsive design tools

## Best Practices

### Navigation
- Use hamburger menus for mobile
- Implement thumb-friendly touch targets (minimum 44px)
- Consider bottom navigation for mobile apps
- Ensure dropdowns work well on touch devices

### Forms
- Use larger input fields on mobile
- Implement proper input types
- Consider auto-complete features
- Optimize for thumb reach zones

### Content Strategy
- Prioritize important content
- Use concise copy for mobile
- Implement progressive disclosure
- Consider content adaptation for different devices

## Conclusion

Mobile-first design is about creating experiences that work great on any device. Start with mobile, test thoroughly, and progressively enhance for larger screens. Your users will thank you with better engagement and conversion rates.`,
        category: "Web Development",
        tags: ["Responsive Design", "Mobile-First", "CSS", "UX", "Performance"],
        featured: true,
        author: "Muhammad Aslan",
        authorBio: "Frontend developer specializing in responsive design and user experience.",
        readingTime: "12 min read",
        coverImage: "/images/blog/mobile-first-design.jpg",
        seoTitle: "Mobile-First Responsive Design: A Complete Guide | Muhammad Aslan",
        seoDescription: "Master mobile-first responsive design principles, techniques, and best practices for modern web development.",
        publishedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "JavaScript Performance Optimization Techniques",
        slug: "javascript-performance-optimization",
        excerpt: "Advanced JavaScript performance optimization techniques to make your web applications lightning fast.",
        content: `# JavaScript Performance Optimization Techniques

Performance is crucial for user experience and business success. This guide covers advanced techniques to optimize JavaScript performance in modern web applications.

## Performance Measurement

### Browser DevTools
Use the Performance tab to identify bottlenecks:
- Main thread activity
- Script evaluation time
- Layout and paint operations
- Network requests

### Key Metrics
- First Contentful Paint (FCP)
- Time to Interactive (TTI)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)

## Optimization Techniques

### 1. Code Splitting
Implement dynamic imports to reduce initial bundle size:

\`\`\`javascript
// Instead of importing everything upfront
import { heavyModule } from './heavyModule';

// Use dynamic imports
const loadHeavyModule = async () => {
  const { heavyModule } = await import('./heavyModule');
  return heavyModule;
};

// Load on demand
button.addEventListener('click', async () => {
  const module = await loadHeavyModule();
  module.doSomething();
});
\`\`\`

### 2. Lazy Loading Components
React example with lazy loading:

\`\`\`javascript
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <HeavyComponent />
      </Suspense>
    </div>
  );
}
\`\`\`

### 3. Debouncing and Throttling
Optimize event handlers:

\`\`\`javascript
// Debounce search input
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const searchInput = document.getElementById('search');
const debouncedSearch = debounce((query) => {
  // Perform search
  performSearch(query);
}, 300);

searchInput.addEventListener('input', (e) => {
  debouncedSearch(e.target.value);
});

// Throttle scroll events
const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

window.addEventListener('scroll', throttle(() => {
  // Handle scroll
  handleScroll();
}, 100));
\`\`\`

### 4. Efficient DOM Manipulation
Minimize DOM reflows and repaints:

\`\`\`javascript
// Bad: Multiple DOM updates
items.forEach(item => {
  document.body.appendChild(createElement(item));
});

// Good: Batch DOM updates
const fragment = document.createDocumentFragment();
items.forEach(item => {
  fragment.appendChild(createElement(item));
});
document.body.appendChild(fragment);

// Use CSS transforms instead of changing layout properties
element.style.transform = 'translateX(100px)'; // Better
element.style.left = '100px'; // Triggers layout
\`\`\`

### 5. Memory Management
Prevent memory leaks:

\`\`\`javascript
// Clean up event listeners
class Component {
  constructor() {
    this.handleClick = this.handleClick.bind(this);
    this.button.addEventListener('click', this.handleClick);
  }

  destroy() {
    this.button.removeEventListener('click', this.handleClick);
  }
}

// Clear intervals and timeouts
const intervalId = setInterval(() => {
  // Do something
}, 1000);

// Clean up
clearInterval(intervalId);

// WeakMap for object associations
const weakMap = new WeakMap();
weakMap.set(element, data);
// Data is automatically garbage collected when element is removed
\`\`\`

## Advanced Techniques

### Web Workers
Offload heavy computations to background threads:

\`\`\`javascript
// main.js
const worker = new Worker('worker.js');

worker.postMessage({ type: 'CALCULATE', data: largeDataSet });

worker.onmessage = (e) => {
  const result = e.data;
  updateUI(result);
};

// worker.js
self.onmessage = (e) => {
  if (e.data.type === 'CALCULATE') {
    const result = heavyCalculation(e.data.data);
    self.postMessage(result);
  }
};
\`\`\`

### Intersection Observer
Optimize lazy loading with Intersection Observer:

\`\`\`javascript
const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
      observer.unobserve(img);
    }
  });
}, {
  rootMargin: '50px 0px',
  threshold: 0.01
});

images.forEach(img => imageObserver.observe(img));
\`\`\`

### Virtual Scrolling
Handle large lists efficiently:

\`\`\`javascript
class VirtualList {
  constructor(container, items, itemHeight, renderItem) {
    this.container = container;
    this.items = items;
    this.itemHeight = itemHeight;
    this.renderItem = renderItem;
    this.visibleStart = 0;
    this.visibleEnd = 0;

    this.init();
  }

  init() {
    this.container.style.height = `${this.items.length * this.itemHeight}px`;
    this.container.addEventListener('scroll', this.handleScroll.bind(this));
    this.updateVisibleItems();
  }

  updateVisibleItems() {
    const scrollTop = this.container.scrollTop;
    const containerHeight = this.container.clientHeight;

    this.visibleStart = Math.floor(scrollTop / this.itemHeight);
    this.visibleEnd = Math.ceil((scrollTop + containerHeight) / this.itemHeight);

    this.render();
  }

  render() {
    const fragment = document.createDocumentFragment();

    for (let i = this.visibleStart; i <= this.visibleEnd; i++) {
      const item = this.items[i];
      const element = this.renderItem(item, i);
      element.style.position = 'absolute';
      element.style.top = `${i * this.itemHeight}px`;
      element.style.width = '100%';
      fragment.appendChild(element);
    }

    this.container.innerHTML = '';
    this.container.appendChild(fragment);
  }

  handleScroll() {
    this.updateVisibleItems();
  }
}
\`\`\`

## Monitoring and Profiling

### Performance API
Use built-in performance APIs:

\`\`\`javascript
// Measure specific operations
performance.mark('start-operation');
// ... perform operation
performance.mark('end-operation');
performance.measure('operation', 'start-operation', 'end-operation');

// Navigation timing
const navigation = performance.getEntriesByType('navigation')[0];
console.log('Page load time:', navigation.loadEventEnd - navigation.fetchStart);

// Resource timing
const resources = performance.getEntriesByType('resource');
resources.forEach(resource => {
  console.log(\`\${resource.name}: \${resource.duration}ms\`);
});
\`\`\`

## Best Practices

1. **Minimize JavaScript Bundle Size**
   - Tree shaking
   - Code splitting
   - Remove unused code

2. **Optimize Network Requests**
   - Reduce HTTP requests
   - Use HTTP/2
   - Implement caching

3. **Use Modern JavaScript Features Wisely**
   - Async/await instead of callbacks
   - Proper error handling
   - Efficient algorithms

4. **Test Performance Regularly**
   - Use Lighthouse audits
   - Monitor real user metrics
   - Test on various devices

## Conclusion

JavaScript performance optimization is an ongoing process. Focus on measuring first, then optimize based on real data. Small improvements can have significant impacts on user experience.`,
        category: "JavaScript",
        tags: ["JavaScript", "Performance", "Optimization", "Web Development", "Best Practices"],
        featured: false,
        author: "Muhammad Aslan",
        authorBio: "JavaScript performance specialist with expertise in web optimization.",
        readingTime: "16 min read",
        coverImage: "/images/blog/javascript-performance.jpg",
        seoTitle: "JavaScript Performance Optimization Techniques | Muhammad Aslan",
        seoDescription: "Advanced JavaScript performance optimization techniques to make your web applications lightning fast.",
        publishedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    let postCount = 0;
    for (const post of blogPosts) {
      const existingPost = await blogCollection.findOne({ slug: post.slug });
      if (!existingPost) {
        await blogCollection.insertOne(post);
        postCount++;
        console.log(`Created blog post: ${post.slug}`);
      } else {
        console.log(`Blog post already exists: ${post.slug}`);
      }
    }
    console.log(`Created ${postCount} new blog post(s)`);

    console.log('Enhanced MongoDB seeding completed successfully!');
    console.log(`Total projects in database: ${await projectsCollection.countDocuments()}`);
    console.log(`Total blog posts in database: ${await blogCollection.countDocuments()}`);
  } catch (error) {
    console.error('Error during enhanced seeding:', error);
  } finally {
    await client.close();
  }
}

seedEnhanced();