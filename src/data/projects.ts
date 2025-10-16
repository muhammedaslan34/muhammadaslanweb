export interface Project {
  id: number
  title: string
  description: string
  excerpt: string
  slug: string
  category: string
  technologies: string[]
  featured: boolean
  imageUrl?: string
  liveUrl?: string
  githubUrl?: string
  createdAt: string
  updatedAt: string
  client?: string
  duration?: string
  services?: string[]
  achievements?: string[]
  challenges?: string[]
  solutions?: string[]
}

export const projects: Project[] = [
  {
    id: 1,
    title: "DT Masters - Driving School Platform",
    description: "A comprehensive driving school management system with booking, scheduling, and student progress tracking.",
    excerpt: "Modern driving school platform with real-time booking, instructor management, and progress tracking.",
    slug: "dtmasters",
    category: "Web Development",
    technologies: ["WordPress", "PHP", "MySQL", "JavaScript", "Bootstrap"],
    featured: true,
    imageUrl: "/images/projects/dtmasters.jpg",
    liveUrl: "https://dtmasters.com",
    githubUrl: "",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15",
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
    id: 2,
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
    createdAt: "2024-02-01",
    updatedAt: "2024-02-01",
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
    id: 3,
    title: "Real Estate Portal",
    description: "A comprehensive real estate platform with property listings, search filters, and agent management.",
    excerpt: "Property management platform with advanced search, virtual tours, and agent tools.",
    slug: "real-estate-portal",
    category: "Real Estate",
    technologies: ["WordPress", "PHP", "JavaScript", "Mapbox API", "MySQL"],
    featured: false,
    imageUrl: "/images/projects/real-estate.jpg",
    liveUrl: "https://realestate-demo.com",
    githubUrl: "",
    createdAt: "2023-12-10",
    updatedAt: "2023-12-10",
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
    id: 4,
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
    createdAt: "2023-11-15",
    updatedAt: "2023-11-15",
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
    id: 5,
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
    createdAt: "2023-10-20",
    updatedAt: "2023-10-20",
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
    id: 6,
    title: "Healthcare Portal",
    description: "Patient management system with appointment scheduling, medical records, and telemedicine capabilities.",
    excerpt: "Healthcare platform with telemedicine, appointment booking, and patient management.",
    slug: "healthcare-portal",
    category: "Healthcare",
    technologies: ["React", "Node.js", "Express", "MongoDB", "WebRTC"],
    featured: false,
    imageUrl: "/images/projects/healthcare.jpg",
    liveUrl: "https://healthcare-demo.com",
    githubUrl: "",
    createdAt: "2023-09-15",
    updatedAt: "2023-09-15",
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

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find(project => project.slug === slug)
}

export const getProjectsByCategory = (category: string): Project[] => {
  return projects.filter(project => project.category === category)
}

export const getFeaturedProjects = (): Project[] => {
  return projects.filter(project => project.featured)
}

export const getProjectCategories = (): string[] => {
  return [...new Set(projects.map(project => project.category))]
}

export const getProjectTechnologies = (): string[] => {
  return [...new Set(projects.flatMap(project => project.technologies))]
}