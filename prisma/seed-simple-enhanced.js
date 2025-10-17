const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

const uri = "mongodb://root:c4IjIRunf7kZ297RAv4dkh53o75pSE7x3uAH6P4fiu5N7gK1Kq2BY4N80AHU5D1U@37.60.251.163:5777/muhammedaslanweb?authSource=admin";

async function seedSimpleEnhanced() {
  const client = new MongoClient(uri);

  try {
    console.log('Starting simple enhanced MongoDB seeding...');
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
      {
        title: "Building Modern WordPress Themes with Block Editor",
        slug: "modern-wordpress-themes-block-editor",
        excerpt: "Learn how to create custom WordPress themes that leverage the full power of the Gutenberg block editor for maximum flexibility.",
        content: "WordPress has evolved significantly with the introduction of the Gutenberg block editor. This powerful tool has transformed how we create and manage content, offering unprecedented flexibility for both developers and content creators. The block editor represents a fundamental shift in how content is created and managed, using a block-based approach where each piece of content is a separate block.",
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
        content: "Next.js 14 introduced significant improvements to the App Router, making it more powerful and flexible than ever before. The App Router is a new routing paradigm that leverages React Server Components and provides a more intuitive way to build layouts, loading states, and error boundaries. This guide will help you migrate your existing Next.js applications to take advantage of these new features.",
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
        content: "WordPress performance optimization has evolved significantly over the years. In this guide, we'll explore the latest techniques and tools to make your WordPress site lightning fast. User Experience, SEO, Conversions, and Mobile performance are all crucial factors that depend on site speed.",
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
      {
        title: "Mastering React Hooks: Advanced Patterns and Best Practices",
        slug: "react-hooks-advanced-patterns",
        excerpt: "Deep dive into advanced React Hooks patterns, custom hooks, and performance optimization techniques.",
        content: "React Hooks have revolutionized how we write React components. In this comprehensive guide, we'll explore advanced patterns and best practices that will take your React skills to the next level. Custom hooks are one of the most powerful patterns in React, allowing you to extract component logic into reusable functions.",
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
        content: "Creating APIs that can handle growth requires careful planning and the right architectural patterns. This guide covers everything you need to build scalable Node.js applications. Understanding when to use microservices vs monolith, implementing proper layered architecture, and optimizing database performance are all crucial for success.",
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
        content: "Modern CSS provides two powerful layout systems: Grid and Flexbox. Understanding when and how to use each is crucial for building responsive, maintainable layouts. Grid excels at creating complex, two-dimensional layouts, while Flexbox is perfect for component-level layouts and one-dimensional layouts.",
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
        content: "Effective database design is crucial for application performance, scalability, and maintainability. This guide covers essential patterns and best practices including normalization vs denormalization, common design patterns like Single Table Inheritance and Many-to-Many Relationships, and performance optimization techniques.",
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
        content: "Continuous Integration and Continuous Deployment (CI/CD) are essential practices for modern software development. This guide covers setting up robust pipelines for web applications, including code quality checks, automated builds, and deployment strategies. Security considerations and monitoring are also crucial for successful CI/CD implementation.",
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
        content: "Security should be a fundamental consideration in web development, not an afterthought. This guide covers essential practices to protect your applications from common vulnerabilities like SQL Injection, Cross-Site Scripting (XSS), and authentication issues. Proper security headers, data protection, and API security are all covered.",
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
        content: "Mobile-first design is no longer optional - it's essential. With over 50% of web traffic coming from mobile devices, designing for mobile first ensures better user experiences and improved performance. This guide covers core principles, flexible typography, responsive images, and performance optimization techniques.",
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
        content: "Performance is crucial for user experience and business success. This guide covers advanced techniques to optimize JavaScript performance in modern web applications, including code splitting, lazy loading components, debouncing and throttling, efficient DOM manipulation, memory management, Web Workers, and virtual scrolling.",
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

    console.log('Simple enhanced MongoDB seeding completed successfully!');
    console.log(`Total projects in database: ${await projectsCollection.countDocuments()}`);
    console.log(`Total blog posts in database: ${await blogCollection.countDocuments()}`);
  } catch (error) {
    console.error('Error during simple enhanced seeding:', error);
  } finally {
    await client.close();
  }
}

seedSimpleEnhanced();