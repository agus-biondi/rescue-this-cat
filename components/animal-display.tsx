"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import type { Animal } from "@/lib/types"
import TimeInShelterDisplay from "./time-in-shelter-display"
import AnimatedTextReveal from "./animated-text-reveal"

interface AnimalDisplayProps {
  animal: Animal
}

const photoVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.8 + i * 0.2,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
}

export default function AnimalDisplay({ animal }: AnimalDisplayProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-between p-4 sm:p-6 md:p-8">
      <AnimatedTextReveal
        key={`${animal.id}-name`}
        text={animal.name}
        className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 dark:text-slate-50 pt-8"
        delay={0.1}
      />

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8 w-full sm:w-4/5 md:w-3/4 lg:w-2/3 h-full flex-grow my-4">
        {[animal.photos[0], animal.photos[1]].map((photo, index) => (
          <motion.div
            key={`${animal.id}-photo-${index}`}
            className="flex flex-col items-center w-full sm:w-1/2 h-full"
            variants={photoVariants}
            initial="hidden"
            animate="visible"
            custom={index}
          >
            <div className="relative w-full h-full rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={photo.url || "/placeholder.svg"}
                alt={`${animal.name} - Photo ${index + 1}`}
                layout="fill"
                objectFit="cover"
                priority={index === 0}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="pb-8">
        <TimeInShelterDisplay intakeDate={animal.intakeDate} />
      </div>
    </div>
  )
}
