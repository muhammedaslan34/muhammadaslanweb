import type { ReactNode } from 'react';
import {
  Code2,
  Smartphone,
  Palette,
  Zap,
  Users,
  Award,
} from 'lucide-react';
import { FeatureCard } from './feature-card';

interface Feature {
  icon: ReactNode;
  title: string;
  desc: string;
}

const features: Feature[] = [
  {
    icon: <Code2 className="h-6 w-6" />,
    title: 'Full-Stack Development',
    desc: 'Building robust web applications with modern technologies like Next.js, React, TypeScript, and Node.js.',
  },
  {
    icon: <Smartphone className="h-6 w-6" />,
    title: 'Responsive Design',
    desc: 'Creating seamless experiences across all devices with mobile-first design principles and modern CSS.',
  },
  {
    icon: <Palette className="h-6 w-6" />,
    title: 'UI/UX Excellence',
    desc: 'Crafting intuitive interfaces with attention to detail, accessibility, and user-centered design thinking.',
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: 'Performance Optimized',
    desc: 'Delivering lightning-fast applications with optimized code, lazy loading, and modern performance techniques.',
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Client Collaboration',
    desc: 'Working closely with clients to bring their vision to life through clear communication and iterative feedback.',
  },
  {
    icon: <Award className="h-6 w-6" />,
    title: 'Quality Assurance',
    desc: 'Ensuring bug-free delivery with comprehensive testing, code reviews, and adherence to best practices.',
  },
];

export function WhyChooseUs() {
  return (
    <section className="relative py-14">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="relative mx-auto max-w-2xl sm:text-center">
          <div className="relative z-10">
            <h3 className="font-geist mt-4 text-3xl font-normal tracking-tighter sm:text-4xl md:text-5xl">
              Building Digital Solutions That Matter
            </h3>
            <p className="font-geist text-foreground/60 mt-3 leading-relaxed">
              Transforming ideas into powerful web experiences with modern technologies, thoughtful design, and a commitment to excellence in every project.
            </p>
          </div>
          <div
            className="absolute inset-0 mx-auto h-44 max-w-xs blur-[118px]"
            style={{
              background:
                'linear-gradient(152.92deg, rgba(59, 130, 246, 0.3) 4.54%, rgba(37, 99, 235, 0.4) 34.2%, rgba(29, 78, 216, 0.2) 77.55%)',
            }}
          ></div>
        </div>
        <hr className="bg-foreground/30 mx-auto mt-5 h-px w-1/2" />
        <div className="relative mt-12">
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((item, idx) => (
              <FeatureCard
                key={idx}
                icon={item.icon}
                title={item.title}
                description={item.desc}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}