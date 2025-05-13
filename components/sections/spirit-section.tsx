"use client"

import { motion } from "framer-motion"
import AnimatedSectionHeader from "@/components/animated-section-header"

export default function SpiritSection() {
  return (
    <section className="w-full py-8 px-4 md:px-8 max-w-4xl mx-auto relative">
      <AnimatedSectionHeader title="A New Lease on Life" />

      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{
          duration: 0.8,
          type: "spring",
        }}
      >
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          What makes Beba truly remarkable isn't just her survival, it's her spirit. She can be shy at first,but despite everything, she's
          affectionate, curious, and playful. After two surgeries and months of care, Beba is now ready for her forever
          home.
        </p>

        {/* Video embed in the Her Spirit section */}
        <div className="flex justify-center items-center my-8">
          <motion.div
            className="relative w-80 overflow-hidden rounded-md bg-white p-4 shadow-xl transform-3d"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            style={{ rotate: `-2deg` }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 30px rgba(0, 0, 0, 0.2)",
              transition: { duration: 0.3 },
            }}
          >
            <div className="relative w-full" style={{ aspectRatio: "3/4" }}>
              <iframe
                src="https://player.cloudinary.com/embed/?cloud_name=dszhwrn7m&public_id=PXL_20250126_012728263_exported_stabilized_1746938550034_ocrnbm_1_zx9pdg&profile=beba&autoplay=true&loop=true&muted=true&playsinline=true&bigPlayButton=true&autoPlayMode=always&preload=auto"
                allow="autoplay; encrypted-media; picture-in-picture"
                className="h-full w-full object-cover rounded-md"
                frameBorder="0"
              ></iframe>
            </div>
            <h3 className="mt-4 text-center text-xl font-bold bg-gradient-to-r from-pink-500 via-lavender-500 to-teal-500 text-transparent bg-clip-text">
              Play Time!
            </h3>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="mb-8 overflow-hidden rounded-2xl shadow-xl"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        style={{
          boxShadow: "0 10px 30px -5px rgba(20, 184, 166, 0.3)",
          borderRadius: "1rem",
          overflow: "hidden",
        }}
      ></motion.div>
    </section>
  )
}
