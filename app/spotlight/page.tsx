"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { animals } from "@/lib/animal-data"
import AnimalDisplay from "@/components/animal-display"
import { wrap } from "@/lib/utils"

const variants = {
  enter: (direction: number) => ({
    x:
      direction > 0
        ? typeof window !== "undefined"
          ? window.innerWidth
          : 1000
        : typeof window !== "undefined"
          ? -window.innerWidth
          : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x:
      direction < 0
        ? typeof window !== "undefined"
          ? window.innerWidth
          : 1000
        : typeof window !== "undefined"
          ? -window.innerWidth
          : -1000,
    opacity: 0,
  }),
}

const swipeConfidenceThreshold = 10000
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity
}

export default function AnimalShelterPage() {
  const [[page, direction], setPage] = useState([0, 0])
  const animalIndex = wrap(0, animals.length, page)

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection])
  }

  const AUTO_ADVANCE_INTERVAL = 15000

  useEffect(() => {
    if (animals.length === 0) return
    const timer = setTimeout(() => {
      paginate(1)
    }, AUTO_ADVANCE_INTERVAL)
    return () => clearTimeout(timer)
  }, [page, animals.length])

  if (!animals || animals.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-100">
        No animal data available.
      </div>
    )
  }

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden select-none bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={page}
          className="absolute w-full h-full top-0 left-0 flex items-center justify-center"
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.5}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x)
            if (swipe < -swipeConfidenceThreshold) {
              paginate(1)
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1)
            }
          }}
        >
          <AnimalDisplay animal={animals[animalIndex]} />
        </motion.div>
      </AnimatePresence>
    </main>
  )
}
