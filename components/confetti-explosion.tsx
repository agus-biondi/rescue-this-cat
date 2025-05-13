"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface ConfettiPiece {
  id: number
  x: number
  y: number
  rotation: number
  scale: number
  color: string
}

interface ConfettiExplosionProps {
  count?: number
  duration?: number
  onComplete?: () => void
}

export default function ConfettiExplosion({ count = 50, duration = 1500, onComplete }: ConfettiExplosionProps) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([])
  const [isAnimating, setIsAnimating] = useState(true)

  useEffect(() => {
    // Generate confetti pieces
    const newPieces: ConfettiPiece[] = []
    const colors = [
      "#ec4899", // pink-500
      "#8b5cf6", // lavender-500
      "#14b8a6", // teal-500
      "#f59e0b", // amber-500
    ]

    for (let i = 0; i < count; i++) {
      newPieces.push({
        id: i,
        x: Math.random() * 400 - 200, // -200 to 200
        y: Math.random() * -300 - 100, // -400 to -100 (upward)
        rotation: Math.random() * 360,
        scale: Math.random() * 0.6 + 0.4, // 0.4 to 1
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }
    setPieces(newPieces)

    // Set timeout to call onComplete
    const timer = setTimeout(() => {
      setIsAnimating(false)
      if (onComplete) {
        onComplete()
      }
    }, duration)

    return () => clearTimeout(timer)
  }, [count, duration, onComplete])

  if (!isAnimating) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute"
          initial={{
            x: 0,
            y: 0,
            scale: 0,
            rotate: 0,
            opacity: 1,
          }}
          animate={{
            x: piece.x,
            y: piece.y,
            scale: piece.scale,
            rotate: piece.rotation,
            opacity: 0,
          }}
          transition={{
            duration: duration / 1000,
            ease: [0.1, 0.4, 0.7, 1],
          }}
        >
          {/* Heart shape for confetti */}
          {Math.random() > 0.5 ? (
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M7.5 13.5L1.5 7.5C-0.5 5.5 -0.5 2.5 1.5 0.5C3.5 -1.5 6.5 -1.5 8.5 0.5L7.5 1.5L6.5 0.5C4.5 -1.5 1.5 -1.5 -0.5 0.5C-2.5 2.5 -2.5 5.5 -0.5 7.5L5.5 13.5C6.3 14.3 7.7 14.3 8.5 13.5L14.5 7.5C16.5 5.5 16.5 2.5 14.5 0.5C12.5 -1.5 9.5 -1.5 7.5 0.5L6.5 1.5L7.5 0.5C9.5 -1.5 12.5 -1.5 14.5 0.5C16.5 2.5 16.5 5.5 14.5 7.5L8.5 13.5C7.7 14.3 6.3 14.3 5.5 13.5L7.5 13.5Z"
                fill={piece.color}
              />
            </svg>
          ) : (
            <div
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: piece.color, transform: `rotate(${Math.random() * 45}deg)` }}
            ></div>
          )}
        </motion.div>
      ))}
    </div>
  )
}
