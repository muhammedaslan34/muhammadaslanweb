#!/usr/bin/env node

/**
 * Sample Projects Setup Script
 *
 * This script adds sample projects to your database for testing the dashboard.
 * Run this script after setting up your MongoDB connection and admin user.
 */

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function addSampleProjects() {
  try {
    console.log('🔍 Checking for existing projects...');

    const existingProjects = await prisma.project.count();
    if (existingProjects > 0) {
      console.log(`✅ Found ${existingProjects} existing projects. Skipping sample creation.`);
      return;
    }

    console.log('🔧 Creating sample projects...');

    const sampleProjects = [
      {
        title: "E-Commerce Platform",
        slug: "ecommerce-platform",
        description: "A modern e-commerce platform built with Next.js and React, featuring user authentication, payment processing, and inventory management.",
        excerpt: "Full-stack e-commerce solution with modern UI and seamless checkout experience.",
        category: "E-Commerce",
        technologies: ["Next.js", "React", "Node.js", "MongoDB", "Stripe", "Tailwind CSS"],
        featured: true,
        imageUrl: "/images/projects/ecommerce.jpg",
        liveUrl: "https://example-ecommerce.com",
        githubUrl: "https://github.com/username/ecommerce-platform",
        client: "Fashion Retailer",
        duration: "3 months",
        services: ["Web Development", "UI/UX Design", "Payment Integration", "Database Design"],
        achievements: [
          "Increased conversion rate by 25%",
          "Implemented real-time inventory tracking",
          "Created responsive mobile experience",
          "Integrated multiple payment gateways"
        ],
        challenges: [
          "Complex inventory management",
          "Real-time stock updates",
          "Payment security compliance",
          "Performance optimization"
        ],
        solutions: [
          "Implemented efficient caching strategy",
          "Used WebSockets for real-time updates",
          "Integrated PCI-compliant payment processing",
          "Optimized images and lazy loading"
        ]
      },
      {
        title: "Task Management App",
        slug: "task-management-app",
        description: "A collaborative task management application with real-time updates, team collaboration features, and project tracking.",
        excerpt: "Team collaboration platform for managing tasks and projects efficiently.",
        category: "Productivity",
        technologies: ["React", "Node.js", "Express", "Socket.io", "PostgreSQL", "TypeScript"],
        featured: false,
        imageUrl: "/images/projects/taskmanager.jpg",
        liveUrl: "https://example-tasks.com",
        githubUrl: "https://github.com/username/task-manager",
        client: "Tech Startup",
        duration: "2 months",
        services: ["Web Development", "Real-time Features", "Database Design", "API Development"],
        achievements: [
          "Real-time collaboration features",
          "Improved team productivity by 40%",
          "Scalable architecture for 1000+ users",
          "Mobile-responsive design"
        ],
        challenges: [
          "Real-time data synchronization",
          "Handling concurrent users",
          "Scalability requirements",
          "Cross-browser compatibility"
        ],
        solutions: [
          "Implemented Socket.io for real-time updates",
          "Used Redis for session management",
          "Designed microservices architecture",
          "Thorough cross-browser testing"
        ]
      },
      {
        title: "Portfolio Website",
        slug: "portfolio-website",
        description: "A modern portfolio website with content management system, blog functionality, and contact forms.",
        excerpt: "Personal portfolio with custom CMS and blogging capabilities.",
        category: "Web Development",
        technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Prisma", "MongoDB"],
        featured: true,
        imageUrl: "/images/projects/portfolio.jpg",
        liveUrl: "https://example-portfolio.com",
        githubUrl: "https://github.com/username/portfolio",
        client: "Personal Project",
        duration: "1 month",
        services: ["Web Development", "UI/UX Design", "CMS Development", "SEO Optimization"],
        achievements: [
          "Fast loading times (< 2 seconds)",
          "SEO-optimized content structure",
          "Mobile-first responsive design",
          "Admin dashboard for content management"
        ],
        challenges: [
          "Performance optimization",
          "SEO implementation",
          "Content management system",
          "Responsive design requirements"
        ],
        solutions: [
          "Implemented static generation and caching",
          "Used semantic HTML and structured data",
          "Built custom admin dashboard",
          "Mobile-first design approach"
        ]
      }
    ];

    // Create projects
    for (const project of sampleProjects) {
      await prisma.project.create({
        data: project
      });
      console.log(`✅ Created project: ${project.title}`);
    }

    console.log(`\n🎉 Successfully created ${sampleProjects.length} sample projects!`);
    console.log('\n📊 Dashboard Summary:');
    console.log(`   • Total Projects: ${sampleProjects.length}`);
    console.log(`   • Featured Projects: ${sampleProjects.filter(p => p.featured).length}`);
    console.log(`   • Categories: ${[...new Set(sampleProjects.map(p => p.category))].length}`);
    console.log('\n🔐 Login to your admin dashboard to view the projects:');
    console.log('   URL: http://localhost:3000/admin/login');
    console.log('   Email: admin@muhammadaslan.com');
    console.log('   Password: admin123');

  } catch (error) {
    console.error('❌ Error creating sample projects:', error.message);

    if (error.message.includes('Environment variable not found: MONGODB_URI')) {
      console.log('\n🔧 Setup Required:');
      console.log('1. Configure your MongoDB connection in .env.local');
      console.log('2. Run the admin setup script: node scripts/setup-admin.js');
      console.log('3. Run this script again');
    }

    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
addSampleProjects();