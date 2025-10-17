'use client';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface BentoGridItemProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

const BentoGridItem = ({
  title,
  description,
  icon,
  className,
  size = 'small',
}: BentoGridItemProps) => {
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring' as const, damping: 25 },
    },
  };

  return (
    <motion.div
      variants={variants}
      className={cn(
        'group border-accent/10 hover:border-accent/30 relative flex h-full cursor-pointer flex-col justify-between overflow-hidden rounded-xl border px-6 pt-6 pb-10 shadow-md transition-all duration-500',
        className,
      )}
      style={{ backgroundColor: 'var(--card-bg)' }}
    >
      <div className="absolute top-0 -right-1/2 z-0 size-full cursor-pointer bg-[linear-gradient(to_right,#3d16165e_1px,transparent_1px),linear-gradient(to_bottom,#3d16165e_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] bg-[size:24px_24px]"></div>

      <div className="text-accent/5 group-hover:text-accent/10 absolute right-1 bottom-3 scale-[6] transition-all duration-700 group-hover:scale-[6.2]">
        {icon}
      </div>

      <div className="relative z-10 flex h-full flex-col justify-between">
        <div>
          <div className="bg-accent/10 text-accent shadow-accent/10 group-hover:bg-accent/20 group-hover:shadow-accent/20 mb-4 flex h-12 w-12 items-center justify-center rounded-full shadow transition-all duration-500">
            {icon}
          </div>
          <h3 className="mb-2 text-xl font-semibold tracking-tight">{title}</h3>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
        <div className="text-accent mt-4 flex items-center text-sm">
          <span className="mr-1">Learn more</span>
          <ArrowRight className="size-4 transition-all duration-500 group-hover:translate-x-2" />
        </div>
      </div>
      <div className="from-accent to-accent/30 absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r blur-2xl transition-all duration-500 group-hover:blur-lg" />
    </motion.div>
  );
};

const services = [
  {
    title: 'Custom Web Development',
    description:
      'Full-stack web applications built with modern technologies like Next.js, React, TypeScript, and Node.js. From concept to deployment, we create scalable solutions tailored to your business needs.',
<<<<<<< HEAD
    icon: <img src="/images/services/web-development.svg" alt="Web Development" className="size-6" />,
=======
    icon: <Code className="size-6" />,
>>>>>>> muhammadaslanweb/main
    size: 'large' as const,
  },
  {
    title: 'Mobile-First Design',
    description:
      'Responsive web designs that work flawlessly across all devices. We prioritize mobile user experience to ensure your application looks and performs great on smartphones, tablets, and desktops.',
<<<<<<< HEAD
    icon: <img src="/images/services/mobile-design.svg" alt="Mobile Design" className="size-6" />,
=======
    icon: <Smartphone className="size-6" />,
>>>>>>> muhammadaslanweb/main
    size: 'small' as const,
  },
  {
    title: 'UI/UX Excellence',
    description: 'Beautiful, intuitive interfaces that delight users and drive engagement. We combine aesthetic appeal with usability to create experiences that keep your users coming back.',
<<<<<<< HEAD
    icon: <img src="/images/services/ui-ux.svg" alt="UI/UX Design" className="size-6" />,
=======
    icon: <Palette className="size-6" />,
>>>>>>> muhammadaslanweb/main
    size: 'medium' as const,
  },
  {
    title: 'Performance Optimization',
    description: "Lightning-fast applications optimized for speed and efficiency. We implement best practices for code splitting, lazy loading, and caching to ensure optimal performance.",
<<<<<<< HEAD
    icon: <img src="/images/services/performance.svg" alt="Performance" className="size-6" />,
=======
    icon: <Zap className="size-6" />,
>>>>>>> muhammadaslanweb/main
    size: 'medium' as const,
  },
  {
    title: 'API Integration',
    description: 'Seamless integration with third-party services and payment gateways. We handle everything from RESTful APIs to real-time WebSocket connections.',
<<<<<<< HEAD
    icon: <img src="/images/services/api-integration.svg" alt="API Integration" className="size-6" />,
=======
    icon: <Globe className="size-6" />,
>>>>>>> muhammadaslanweb/main
    size: 'small' as const,
  },
  {
    title: 'Maintenance & Support',
    description:
      'Ongoing support and maintenance to keep your application running smoothly. We provide regular updates, security patches, and performance monitoring to ensure long-term success.',
<<<<<<< HEAD
    icon: <img src="/images/services/maintenance.svg" alt="Maintenance & Support" className="size-6" />,
=======
    icon: <FileText className="size-6" />,
>>>>>>> muhammadaslanweb/main
    size: 'large' as const,
  },
];

export function FeaturedServices() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <motion.div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {services.map((service, i) => (
          <BentoGridItem
            key={i}
            title={service.title}
            description={service.description}
            icon={service.icon}
            size={service.size}
            className={cn(
              service.size === 'large'
                ? 'col-span-4'
                : service.size === 'medium'
                  ? 'col-span-3'
                  : 'col-span-2',
              'h-full',
            )}
          />
        ))}
      </motion.div>
    </div>
  );
}
