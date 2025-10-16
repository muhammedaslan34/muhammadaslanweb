import React from 'react';

interface SpotlightProps {
  gradientFirst?: string;
  gradientSecond?: string;
  gradientThird?: string;
  className?: string;
}

export function Spotlight({
  gradientFirst = "radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(0, 100%, 50%, 0.08) 0, hsla(0, 100%, 55%, 0.04) 50%, hsla(0, 100%, 45%, 0) 80%)",
  gradientSecond = "radial-gradient(50% 50% at 50% 50%, hsla(0, 100%, 85%, 0.08) 0, hsla(0, 100%, 55%, 0.04) 80%, transparent 100%)",
  gradientThird = "radial-gradient(50% 50% at 50% 50%, hsla(0, 100%, 85%, 0.06) 0, hsla(0, 100%, 85%, 0.06) 80%, transparent 100%)",
  className = "",
}: SpotlightProps) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background: gradientFirst,
        }}
      />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: gradientSecond,
        }}
      />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: gradientThird,
        }}
      />
    </div>
  );
}
