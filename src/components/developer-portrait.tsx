import Image from "next/image"

interface DeveloperPortraitProps {
  className?: string
}

export function DeveloperPortrait({ className = "" }: DeveloperPortraitProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Developer Portrait Container */}
      <div className="w-full h-96 lg:h-[500px] relative">
        {/* Background with subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl border border-primary/20"></div>
        
        {/* Portrait Image Placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-4">
            {/* Avatar Placeholder */}
            <div className="w-32 h-32 bg-primary/20 rounded-full mx-auto flex items-center justify-center border-2 border-primary/30">
              <span className="text-4xl font-bold text-white">MA</span>
            </div>
            
            {/* Text Labels */}
            <div className="space-y-2">
              <p className="text-white/70 text-sm font-medium">Muhammed Aslan</p>
              <p className="text-white/50 text-xs">Developer Portrait</p>
              <p className="text-white/40 text-xs">Replace with actual photo</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-full opacity-60 animate-pulse"></div>
      <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-accent rounded-full opacity-60 animate-pulse delay-1000"></div>
    </div>
  )
}

// Alternative component for when you have an actual image
export function DeveloperPortraitWithImage({ 
  src, 
  alt = "Muhammed Aslan - Developer Portrait",
  className = "" 
}: { 
  src: string
  alt?: string
  className?: string 
}) {
  return (
    <div className={`relative ${className}`}>
      <div className="w-80 h-96 lg:w-96 lg:h-[500px] relative">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover rounded-2xl"
          priority
        />
        {/* Overlay for better text contrast if needed */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-full opacity-60 animate-pulse"></div>
      <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-accent rounded-full opacity-60 animate-pulse delay-1000"></div>
    </div>
  )
}
