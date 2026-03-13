'use client';

interface AnimatedBtnProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function AnimatedBtn({ children, onClick, className }: AnimatedBtnProps) {
  return (
    <div className={`flex items-center justify-center ${className || ''}`}>
      <button
        className="bubble-effect-btn relative inline-block min-w-[130px] h-10 text-white cursor-pointer transition-all duration-300 outline-none rounded-full border-none bg-gradient-to-r from-gray-800 to-gray-700 shadow-lg z-10 overflow-hidden hover:shadow-xl active:translate-y-0.5 active:shadow-md"
        type="button"
        onClick={onClick}
      >
        <span className="relative z-20 text-sm font-medium">{children}</span>
      </button>
    </div>
  );
}