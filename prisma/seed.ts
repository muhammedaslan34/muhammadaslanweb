
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

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
