"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

// Define our breakpoints to match next.config.mjs
const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

type ContainerWidth = keyof typeof BREAKPOINTS | 'full'

interface CloudinaryImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  priority?: boolean
  quality?: number
  className?: string
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down"
  objectPosition?: string
  sizes?: string
  // New props for responsive handling
  fullWidth?: boolean
  containerWidth?: ContainerWidth
}

export function CloudinaryImage({
  src,
  alt,
  width = 800,
  height = 600,
  priority = false,
  quality = 85,
  className,
  objectFit = "cover",
  objectPosition = "center",
  sizes,
  fullWidth = false,
  containerWidth = 'lg',
}: CloudinaryImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  // Transform Cloudinary URL with our parameters
  const getTransformedUrl = () => {
    // If it's not a Cloudinary URL, return as is
    if (!src.includes('cloudinary.com')) return src

    // Extract the base URL and the rest of the path
    const [baseUrl, ...rest] = src.split('/upload/')
    if (rest.length === 0) return src

    // Build transformation string
    const transformations = [
      'f_auto', // Auto format
      `q_${quality}`, // Quality
      `w_${width}`, // Width
      `h_${height}`, // Height
      'c_fill', // Crop mode
    ]

    // Add object position if specified
    if (objectPosition !== 'center') {
      const [x, y] = objectPosition.split(' ')
      transformations.push(`g_${x}_${y}`)
    }

    // Reconstruct the URL with transformations
    return `${baseUrl}/upload/${transformations.join(',')}/${rest.join('/upload/')}`
  }

  // Calculate responsive sizes based on container width
  const getResponsiveSizes = () => {
    if (sizes) return sizes

    if (fullWidth || containerWidth === 'full') {
      return `(max-width: ${BREAKPOINTS.sm}px) 100vw,
              (max-width: ${BREAKPOINTS.md}px) 100vw,
              (max-width: ${BREAKPOINTS.lg}px) 100vw,
              (max-width: ${BREAKPOINTS.xl}px) 100vw,
              (max-width: ${BREAKPOINTS['2xl']}px) 100vw,
              100vw`
    }

    return `(max-width: ${BREAKPOINTS.sm}px) 100vw,
            (max-width: ${BREAKPOINTS.md}px) 100vw,
            (max-width: ${BREAKPOINTS.lg}px) 100vw,
            (max-width: ${BREAKPOINTS.xl}px) 100vw,
            (max-width: ${BREAKPOINTS['2xl']}px) 100vw,
            ${BREAKPOINTS[containerWidth]}px`
  }

  // Add preload link for priority images
  useEffect(() => {
    if (priority && typeof window !== "undefined") {
      const linkEl = document.createElement("link")
      linkEl.rel = "preload"
      linkEl.as = "image"
      linkEl.href = getTransformedUrl()
      document.head.appendChild(linkEl)

      return () => {
        document.head.removeChild(linkEl)
      }
    }
  }, [src, priority, width, height, quality, objectPosition])

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={getTransformedUrl()}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        quality={quality}
        sizes={getResponsiveSizes()}
        className={cn("transition-opacity duration-300", isLoaded ? "opacity-100" : "opacity-0", {
          "object-cover": objectFit === "cover",
          "object-contain": objectFit === "contain",
          "object-fill": objectFit === "fill",
          "object-none": objectFit === "none",
          "object-scale-down": objectFit === "scale-down",
        })}
        style={{ objectPosition }}
        onLoad={() => setIsLoaded(true)}
        loading={priority ? "eager" : "lazy"}
      />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-md">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-lavender-300 border-t-transparent"></div>
        </div>
      )}
    </div>
  )
}
