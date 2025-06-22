"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface Star {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  duration: number
  delay: number
}

interface StarfieldProps {
  starCount?: number
}

const generateStars = (count: number): Star[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 1.5 + 0.5,
    opacity: Math.random() * 0.5 + 0.2,
    duration: Math.random() * 5 + 5, // 5 to 10 seconds
    delay: Math.random() * 5, // 0 to 5 seconds
  }))
}

export default function Starfield({ starCount = 100 }: StarfieldProps) {
  const [stars, setStars] = useState<Star[]>([])

  useEffect(() => {
    setStars(generateStars(starCount))
  }, [starCount])

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          initial={{
            top: `${star.y}%`,
            left: `${star.x}%`,
          }}
          animate={{
            x: [0, Math.random() * 10 - 5, 0],
            y: [0, Math.random() * 10 - 5, 0],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: star.delay,
          }}
          style={{
            position: "absolute",
            width: `${star.size}px`,
            height: `${star.size}px`,
            borderRadius: "50%",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            opacity: star.opacity,
          }}
        />
      ))}
    </div>
  )
} 