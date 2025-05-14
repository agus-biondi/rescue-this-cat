"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"


interface CloudinaryVideoProps {
  publicId: string
  title: string
  className?: string
  autoplay?: boolean
  loop?: boolean
  muted?: boolean
  originalWidth: number
  originalHeight: number
  width: number
}

export function CloudinaryVideo({
  publicId,
  title,
  className,
  autoplay = true,
  loop = true,
  muted = true,
  originalWidth = 1080,
  originalHeight = 1440,
  width
}: CloudinaryVideoProps) {

  // Calculate aspect ratio from original dimensions
  const aspectRatio = originalWidth / originalHeight;

  // Calculate responsive sizes based on container width
  const getResponsiveSize = () => {

    return {
      width: width,
      height: Math.round(width / aspectRatio)
    }
  }

  const [videoSize] = useState(getResponsiveSize())


  // Build the video URL with optimization parameters
  const videoUrl = `https://player.cloudinary.com/embed/?cloud_name=dszhwrn7m&public_id=${publicId}&profile=beba&autoplay=${autoplay}&loop=${loop}&muted=${muted}&playsinline=true&bigPlayButton=true&autoPlayMode=always&preload=auto&vc_auto=true&crf=25&w_${videoSize.width},h_${videoSize.height}`

  return (
    <div 
      className={cn(
        "relative overflow-hidden rounded-md bg-white p-4 shadow-xl transform-3d",
        className
      )}
      style={{ 
        width: `${videoSize.width}px`,
      }}
    >
      <div className="relative" style={{ paddingBottom: `${(1 / aspectRatio) * 100}%` }}>
        <iframe
          src={videoUrl}
          allow="autoplay; encrypted-media; picture-in-picture"
          className={cn(
            "absolute inset-0 h-full w-full object-cover rounded-md transition-opacity duration-300"
          )}
          frameBorder="0"
        />
      </div>
      <h3 className="mt-4 text-center text-xl font-bold bg-gradient-to-r from-pink-500 via-lavender-500 to-teal-500 text-transparent bg-clip-text">
        {title}
      </h3>
    </div>
  )
} 