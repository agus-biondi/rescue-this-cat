"use client"
import { cn } from "@/lib/utils"
import type React from "react"
import { useRef, useState, useEffect } from "react"
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
  useVelocity,
  useAnimationControls,
} from "framer-motion"

export const DraggableCardBody = ({
  className,
  children,
  size = "default",
}: {
  className?: string
  children?: React.ReactNode
  size?: "small" | "default"
}) => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const cardRef = useRef<HTMLDivElement>(null)
  const controls = useAnimationControls()
  const [constraints, setConstraints] = useState({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  })
  const [isMobile, setIsMobile] = useState(false)

  // physics biatch
  const velocityX = useVelocity(mouseX)
  const velocityY = useVelocity(mouseY)

  const springConfig = {
    stiffness: 100,
    damping: 20,
    mass: 0.5,
  }

  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [25, -25]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-25, 25]), springConfig)

  const opacity = useSpring(useTransform(mouseX, [-300, 0, 300], [0.8, 1, 0.8]), springConfig)

  const glareOpacity = useSpring(useTransform(mouseX, [-300, 0, 300], [0.2, 0, 0.2]), springConfig)

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    // Update constraints when component mounts or window resizes
    const updateConstraints = () => {
      if (typeof window !== "undefined") {
        // Use tighter constraints on mobile
        const multiplier = window.innerWidth < 640 ? 0.3 : 0.5
        setConstraints({
          top: -window.innerHeight * multiplier,
          left: -window.innerWidth * multiplier,
          right: window.innerWidth * multiplier,
          bottom: window.innerHeight * multiplier,
        })
      }
    }

    updateConstraints()

    // Add resize listener
    window.addEventListener("resize", updateConstraints)

    // Clean up
    return () => {
      window.removeEventListener("resize", updateConstraints)
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  // Optimize the DraggableCardBody component to reduce interference with scrolling

  // Add will-change-transform to optimize animations
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Skip effect on mobile
    if (isMobile) return

    const { clientX, clientY } = e
    const { width, height, left, top } = cardRef.current?.getBoundingClientRect() ?? {
      width: 0,
      height: 0,
      left: 0,
      top: 0,
    }
    const centerX = left + width / 2
    const centerY = top + height / 2
    const deltaX = clientX - centerX
    const deltaY = clientY - centerY
    mouseX.set(deltaX)
    mouseY.set(deltaY)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    controls.start({
      rotateX: 0,
      rotateY: 0,
      transition: {
        type: "spring",
        ...springConfig,
      },
    })
  }

  // Reduce drag elasticity and power to make dragging less intensive
  return (
    <motion.div
      ref={cardRef}
      drag
      dragConstraints={constraints}
      dragElastic={0.05} // Reduce elasticity for better control
      dragTransition={{
        power: 0.1, // Reduce power for easier dragging
        timeConstant: 300,
      }}
      onDragStart={() => {
        document.body.style.cursor = "grabbing"
      }}
      onDragEnd={(event, info) => {
        document.body.style.cursor = "default"

        controls.start({
          rotateX: 0,
          rotateY: 0,
          transition: {
            type: "spring",
            ...springConfig,
          },
        })

        // Bounce effect using spring physics
        const bounceMultiplier = isMobile ? 0.05 : 0.1
        const currentVelocityX = velocityX.get()
        const currentVelocityY = velocityY.get()

        const velocityMagnitude = Math.sqrt(currentVelocityX * currentVelocityX + currentVelocityY * currentVelocityY)
        const bounce = Math.min(0.5, velocityMagnitude / 2000)

        animate(info.point.x, info.point.x + currentVelocityX * bounceMultiplier, {
          duration: 0.5,
          ease: [0.2, 0, 0, 1],
          bounce,
          type: "spring",
          stiffness: 40,
          damping: 20,
          mass: 1,
        })

        animate(info.point.y, info.point.y + currentVelocityY * bounceMultiplier, {
          duration: 0.5,
          ease: [0.2, 0, 0, 1],
          bounce,
          type: "spring",
          stiffness: 40,
          damping: 20,
          mass: 1,
        })
      }}
      style={{
        rotateX: isMobile ? 0 : rotateX,
        rotateY: isMobile ? 0 : rotateY,
        opacity,
        willChange: "transform",
      }}
      animate={controls}
      whileHover={{ scale: 1.02 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative overflow-hidden rounded-md bg-neutral-100 p-3 sm:p-4 shadow-xl transform-3d dark:bg-neutral-900 will-change-transform",
        size === "small" ? "min-h-64 w-56 sm:min-h-72 sm:w-64" : "min-h-72 sm:min-h-96 w-64 sm:w-80",
        className,
      )}
    >
      {children}
      <motion.div
        style={{
          opacity: glareOpacity,
        }}
        className="pointer-events-none absolute inset-0 bg-white select-none"
      />
    </motion.div>
  )
}

export const DraggableCardContainer = ({
  className,
  children,
  style,
}: {
  className?: string
  children?: React.ReactNode
  style?: React.CSSProperties
}) => {
  return (
    <div className={cn("[perspective:3000px]", className)} style={style}>
      {children}
    </div>
  )
}
