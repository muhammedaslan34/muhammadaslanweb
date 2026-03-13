import { ProjectHeader } from "./components/ProjectHeader";
import { TechStack } from "./components/TechStack";
import { ProjectFeatures } from "./components/ProjectFeatures";
import { ProjectTimeline } from "./components/ProjectTimeline";
import { RelatedProjects } from "./components/RelatedProjects";
import { Card } from "./components/ui/card";
import { Separator } from "./components/ui/separator";
import projectImage from "figma:asset/1e47a84812954f103da616a5c6877cb80109acfa.png";

export default function App() {
  const projectData = {
    title: "E-Commerce Platform",
    category: "Web Development",
    status: "Completed",
    date: "January 2025 - October 2025",
    description:
      "A full-stack e-commerce platform featuring real-time inventory management, secure payment processing, and an intuitive admin dashboard. Built with modern technologies to ensure scalability and optimal performance.",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Tailwind CSS",
      "Redux",
      "Stripe API",
      "JWT",
      "Docker",
      "AWS",
      "Redis",
    ],
    features: [
      "User authentication and authorization with JWT tokens and refresh token rotation",
      "Real-time inventory tracking with automatic stock updates and low-stock alerts",
      "Secure payment processing integration with Stripe and PayPal",
      "Responsive design optimized for desktop, tablet, and mobile devices",
      "Advanced product search with filters, sorting, and pagination",
      "Admin dashboard with analytics, order management, and user administration",
      "Shopping cart with persistent state across sessions",
      "Email notifications for orders, shipping updates, and promotions",
      "Product reviews and ratings system with moderation",
      "SEO optimization with dynamic meta tags and sitemap generation",
    ],
    timeline: [
      {
        phase: "Planning & Design",
        description: "Requirements gathering, wireframing, and UI/UX design",
        date: "Jan 2025",
      },
      {
        phase: "Frontend Development",
        description: "Built responsive UI components and state management",
        date: "Feb - Apr 2025",
      },
      {
        phase: "Backend Development",
        description: "API development, database design, and authentication",
        date: "May - Jul 2025",
      },
      {
        phase: "Testing & Deployment",
        description: "QA testing, bug fixes, and production deployment",
        date: "Aug - Oct 2025",
      },
    ],
  };

  const relatedProjects = [
    {
      id: 1,
      title: "Analytics Dashboard",
      category: "Data Visualization",
      description:
        "A comprehensive analytics dashboard with real-time data visualization, custom reporting, and interactive charts for business intelligence.",
      imageUrl: "https://images.unsplash.com/photo-1761593280919-766a4acbcfca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBkYXNoYm9hcmQlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzYxOTE0MzY4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      technologies: ["React", "D3.js", "TypeScript", "Node.js"],
      url: "https://example.com/analytics",
    },
    {
      id: 2,
      title: "Mobile Fitness App",
      category: "Mobile Development",
      description:
        "A cross-platform mobile fitness application featuring workout tracking, nutrition plans, and social features to help users achieve their fitness goals.",
      imageUrl: "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXNpZ258ZW58MXx8fHwxNzYxODYyMzQ5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      technologies: ["React Native", "Firebase", "Redux", "Express"],
      url: "https://example.com/fitness",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white relative overflow-hidden">
      {/* Radial gradient background effect */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-700/15 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[90px] -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <ProjectHeader
            title={projectData.title}
            category={projectData.category}
            status={projectData.status}
            date={projectData.date}
            description={projectData.description}
            githubUrl={projectData.githubUrl}
            liveUrl={projectData.liveUrl}
            imageUrl={projectImage}
          />

          <Separator className="my-12 bg-gray-800" />

          {/* Project Info */}
          <div className="mb-8">
            <TechStack 
              technologies={projectData.technologies}
              clientName="Acme Corporation"
              projectDate={projectData.date}
            />
          </div>

          <Separator className="my-8 bg-gray-800" />

          {/* Features */}
          <div className="mb-8">
            <ProjectFeatures features={projectData.features} />
          </div>

          <Separator className="my-8 bg-gray-800" />

          {/* Timeline */}
          <div className="mb-8">
            <ProjectTimeline timeline={projectData.timeline} />
          </div>

          <Separator className="my-12 bg-gray-800" />

          {/* Related Projects */}
          <RelatedProjects projects={relatedProjects} />

          {/* Footer Section */}
          <Card className="bg-gray-800/50 border-gray-700 p-8 text-center mt-12">
            <h3 className="text-blue-400 mb-2">Interested in this project?</h3>
            <p className="text-gray-400 mb-4">
              Feel free to reach out for more details or collaboration opportunities.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <a
                href="mailto:developer@example.com"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                developer@example.com
              </a>
              <span className="text-gray-600">•</span>
              <a
                href="https://github.com"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                GitHub
              </a>
              <span className="text-gray-600">•</span>
              <a
                href="https://linkedin.com"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
