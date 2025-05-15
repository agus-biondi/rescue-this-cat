"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, ExternalLink, MapPin, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import AnimatedSectionHeader from "@/components/animated-section-header"
import ConfettiExplosion from "@/components/confetti-explosion"
import { track } from "@vercel/analytics"

export default function AdoptSection() {
  const [isConfettiActive, setIsConfettiActive] = useState(false)
  const email = "agustin.biondi@gmail.com"
  const adoptLink = "https://toolkit.rescuegroups.org/of/f?c=VFVCZFBD"
  const ufarLink = "https://ufarescue.org/"
  const mapsLink = "https://maps.app.goo.gl/gYEsJicezpMz6nHN9"

  const handleAdoptClick = () => {
    track('CTA_Clicked', { label: 'Adopt Beba' });
    // Just trigger the confetti without preventing default behavior
    setIsConfettiActive(true)

    // Set a timeout to hide the confetti after animation completes
    setTimeout(() => {
      setIsConfettiActive(false)
    }, 1200)
  }

  return (
    <section id="adopt-section" className="w-full py-8 px-4 md:px-8 relative scroll-mt-24">
      {/* Confetti animation */}
      <AnimatePresence>{isConfettiActive && <ConfettiExplosion count={100} duration={1200} />}</AnimatePresence>

      {/* Colorful background */}
      <div className="absolute inset-0 bg-gradient-to-b from-teal-100/30 to-pink-100/30 -z-10"></div>

      <motion.div
        className="max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{
          duration: 0.8,
          type: "spring",
        }}
      >
        <motion.div
          className="mb-6 overflow-hidden rounded-2xl"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          style={{
            boxShadow: "0 20px 40px -10px rgba(124, 58, 237, 0.4)",
            borderRadius: "1rem",
            overflow: "hidden",
          }}
        ></motion.div>

        <AnimatedSectionHeader title="Want to Meet Her?" className="mb-6" />

        <motion.div
          className="mb-6 leading-relaxed space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <p className="text-sm text-gray-600">
            We're working with{" "}
            <a
              href={ufarLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lavender-600 hover:text-pink-600 hover:underline transition-colors font-medium inline-flex items-center"
            >
              UFAR <ExternalLink className="ml-1 h-3 w-3" />
            </a>{" "}
            (United for Animals Rescue) to find Beba a home.
          </p>

          <div className="flex flex-col items-center justify-center gap-2 my-2 text-sm text-gray-600">
            <div className="flex items-center">
              <Home className="h-4 w-4 mr-1.5 text-lavender-500" />
              <span>Currently with foster parents in Coral Springs</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1.5 text-pink-500" />
              <a
                href={mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-pink-600 hover:underline transition-colors inline-flex items-center"
              >
                Rescue located in Margate
                <ExternalLink className="ml-1 h-3 w-3 opacity-70" />
              </a>
            </div>
          </div>

          <p className="text-sm text-gray-600">
            If you're interested in adopting Beba, please fill out an adoption application using the button below.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <a
              href={adoptLink}
              onClick={handleAdoptClick}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-pink-500 via-lavender-500 to-teal-500 hover:from-pink-600 hover:via-lavender-600 hover:to-teal-600 text-white px-4 sm:px-8 py-4 sm:py-6 text-base sm:text-xl rounded-full shadow-lg w-full sm:w-auto"
              >
                <Heart className="mr-2 h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0" />
                <span className="whitespace-normal text-center">Fill Out Adoption Application</span>
              </Button>
            </a>
          </motion.div>

          <motion.p
            className="mt-4 text-sm text-gray-600 bg-white/70 backdrop-blur-sm p-3 rounded-lg max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <strong>Note:</strong> Beba's name might not appear in the dropdown menu on the form. Please mention her in
            the comments section of the application.
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-6 text-gray-600 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <p>
            Any other questions? Contact us at{" "}
            <a
              href={`mailto:${email}`}
              className="text-lavender-600 hover:text-pink-600 hover:underline transition-colors"
            >
              {email}
            </a>
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}
