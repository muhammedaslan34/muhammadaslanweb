import { Card } from "./ui/card";
import { motion } from "motion/react";

interface TimelineItem {
  phase: string;
  description: string;
  date: string;
}

interface ProjectTimelineProps {
  timeline: TimelineItem[];
}

export function ProjectTimeline({ timeline }: ProjectTimelineProps) {
  return (
    <motion.div 
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-blue-400">Project Timeline</h2>
      <div className="space-y-4">
        {timeline.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
          >
            <Card className="bg-gray-800/50 border-gray-700 p-5 relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-blue-600 before:rounded-l">
              <div className="flex justify-between items-start gap-4 flex-wrap">
                <div>
                  <h3 className="text-blue-400 mb-1">{item.phase}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
                <span className="text-gray-500 text-sm whitespace-nowrap">
                  {item.date}
                </span>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
