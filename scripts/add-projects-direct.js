require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function addProjectsDirect() {
  try {
    console.log('🔄 Adding projects directly to database...');

    const projects = [
      {
        title: "DT Masters - Driving School Platform",
        description: "A comprehensive driving school management system with booking, scheduling, and student progress tracking.",
        excerpt: "Modern driving school platform with real-time booking, instructor management, and progress tracking.",
        slug: "dtmasters",
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
        description: "A full-featured e-commerce platform with product management, shopping cart, and payment integration.",
        excerpt: "Modern fashion e-commerce site with inventory management and secure payment processing.",
        slug: "fashion-store",
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
        description: "A comprehensive real estate platform with property listings, search filters, and agent management.",
        excerpt: "Property management platform with advanced search, virtual tours, and agent tools.",
        slug: "real-estate-portal",
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
        description: "Complete restaurant management solution with online ordering, table reservations, and inventory management.",
        excerpt: "Restaurant POS system with online ordering, reservations, and inventory tracking.",
        slug: "restaurant-management",
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
        description: "Educational platform with course creation, student enrollment, and progress tracking.",
        excerpt: "Comprehensive LMS with video streaming, quizzes, and certification system.",
        slug: "learning-management",
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
        description: "Patient management system with appointment scheduling, medical records, and telemedicine capabilities.",
        excerpt: "Healthcare platform with telemedicine, appointment booking, and patient management.",
        slug: "healthcare-portal",
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
    ];

    console.log(`📋 Found ${projects.length} projects to add`);

    let addedCount = 0;
    let skippedCount = 0;

    for (const project of projects) {
      try {
        // Check if project already exists
        const existing = await prisma.project.findUnique({
          where: { slug: project.slug }
        });

        if (existing) {
          console.log(`⏭️  Skipping "${project.title}" - already exists`);
          skippedCount++;
          continue;
        }

        // Add project
        await prisma.project.create({
          data: project
        });

        console.log(`✅ Added "${project.title}"`);
        addedCount++;

      } catch (error) {
        console.error(`❌ Failed to add "${project.title}":`, error.message);
      }
    }

    console.log(`\n🎉 Project addition completed!`);
    console.log(`   ✅ Added: ${addedCount} projects`);
    console.log(`   ⏭️  Skipped: ${skippedCount} projects (already exist)`);
    console.log(`   📊 Total projects in database: ${await prisma.project.count()}`);

    if (addedCount > 0) {
      console.log('\n🔐 Your admin dashboard now shows all projects!');
      console.log('   Login: http://localhost:3001/admin/login');
      console.log('   Email: admin@muhammadaslan.com');
      console.log('   Password: admin123');
    }

  } catch (error) {
    console.error('❌ Failed to add projects:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

addProjectsDirect();