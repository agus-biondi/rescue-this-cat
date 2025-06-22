"use client"

import { motion } from "framer-motion"

interface AnimatedTextRevealProps {
  text: string
  className?: string
  delay?: number
}

const textVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

export default function AnimatedTextReveal({ text, className, delay = 0 }: AnimatedTextRevealProps) {
  return (
    <motion.div className={className} variants={textVariants} initial="hidden" animate="visible" transition={{ delay }}>
      {text}
    </motion.div>
  )
}
