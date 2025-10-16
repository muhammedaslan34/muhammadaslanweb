import React, { useEffect, useRef } from 'react';

interface BorderBeamProps {
  duration?: number;
  size?: number;
  className?: string;
  reverse?: boolean;
}

export function BorderBeam({
  duration = 3,
  size = 200,
  className = "",
  reverse = false,
}: BorderBeamProps) {
  const borderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!borderRef.current) return;

    const border = borderRef.current;
    const animation = border.animate(
      [
        { transform: 'translateX(-100%)' },
        { transform: 'translateX(100%)' },
      ],
      {
        duration: duration * 1000,
        iterations: Infinity,
        direction: reverse ? 'reverse' : 'normal',
        easing: 'linear',
      }
    );

    return () => animation.cancel();
  }, [duration, reverse]);

  return (
    <div
      ref={borderRef}
      className={`absolute inset-0 overflow-hidden rounded-2xl ${className}`}
      style={{
        background: `linear-gradient(90deg, transparent, currentColor, transparent)`,
        width: `${size}px`,
        height: '2px',
        top: '0',
        left: '0',
        transform: 'translateX(-100%)',
      }}
    />
  );
}
