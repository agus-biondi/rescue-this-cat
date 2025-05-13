"use client"

import { motion } from "framer-motion"
import Image from "next/image"

// Simplify props to not require motion values
interface HeroSectionProps {
  opacity?: number
  scale?: number
}

export default function HeroSection({ opacity = 1, scale = 1 }: HeroSectionProps) {
  return (
    <section
      className="relative w-full h-screen 
                flex flex-col  
                md:flex-row 
                overflow-hidden"
    >
      {/* Background gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-lavender-500/10 
                via-pink-500/5 to-teal-500/10 z-10"
      ></div>

      {/* Image container - full width on mobile, half width on md+ */}
      <motion.div
        className="relative w-full h-full md:w-1/2 z-0"
        initial={{ opacity: 0, scale: 0.95, filter: "brightness(0.9)" }}
        animate={{ opacity: 1, scale: 1, filter: "brightness(1)" }}
        transition={{ duration: 2 }}
      >
        <div className="relative w-full h-full">
          <Image
            src="https://res.cloudinary.com/dszhwrn7m/image/upload/f_auto,q_auto,c_fill,w_900,h_1200/v1747063235/PXL_20250511_012003016.MP_2_nfohzl"
            fill
            className="object-cover object-top"
            sizes="(max-width: 1023px) 100vw, 50vw"
            priority
            alt="Beba the cat"
          />
          {/* Gradient overlay for better text visibility on mobile */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent md:hidden"></div>
        </div>
      </motion.div>

      {/* Text content - absolute on mobile, static on md+ */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center px-4 text-center z-20 translate-y-[-10%]
          md:static md:flex md:items-center md:justify-start md:w-1/2 md:p-16 md:text-left md:translate-y-0"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.5,
          duration: 1,
          type: "spring",
          stiffness: 100,
        }}
      >
        {/* Enhanced title with colorful gradient and better visibility */}
        <div className="bg-black/40 backdrop-blur-sm p-6 rounded-xl shadow-xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-pink-400 via-lavender-300 to-teal-400 text-transparent bg-clip-text drop-shadow-[0_2px_2px_rgba(1,1,1,0.8)]">
            Meet Beba
          </h1>
          <p className="text-xl font-medium bg-gradient-to-r from-amber-200 via-pink-200 to-lavender-200 text-transparent bg-clip-text drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
            Scarred but unbroken, she's ready to find a permanent home
          </p>
        </div>
      </motion.div>
    </section>
  )
}
