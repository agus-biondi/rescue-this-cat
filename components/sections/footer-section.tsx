"use client"

import { motion } from "framer-motion"
import { PawPrintIcon as Paw } from "lucide-react"

export default function FooterSection() {
  return (
    <footer className="w-full py-6 px-4 bg-gradient-to-r from-lavender-100 via-pink-100 to-teal-100 text-center text-gray-600 text-sm relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p>© {new Date().getFullYear()} Agustin Biondi. All rights reserved.</p>
        <p className="mt-2">
          Vibe Coded with ❤️ for Beba on{" "}
          <a
            href="https://v0.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lavender-600 hover:text-pink-600 hover:underline transition-colors"
          >
            v0.dev
          </a>
        </p>

        <div className="flex justify-center space-x-4 mt-4">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
            >
              <Paw className="w-5 h-5 text-pink-400" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </footer>
  )
}
