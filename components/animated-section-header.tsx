"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface AnimatedSectionHeaderProps {
  title: string
  subtitle?: string | ReactNode
  icon?: ReactNode
  className?: string
}

export default function AnimatedSectionHeader({ title, subtitle, icon, className = "" }: AnimatedSectionHeaderProps) {
  return (
    <motion.div
      className={`text-center mb-8 ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.7,
        type: "spring",
        stiffness: 100,
        damping: 20,
      }}
    >
      {icon && (
        <motion.div
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-lavender-400 to-pink-400 mb-4 shadow-lg"
          initial={{ scale: 0.9, rotate: 0 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            delay: 0.2,
            duration: 0.5,
            type: "spring",
            stiffness: 150,
            damping: 15,
          }}
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          {icon}
        </motion.div>
      )}

      <motion.h2
        className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-pink-500 via-lavender-500 to-teal-500 text-transparent bg-clip-text"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ delay: icon ? 0.3 : 0, duration: 0.6 }}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.div
          className="text-lg text-gray-700 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: icon ? 0.4 : 0.1, duration: 0.6 }}
        >
          {subtitle}
        </motion.div>
      )}
    </motion.div>
  )
}
