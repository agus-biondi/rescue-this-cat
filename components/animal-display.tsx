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
    <div className="w-full h-full flex flex-col items-center justify-center p-2 md:p-4 text-center">
      <AnimatedTextReveal
        key={`${animal.id}-name`}
        text={animal.name}
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-2 md:mb-4"
        delay={0.1}
      />

      <div className="flex flex-col sm:flex-row items-center justify-around gap-2 md:gap-4 mb-2 md:mb-4 w-full max-w-3xl">
        {[animal.photos[0], animal.photos[1]].map((photo, index) => (
          <motion.div
            key={`${animal.id}-photo-${index}`}
            className="flex flex-col items-center w-full sm:w-1/2"
            variants={photoVariants}
            initial="hidden"
            animate="visible"
            custom={index}
          >
            <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
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

      <TimeInShelterDisplay intakeDate={animal.intakeDate} />
    </div>
  )
}
