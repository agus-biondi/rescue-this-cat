"use client"

import { motion } from "framer-motion"

interface ColorfulAnimalNameProps {
  name: string
  className?: string
}

const sentence = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
}

const letter = {
  hidden: { opacity: 0, y: 20, rotate: -15, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    scale: 1,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 150,
    },
  },
}

export default function ColorfulAnimalName({
  name,
  className,
}: ColorfulAnimalNameProps) {
  return (
    <motion.h1
      className={className}
      variants={sentence}
      initial="hidden"
      animate="visible"
      aria-label={name}
    >
      {name.split("").map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          variants={letter}
          style={{ display: "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.h1>
  )
} 