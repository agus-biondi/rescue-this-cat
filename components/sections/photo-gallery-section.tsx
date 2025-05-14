"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import AnimatedSectionHeader from "@/components/animated-section-header"
import { CloudinaryImage } from "@/components/cloudinary-image"
import { useImagePreloader } from "@/hooks/use-image-preloader"

export default function PhotoGallerySection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  // Extract all image URLs for preloading
  const imageSrcs = photos.map((photo) => photo.src)
  const { imagesPreloaded, loadedCount, totalCount } = useImagePreloader(isVisible ? imageSrcs : [])

  // Check if section is visible using IntersectionObserver
  useEffect(() => {
    if (!sectionRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
          // Once we've started loading, we can disconnect the observer
          observer.disconnect()
        }
      },
      { threshold: 0.1 }, // Start loading when 10% of the section is visible
    )

    observer.observe(sectionRef.current)

    return () => {
      observer.disconnect()
    }
  }, [])

  // Check if mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const nextSlide = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex === photos.length - 1 ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? photos.length - 1 : prevIndex - 1))
  }

  // Handle swipe gestures
  const handleDragEnd = (_e: MouseEvent | TouchEvent | PointerEvent, { offset, velocity }: { offset: { x: number }, velocity: { x: number } }) => {
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
    <section ref={sectionRef} className="w-full py-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-pink-100/30 to-lavender-100/30 -z-10"></div>

      <AnimatedSectionHeader
        title="Beba's Photo Album"
        subtitle="Swipe or use the arrows to browse through Beba's photos"
      />

      {/* Add loading progress indicator */}
      {isVisible && !imagesPreloaded && (
        <div className="flex flex-col items-center justify-center mb-4">
          <div className="w-full max-w-xs bg-gray-200 rounded-full h-2.5 mb-2">
            <div
              className="bg-gradient-to-r from-pink-500 via-lavender-500 to-teal-500 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${(loadedCount / totalCount) * 100}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600">
            Loading photos: {loadedCount}/{totalCount}
          </p>
        </div>
      )}

      <div className="relative w-full max-w-3xl mx-auto px-4 py-8">
        <div className="relative overflow-hidden rounded-xl bg-white/50 backdrop-blur-sm shadow-xl p-4 md:p-6 w-full">
          <div className="relative h-[450px] w-full flex justify-center">
            <AnimatePresence initial={false} custom={direction} mode="sync">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 180, damping: 25 },
                  opacity: { duration: 0.2 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.7}
                onDragEnd={handleDragEnd}
                className="absolute"
              >
                <InstantPhoto
                  src={photos[currentIndex].src}
                  alt={photos[currentIndex].alt}
                  title={photos[currentIndex].title}
                  rotate={photos[currentIndex].rotate || 0}
                  isPreloaded={imagesPreloaded}
                />
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
    </section>
  )
}

interface InstantPhotoProps {
  src: string
  alt: string
  title: string
  rotate?: number
  delay?: number
  isPreloaded?: boolean
}

function InstantPhoto({ src, alt, title, rotate = 0, delay = 0, isPreloaded = false }: InstantPhotoProps) {
  return (
    <motion.div
      className="relative min-h-96 w-80 overflow-hidden rounded-md bg-white p-4 shadow-xl transform-3d"
      initial={{ opacity: 1 }}
      transition={{ duration: 0.8, delay }}
      style={{ rotate: `${rotate}deg` }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 20px 30px rgba(0, 0, 0, 0.2)",
        transition: { duration: 0.3 },
      }}
    >
      <div className="relative h-80">
        <CloudinaryImage
          src={src}
          alt={alt}
          width={320}
          height={320}
          className="h-full w-full rounded-md"
          priority={isPreloaded} // Use priority when images are preloaded
        />
      </div>
      <h3 className="mt-4 text-center text-xl font-bold bg-gradient-to-r from-pink-500 via-lavender-500 to-teal-500 text-transparent bg-clip-text">
        {title}
      </h3>
    </motion.div>
  )
}

const photos = [
  {
    src: "https://res.cloudinary.com/dszhwrn7m/image/upload/f_auto,q_auto,w_400/v1747091094/looking_j2takz",
    alt: "Beba looking curiously",
    title: "Hello there!",
    rotate: 2,
  },
  {
    src: "https://res.cloudinary.com/dszhwrn7m/image/upload/f_auto,q_auto,w_400/v1747091139/yawning_qyqgvb.jpg",
    alt: "Beba yawning",
    title: "Big Yawn",
    rotate: -3,
  },
  {
    src: "https://res.cloudinary.com/dszhwrn7m/image/upload/f_auto,q_auto,w_400/v1747091097/sitting_y71lnp",
    alt: "Beba sitting and looking at the camera",
    title: "Sitting Pretty",
    rotate: 2,
  },
  {
    src: "https://res.cloudinary.com/dszhwrn7m/image/upload/f_auto,q_auto,w_400/v1747091094/crouching_thsxmx",
    alt: "Beba crouching",
    title: "Ready to Pounce",
    rotate: -2,
  },
  {
    src: "https://res.cloudinary.com/dszhwrn7m/image/upload/f_auto,q_auto,w_400/v1747091093/cone_i0idh0",
    alt: "Beba wearing a cone after surgery",
    title: "Post-Surgery Chic",
    rotate: 3,
  },
  {
    src: "https://res.cloudinary.com/dszhwrn7m/image/upload/f_auto,q_auto,w_400/v1747091092/walking_jmpslf",
    alt: "Beba walking",
    title: "On the Move",
    rotate: -1,
  },
]
