"use client"

import { motion } from "framer-motion"
import AnimatedSectionHeader from "@/components/animated-section-header"
import { CloudinaryImage } from "@/components/cloudinary-image"

export default function ComplicationsSection() {
  return (
    <section className="w-full py-8 px-4 md:px-8 max-w-4xl mx-auto relative">
      <AnimatedSectionHeader title="Complications" />

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
          Unfortunately, Beba's eye socket kept leaking fluid and becoming infected. Eye specialists recommended a
          second operation to remove residual tissue and tear glands left behind in the first surgery.
        </p>

        {/* Photo for the Complications section - moved from Recovery section */}
        <div className="flex justify-center items-center my-8">
          <motion.div
            className="relative min-h-96 w-80 overflow-hidden rounded-md bg-white p-4 shadow-xl transform-3d"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            style={{ rotate: `-3deg` }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 30px rgba(0, 0, 0, 0.2)",
              transition: { duration: 0.3 },
            }}
          >
            <div className="relative h-80">
              <CloudinaryImage
                src="https://res.cloudinary.com/dszhwrn7m/image/upload/v1747091108/standing_with_bleeding_eye_zzdhz1.jpg"
                alt="Beba before her second surgery with some healing complications"
                width={320}
                height={320}
                className="h-full w-full rounded-md"
              />
            </div>
            <h3 className="mt-4 text-center text-xl font-bold bg-gradient-to-r from-pink-500 via-lavender-500 to-teal-500 text-transparent bg-clip-text">
              Before Second Surgery
            </h3>
            <p className="mt-2 text-center text-sm text-gray-600">
              Beba waiting for her second surgery to address complications
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
