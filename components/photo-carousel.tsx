"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface Photo {
  title: string
  image: string
  description?: string
}

export default function PhotoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Check if mobile on mount and update carousel width
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const photos: Photo[] = [
    {
      title: "Playful Beba",
      image: "/beba-scratching-post.jpeg",
      description: "Beba enjoying her scratching post, showing her playful side",
    },
    {
      title: "Nap Time",
      image: "/beba-closeup.jpeg",
      description: "A peaceful moment during one of Beba's many naps",
    },
    {
      title: "Window Watching",
      image: "/beba-standing.jpeg",
      description: "Beba loves to watch the world go by from her window perch",
    },
    {
      title: "Curious Explorer",
      image: "/beba-cone.jpeg",
      description: "Even with a cone, Beba's curiosity can't be contained",
    },
    {
      title: "Surgeries Don't Slow Her Down",
      image: "/beba-playing-toy.jpeg",
      description: "Despite her surgeries, Beba still loves to play with her toys",
    },
  ]

  const nextSlide = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex === photos.length - 1 ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? photos.length - 1 : prevIndex - 1))
  }

  // Handle swipe gestures
  const handleDragEnd = (e, { offset, velocity }) => {
    const swipeThreshold = 50
    if (offset.x < -swipeThreshold && velocity.x < -0.3) {
      nextSlide()
    } else if (offset.x > swipeThreshold && velocity.x > 0.3) {
      prevSlide()
    }
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
  }

  return (
    <div className="relative w-full max-w-3xl mx-auto px-4 py-8 overflow-hidden">
      <div
        ref={carouselRef}
        className="relative overflow-hidden rounded-xl bg-white/50 backdrop-blur-sm shadow-xl p-4 md:p-6 w-full"
      >
        <div className="relative h-[400px] md:h-[500px] w-full">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.7}
              onDragEnd={handleDragEnd}
              className="absolute inset-0 flex flex-col"
            >
              <div className="relative flex-1 rounded-lg overflow-hidden">
                <Image
                  src={photos[currentIndex].image || "/placeholder.svg"}
                  alt={photos[currentIndex].title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 700px"
                  priority
                />
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-pink-500 via-lavender-500 to-teal-500 text-transparent bg-clip-text">
                  {photos[currentIndex].title}
                </h3>
                {photos[currentIndex].description && (
                  <p className="mt-2 text-gray-700 text-sm md:text-base">{photos[currentIndex].description}</p>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation buttons */}
        <Button
          onClick={prevSlide}
          size="icon"
          variant="outline"
          className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white z-10"
        >
          <ChevronLeft className="h-6 w-6" />
          <span className="sr-only">Previous photo</span>
        </Button>

        <Button
          onClick={nextSlide}
          size="icon"
          variant="outline"
          className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white z-10"
        >
          <ChevronRight className="h-6 w-6" />
          <span className="sr-only">Next photo</span>
        </Button>

        {/* Dots indicator */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {photos.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1)
                setCurrentIndex(index)
              }}
              className={`h-2.5 w-2.5 rounded-full transition-colors ${
                currentIndex === index ? "bg-gradient-to-r from-pink-500 via-lavender-500 to-teal-500" : "bg-gray-300"
              }`}
              aria-label={`Go to photo ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Swipe hint for mobile */}
      {isMobile && (
        <div className="text-center mt-4 text-gray-500 text-sm">
          <p>Swipe left or right to see more photos</p>
        </div>
      )}
    </div>
  )
}
