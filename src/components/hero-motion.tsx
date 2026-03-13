"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export function HeroMotion() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".hero-line", { y: 24, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power2.out"
      });
    }, ref);
    return () => ctx.revert();
  }, []);
  return <div ref={ref} />;
}
