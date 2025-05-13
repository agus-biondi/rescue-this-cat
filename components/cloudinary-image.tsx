"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

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
}

export function CloudinaryImage({
  src,
  alt,
  width = 800,
  height = 600,
  priority = false,
  quality = 90,
  className,
  objectFit = "cover",
  objectPosition = "center",
  sizes = "(max-width: 768px) 100vw, 50vw",
}: CloudinaryImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  // Ensure the URL has the right parameters for optimization
  const optimizedSrc = src.includes("?") ? `${src}&q=${quality}&f=auto` : `${src}?q=${quality}&f=auto`

  // Add preload link for priority images
  useEffect(() => {
    if (priority && typeof window !== "undefined") {
      const linkEl = document.createElement("link")
      linkEl.rel = "preload"
      linkEl.as = "image"
      linkEl.href = optimizedSrc
      document.head.appendChild(linkEl)

      return () => {
        document.head.removeChild(linkEl)
      }
    }
  }, [optimizedSrc, priority])

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={optimizedSrc || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        quality={quality}
        sizes={sizes}
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
