import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { AspectRatio } from "./ui/aspect-ratio";
import { ExternalLink, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  url: string;
}

interface RelatedProjectsProps {
  projects: Project[];
}

export function RelatedProjects({ projects }: RelatedProjectsProps) {
  return (
    <motion.section 
      className="py-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-blue-400 mb-2">Related Projects</h2>
        <p className="text-gray-400">
          Explore more projects from our portfolio
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {projects.map((project) => (
              <CarouselItem key={project.id} className="pl-4 md:basis-1/2 lg:basis-1/2">
                <Card className="bg-gray-900/50 border-gray-800 overflow-hidden group hover:bg-gray-900/70 transition-all duration-300">
                {/* Project Image */}
                <div className="relative overflow-hidden">
                  <AspectRatio ratio={16 / 9}>
                    <ImageWithFallback
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
                  </AspectRatio>
                </div>

                {/* Project Info */}
                <div className="p-6 space-y-4">
                  {/* Category Badge */}
                  <Badge className="bg-blue-600/20 text-blue-400 border-blue-500/40">
                    {project.category}
                  </Badge>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="text-blue-400">{project.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-gray-800/50 text-gray-300 rounded border border-gray-700/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* View Project Button */}
                  <Button
                    variant="outline"
                    className="w-full bg-transparent border-blue-500/50 text-blue-400 hover:bg-blue-600/20 hover:border-blue-500 group/btn"
                    onClick={() => window.open(project.url, "_blank")}
                  >
                    View Project
                    <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
          <CarouselPrevious className="bg-blue-600/20 border-blue-500/50 text-blue-400 hover:bg-blue-600/30 -left-12" />
          <CarouselNext className="bg-blue-600/20 border-blue-500/50 text-blue-400 hover:bg-blue-600/30 -right-12" />
        </Carousel>
      </motion.div>
    </motion.section>
  );
}
