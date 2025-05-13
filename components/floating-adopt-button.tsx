"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Heart, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useUI } from "@/context/ui-context"

export default function FloatingAdoptButton() {
  const [isAtAdoptSection, setIsAtAdoptSection] = useState(false)
  const { isCardExpanded } = useUI()

  // Use a more relaxed intersection observer with a debounce
  useEffect(() => {
    const adoptSection = document.getElementById("adopt-section")
    let debounceTimer: NodeJS.Timeout

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      clearTimeout(debounceTimer)
      debounceTimer = setTimeout(() => {
        setIsAtAdoptSection(entries[0].isIntersecting)
      }, 100)
    }

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      threshold: 0.1, // Reduced threshold for smoother transitions
      rootMargin: "0px", // No margin to avoid jumps
    })

    if (adoptSection) {
      observer.observe(adoptSection)
    }

    return () => {
      clearTimeout(debounceTimer)
      if (adoptSection) {
        observer.unobserve(adoptSection)
      }
    }
  }, [])

  const scrollToAdoptSection = () => {
    const adoptSection = document.getElementById("adopt-section")
    if (adoptSection) {
      adoptSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <motion.div
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 scale-90 sm:scale-100 origin-bottom-right"
      initial={{ opacity: 1, y: 0 }}
      animate={{
        opacity: isAtAdoptSection || isCardExpanded ? 0 : 1,
        y: isAtAdoptSection || isCardExpanded ? 100 : 0,
        pointerEvents: isAtAdoptSection || isCardExpanded ? "none" : "auto",
      }}
      transition={{ duration: 0.3 }}
    >
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={scrollToAdoptSection}>
        <Button
          size="lg"
          className="bg-gradient-to-r from-pink-500 via-lavender-500 to-teal-500 hover:from-pink-600 hover:via-lavender-600 hover:to-teal-600 text-white rounded-full shadow-lg group text-sm sm:text-base"
        >
          <Heart className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
          <span className="sm:inline">Adopt Beba</span>
          <ChevronDown className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover:translate-y-1 flex-shrink-0" />
        </Button>
      </motion.div>
    </motion.div>
  )
}
