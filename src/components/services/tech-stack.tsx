const technologies = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "WordPress",
  "Node.js",
  "PostgreSQL",
  "MongoDB",
  "Vercel",
  "AWS",
  "Figma",
  "Git"
]

export function TechStack() {
  return (
    <section className="py-24 bg-main">
      <div className="container">
        <div className="text-center space-y-4 mb-16">
          <h2 className="heading-lg">Technology Stack</h2>
          <p className="body-lg text-muted-foreground max-w-2xl mx-auto">
            Modern tools and technologies I use to build exceptional web solutions
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="p-4 text-center hover-lift group rounded-xl border border-border/40 shadow-sm"
                style={{ backgroundColor: 'var(--card-bg)' }}
              >
                <div className="text-sm font-semibold group-hover:text-accent transition-colors">
                  {tech}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="body-sm text-muted-foreground">
            Always learning and adapting to the latest technologies to deliver cutting-edge solutions
          </p>
        </div>
      </div>
    </section>
  )
}