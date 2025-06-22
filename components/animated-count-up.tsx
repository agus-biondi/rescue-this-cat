"use client"

import { useEffect } from "react"
import { motion, useMotionValue, useTransform, animate } from "framer-motion"

interface AnimatedCountUpProps {
  toValue: number
  duration?: number
  delay?: number
  className?: string
}

export default function AnimatedCountUp({
  toValue,
  duration = 2.5, // Reduced default duration since we have multiple counters
  delay = 1.4,
  className,
}: AnimatedCountUpProps) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest))

  useEffect(() => {
    const animationTimeout = setTimeout(() => {
      const controls = animate(count, toValue, {
        duration: duration,
        ease: "easeOut",
      })
    }, delay * 1000)

    return () => clearTimeout(animationTimeout)
  }, [toValue, duration, delay, count])

  return <motion.span className={className}>{rounded}</motion.span>
}
