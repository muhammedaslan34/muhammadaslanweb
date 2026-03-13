import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { User, Calendar, Code2 } from "lucide-react";
import { motion } from "motion/react";

interface TechStackProps {
  technologies: string[];
  clientName: string;
  projectDate: string;
}

export function TechStack({ technologies, clientName, projectDate }: TechStackProps) {
  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-blue-400">Project Info</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Client Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="bg-gray-800/50 border-gray-700 p-6 hover:border-blue-500 transition-colors">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-600/20 rounded-lg">
                <User className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Client</p>
                <p className="text-white mt-1">{clientName}</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Project Date */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-gray-800/50 border-gray-700 p-6 hover:border-blue-500 transition-colors">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-600/20 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Timeline</p>
                <p className="text-white mt-1">{projectDate}</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="bg-gray-800/50 border-gray-700 p-6 hover:border-blue-500 transition-colors lg:col-span-1 sm:col-span-2">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-600/20 rounded-lg">
                <Code2 className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Tech Stack</p>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {technologies.slice(0, 3).map((tech, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-blue-500/20 border-blue-400/40 text-blue-300 text-xs px-2 py-0.5"
                    >
                      {tech}
                    </Badge>
                  ))}
                  {technologies.length > 3 && (
                    <Badge
                      variant="outline"
                      className="bg-blue-500/20 border-blue-400/40 text-blue-300 text-xs px-2 py-0.5"
                    >
                      +{technologies.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
