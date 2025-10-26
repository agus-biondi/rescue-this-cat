"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import type { Animal } from "@/lib/types"
import TimeInShelterDisplay from "./time-in-shelter-display"
import ColorfulAnimalName from "./colorful-animal-name"

interface AnimalDisplayProps {
  animal: Animal
}

const getObjectPositionValue = (
  position?: "top" | "center" | "bottom" | "1/4" | "3/4"
): string => {
  switch (position) {
    case "top":
      return "top"
    case "1/4":
      return "center 25%"
    case "3/4":
      return "center 75%"
    case "bottom":
      return "bottom"
    case "center":
    default:
      return "center"
  }
}

const photoVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.4 + i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
}

export default function AnimalDisplay({ animal }: AnimalDisplayProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-between p-4 sm:p-6 md:p-8">
      <ColorfulAnimalName
        key={`${animal.id}-name`}
        name={animal.name}
        className="text-4xl sm:text-5xl md:text-6xl font-bold pt-8 text-slate-900 dark:text-white"
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
                objectPosition={getObjectPositionValue(photo.objectPosition)}
                priority={index === 0}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="pb-8 flex flex-col items-center gap-4">
        <TimeInShelterDisplay intakeDate={animal.intakeDate} />
        {animal.notes && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="text-center max-w-md px-4"
          >
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-lg px-4 py-2 shadow-sm">
              {animal.notes}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
