'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react'
import { fadeInUp, staggerContainer, modalContent, imageHover } from '@/lib/animations'
import { ProjectImage } from '@/types/project'

interface ImageGalleryProps {
  images: ProjectImage[]
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  if (!images || images.length === 0) return null

  const handlePrevious = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setSelectedImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index)
    setIsOpen(true)
  }

  return (
    <motion.section
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.2 }}
      className="py-16 md:py-24 bg-muted/30"
    >
      <div className="container">
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Visual Showcase
          </h2>
          <p className="text-muted-foreground text-lg">
            Explore the project in detail
          </p>
        </motion.div>

        {/* Main Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="group relative aspect-video overflow-hidden rounded-xl cursor-pointer bg-muted"
              onClick={() => handleImageClick(index)}
            >
              <motion.div
                variants={imageHover}
                initial="rest"
                whileHover="hover"
                className="relative w-full h-full"
              >
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                />
              </motion.div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm">
                    <Maximize2 className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              {/* Caption */}
              {image.caption && (
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-sm">{image.caption}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Lightbox Dialog */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="max-w-7xl w-full p-0 bg-black/95 border-none">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedImageIndex}
                variants={modalContent}
                initial="initial"
                animate="animate"
                exit="exit"
                className="relative"
              >
                {/* Close Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 z-50 text-white hover:bg-white/20"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="w-6 h-6" />
                </Button>

                {/* Main Image */}
                <div className="relative w-full h-[80vh]">
                  <Image
                    src={images[selectedImageIndex].url}
                    alt={images[selectedImageIndex].alt}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    quality={95}
                    priority
                  />
                </div>

                {/* Navigation Buttons */}
                {images.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                      onClick={handlePrevious}
                    >
                      <ChevronLeft className="w-8 h-8" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                      onClick={handleNext}
                    >
                      <ChevronRight className="w-8 h-8" />
                    </Button>
                  </>
                )}

                {/* Image Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="container">
                    {images[selectedImageIndex].caption && (
                      <p className="text-white text-lg mb-2">
                        {images[selectedImageIndex].caption}
                      </p>
                    )}
                    <p className="text-white/60 text-sm">
                      {selectedImageIndex + 1} / {images.length}
                    </p>
                  </div>
                </div>

                {/* Thumbnail Navigation */}
                {images.length > 1 && (
                  <div className="absolute bottom-20 left-0 right-0">
                    <div className="container">
                      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        {images.map((image, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedImageIndex(index)}
                            className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all ${
                              index === selectedImageIndex
                                ? 'ring-2 ring-accent ring-offset-2 ring-offset-black'
                                : 'opacity-50 hover:opacity-100'
                            }`}
                          >
                            <Image
                              src={image.url}
                              alt={image.alt}
                              fill
                              className="object-cover"
                              sizes="80px"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </DialogContent>
        </Dialog>
      </div>
    </motion.section>
  )
}
