"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { useEffect, useState } from "react"

export default function ScrollDownArrow() {
  const [hasScrolled, setHasScrolled] = useState(false)

  // Use a more relaxed scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setHasScrolled(true)
      } else {
        setHasScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.div
      className="fixed bottom-8 left-8 z-50 pointer-events-none"
      initial={{ opacity: 1 }}
      animate={{
        opacity: hasScrolled ? 0 : 1,
        y: hasScrolled ? 20 : 0,
      }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="bg-black/20 backdrop-blur-sm p-3 rounded-full"
        animate={{
          y: [0, 10, 0],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 1.5,
        }}
      >
        <ChevronDown className="w-10 h-10 text-white drop-shadow-lg" />
      </motion.div>
    </motion.div>
  )
}
