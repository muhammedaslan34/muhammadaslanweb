import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Github, ExternalLink, Calendar } from "lucide-react";
import { motion } from "motion/react";

interface ProjectHeaderProps {
  title: string;
  category: string;
  status: string;
  date: string;
  description: string;
  githubUrl: string;
  liveUrl: string;
  imageUrl: string;
}

export function ProjectHeader({
  title,
  category,
  status,
  date,
  description,
  githubUrl,
  liveUrl,
  imageUrl,
}: ProjectHeaderProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
      {/* Left Column - Project Info */}
      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="space-y-4">
          <motion.div 
            className="flex items-center gap-3 flex-wrap"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Badge className="bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 border-blue-500/30">
              {category}
            </Badge>
            <Badge className="bg-green-600/10 hover:bg-green-600/20 text-green-400 border-green-500/30">
              {status}
            </Badge>
          </motion.div>
          <motion.h1 
            className="text-blue-400"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {title}
          </motion.h1>
          <motion.div 
            className="flex items-center gap-2 text-gray-400"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Calendar className="w-4 h-4" />
            <span>{date}</span>
          </motion.div>
        </div>
        <motion.p 
          className="text-gray-300 text-lg leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {description}
        </motion.p>
        <motion.div 
          className="flex gap-3 flex-wrap"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Button
            variant="outline"
            className="bg-gray-800 border-gray-700 hover:bg-gray-700 hover:border-blue-500 text-white"
            onClick={() => window.open(githubUrl, "_blank")}
          >
            <Github className="w-4 h-4 mr-2" />
            View Code
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => window.open(liveUrl, "_blank")}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Live Demo
          </Button>
        </motion.div>
      </motion.div>

      {/* Right Column - Project Image */}
      <motion.div 
        className="relative"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-700/50">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-auto"
          />
        </div>
      </motion.div>
    </div>
  );
}
