"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useRef, useState, useEffect } from "react"

interface StyledPhotoProps {
  src: string
  alt: string
  title: string
  className?: string
  rotate?: number
  isVideo?: boolean
  hideControls?: boolean
}

export function StyledPhoto({
  src,
  alt,
  title,
  className,
  rotate = 0,
  isVideo = false,
  hideControls = false,
}: StyledPhotoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (isVideo && videoRef.current) {
      videoRef.current.addEventListener("loadeddata", () => {
        setIsLoaded(true)
      })
    }
  }, [isVideo])

  return (
    <motion.div
      className={cn("relative min-h-96 w-80 overflow-hidden rounded-md bg-white p-4 shadow-xl transform-3d", className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      style={{ rotate: `${rotate}deg` }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 20px 30px rgba(0, 0, 0, 0.2)",
        transition: { duration: 0.3 },
      }}
    >
      <div className="relative h-80">
        {isVideo ? (
          <video
            ref={videoRef}
            src={src}
            autoPlay
            muted
            loop
            playsInline
            controls={!hideControls}
            className={cn(
              "h-full w-full object-cover rounded-md transition-opacity duration-300",
              isLoaded ? "opacity-100" : "opacity-0",
            )}
          />
        ) : (
          <Image
            src={src || "/placeholder.svg"}
            alt={alt}
            width={320}
            height={320}
            className="h-full w-full object-cover rounded-md"
          />
        )}
      </div>
      <h3 className="mt-4 text-center text-xl font-bold bg-gradient-to-r from-pink-500 via-lavender-500 to-teal-500 text-transparent bg-clip-text">
        {title}
      </h3>
    </motion.div>
  )
}
