'use client';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Marquee } from '@/components/ui/marquee';

export function Highlight({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'bg-blue-500/10 p-1 py-0.5 font-bold text-blue-500',
        className,
      )}
    >
      {children}
    </span>
  );
}

export interface TestimonialCardProps {
  name: string;
  role: string;
  img?: string;
  description: React.ReactNode;
  className?: string;
  [key: string]: any;
}

export function TestimonialCard({
  description,
  name,
  img,
  role,
  className,
  ...props // Capture the rest of the props
}: TestimonialCardProps) {
  return (
    <div
      className={cn(
        'mb-4 flex w-full cursor-pointer break-inside-avoid flex-col items-center justify-between gap-6 rounded-xl p-4',
        // theme styles
        'border-border bg-card/50 border shadow-sm',
        // hover effect
        'transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md',
        className,
      )}
      {...props}
    >
      <div className="text-muted-foreground text-sm font-normal select-none">
        {description}
        <div className="flex flex-row py-1">
          <Star className="size-4 fill-blue-500 text-blue-500" />
          <Star className="size-4 fill-blue-500 text-blue-500" />
          <Star className="size-4 fill-blue-500 text-blue-500" />
          <Star className="size-4 fill-blue-500 text-blue-500" />
          <Star className="size-4 fill-blue-500 text-blue-500" />
        </div>
      </div>
      <div className="flex w-full items-center justify-start gap-5 select-none">
        <img
          width={40}
          height={40}
          src={img || ''}
          alt={name}
          className="size-10 rounded-full ring-1 ring-blue-500/20 ring-offset-2"
        />
        <div>
          <p className="text-foreground font-medium">{name}</p>
          <p className="text-muted-foreground text-xs font-normal">{role}</p>
        </div>
      </div>
    </div>
  );
}

const testimonials = [
  {
    name: 'Sarah Thompson',
    role: 'CEO at TechStart Inc.',
<<<<<<< HEAD
    img: '/images/testimonials/sarah-thompson.svg',
=======
    img: 'https://randomuser.me/api/portraits/women/32.jpg',
>>>>>>> muhammadaslanweb/main
    description: (
      <p>
        Working with Muhammed was an exceptional experience.
        <Highlight>
          He delivered our custom web application ahead of schedule and exceeded all expectations.
        </Highlight>{' '}
        His attention to detail and problem-solving skills are remarkable.
      </p>
    ),
  },
  {
    name: 'Michael Rodriguez',
    role: 'Product Manager at InnovateTech',
<<<<<<< HEAD
    img: '/images/testimonials/michael-rodriguez.svg',
=======
    img: 'https://randomuser.me/api/portraits/men/45.jpg',
>>>>>>> muhammadaslanweb/main
    description: (
      <p>
        Muhammed transformed our outdated platform into a modern, responsive application.
        <Highlight>
          The performance improvements alone reduced our bounce rate by 40%.
        </Highlight>{' '}
        His expertise in full-stack development is evident in every aspect of the project.
      </p>
    ),
  },
  {
    name: 'Emily Chen',
    role: 'Founder at StartupHub',
<<<<<<< HEAD
    img: '/images/testimonials/emily-chen.svg',
=======
    img: 'https://randomuser.me/api/portraits/women/28.jpg',
>>>>>>> muhammadaslanweb/main
    description: (
      <p>
        As a non-technical founder, I needed someone who could translate my vision into reality.
        <Highlight>Muhammed made the entire process seamless and educational.</Highlight>
        He built our MVP in record time and continues to provide excellent support.
      </p>
    ),
  },
  {
    name: 'David Park',
    role: 'Marketing Director at DigitalFirst',
<<<<<<< HEAD
    img: '/images/testimonials/david-park.svg',
=======
    img: 'https://randomuser.me/api/portraits/men/38.jpg',
>>>>>>> muhammadaslanweb/main
    description: (
      <p>
        Our new website has been a game-changer for our business.
        <Highlight>
          The UI/UX design is intuitive and our conversion rates have doubled.
        </Highlight>{' '}
        Muhammed really understands how to create user experiences that drive results.
      </p>
    ),
  },
  {
    name: 'Jessica Williams',
    role: 'Operations Manager at CloudScale',
<<<<<<< HEAD
    img: '/images/testimonials/jessica-williams.svg',
=======
    img: 'https://randomuser.me/api/portraits/women/41.jpg',
>>>>>>> muhammadaslanweb/main
    description: (
      <p>
        Muhammed built our internal management system that streamlined our entire workflow.
        <Highlight>
          What used to take hours now takes minutes, thanks to his efficient solutions.
        </Highlight>{' '}
        His ability to understand complex business requirements is impressive.
      </p>
    ),
  },
  {
    name: 'Alex Kumar',
    role: 'Tech Lead at DataFlow Systems',
<<<<<<< HEAD
    img: '/images/testimonials/alex-kumar.svg',
=======
    img: 'https://randomuser.me/api/portraits/men/52.jpg',
>>>>>>> muhammadaslanweb/main
    description: (
      <p>
        We hired Muhammed to optimize our database and backend performance.
        <Highlight>
          Query speeds improved by 300% and system stability increased significantly.
        </Highlight>{' '}
        His deep knowledge of optimization techniques is truly valuable.
      </p>
    ),
  },
  {
    name: 'Rachel Foster',
    role: 'Creative Director at BrandCraft',
<<<<<<< HEAD
    img: '/images/testimonials/rachel-foster.svg',
=======
    img: 'https://randomuser.me/api/portraits/women/35.jpg',
>>>>>>> muhammadaslanweb/main
    description: (
      <p>
        Muhammed brought our creative vision to life with technical excellence.
        <Highlight>
          The interactive features and animations he implemented are simply stunning.
        </Highlight>{' '}
        He perfectly balances creativity with technical functionality.
      </p>
    ),
  },
  {
    name: 'Thomas Anderson',
    role: 'CEO at FinTech Solutions',
<<<<<<< HEAD
    img: '/images/testimonials/thomas-anderson.svg',
=======
    img: 'https://randomuser.me/api/portraits/men/47.jpg',
>>>>>>> muhammadaslanweb/main
    description: (
      <p>
        Security and reliability were our top priorities for our financial platform.
        <Highlight>
          Muhammed delivered a robust solution that exceeds industry standards.
        </Highlight>{' '}
        His commitment to best practices and code quality is outstanding.
      </p>
    ),
  },
  {
    name: 'Lisa Martinez',
    role: 'Product Owner at EduTech Pro',
<<<<<<< HEAD
    img: '/images/testimonials/lisa-martinez.svg',
=======
    img: 'https://randomuser.me/api/portraits/women/39.jpg',
>>>>>>> muhammadaslanweb/main
    description: (
      <p>
        Muhammed developed our learning management system with incredible attention to user experience.
        <Highlight>
          Student engagement has increased by 60% since the new platform launched.
        </Highlight>{' '}
        He's responsive, professional, and delivers exceptional work every time.
      </p>
    ),
  },
  {
    name: 'James Wilson',
    role: 'CTO at HealthTech Innovations',
<<<<<<< HEAD
    img: '/images/testimonials/james-wilson.svg',
=======
    img: 'https://randomuser.me/api/portraits/men/43.jpg',
>>>>>>> muhammadaslanweb/main
    description: (
      <p>
        We needed a developer who could handle complex integrations and HIPAA compliance.
        <Highlight>
          Muhammed delivered a secure, compliant solution that passed all audits with flying colors.
        </Highlight>{' '}
        His expertise in healthcare technology development is unmatched.
      </p>
    ),
  },
];

export function Testimonials() {
  return (
    <section className="relative container py-10">
      {/* Decorative elements */}
      <div className="absolute top-20 -left-20 z-10 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl" />
      <div className="absolute -right-20 bottom-20 z-10 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-foreground mb-4 text-center text-4xl leading-[1.2] font-bold tracking-tighter md:text-5xl">
          Client Success Stories
        </h2>
        <h3 className="text-muted-foreground mx-auto mb-8 max-w-lg text-center text-lg font-medium tracking-tight text-balance">
          Don&apos;t just take our word for it. Here&apos;s what{' '}
          <span className="bg-gradient-to-r from-blue-500 to-sky-500 bg-clip-text text-transparent">
            real clients
          </span>{' '}
          are saying about our{' '}
          <span className="font-semibold text-blue-500">development services</span>
        </h3>
      </motion.div>
      <div className="relative mt-6 max-h-screen overflow-hidden">
        <div className="gap-4 md:columns-2 xl:columns-3 2xl:columns-4">
          {Array(Math.ceil(testimonials.length / 3))
            .fill(0)
            .map((_, i) => (
              <Marquee
                vertical
                key={i}
                className={cn({
                  '[--duration:60s]': i === 1,
                  '[--duration:30s]': i === 2,
                  '[--duration:70s]': i === 3,
                })}
              >
                {testimonials.slice(i * 3, (i + 1) * 3).map((card, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: Math.random() * 0.8,
                      duration: 1.2,
                    }}
                  >
                    <TestimonialCard {...card} />
                  </motion.div>
                ))}
              </Marquee>
            ))}
        </div>
        <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-1/4 w-full "></div>
        <div className="from-background pointer-events-none absolute inset-x-0 top-0 h-1/4 w-full "></div>
      </div>
    </section>
  );
}