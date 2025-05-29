"use client"

import { motion } from "framer-motion"
import { PawPrintIcon as Paw } from "lucide-react"
import AnimatedSectionHeader from "@/components/animated-section-header"
import { CloudinaryImage } from "@/components/cloudinary-image"

export default function BebaStorySection() {
  return (
    <section className="w-full py-8 px-4 md:px-8 max-w-4xl mx-auto relative">
      <motion.div
        className="absolute top-0 right-0 w-32 h-32 text-pink-200 opacity-20 -z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 10, ease: "easeInOut" }}
      >
        <Paw className="w-full h-full" />
      </motion.div>

      <motion.div
        className="absolute bottom-0 left-0 w-24 h-24 text-lavender-200 opacity-20 -z-10"
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 10, ease: "easeInOut" }}
      >
        <Paw className="w-full h-full" />
      </motion.div>

      <AnimatedSectionHeader title="Beba's Journey" />

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
          Beba was born as stray cat near Maria and Eduardo's backyard. For months, she lived quietly with her siblings, until Maria
          noticed something was wrong with Beba's eyes.
        </p>

        {/* Family Portrait photo between the two paragraphs - now using CloudinaryImage */}
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
                src="https://res.cloudinary.com/dszhwrn7m/image/upload/v1747062993/9C1B91C1-97AE-4358-9238-4036AA4945F0_tmy6qo.jpg"
                alt="Beba with her siblings cuddling together"
                width={480}
                height={480}
                priority={true}
                className="h-full w-full rounded-md"
              />
            </div>
            <h3 className="mt-4 text-center text-xl font-bold bg-gradient-to-r from-pink-500 via-lavender-500 to-teal-500 text-transparent bg-clip-text">
              Family Portrait
            </h3>
          </motion.div>
        </div>

        <p className="text-lg text-gray-700 mb-4 leading-relaxed mt-4">
          They raced Beba to a vet, which revealed serious trauma to both eyes. Beba's right eye had to be removed, and while the left eye was saved,
          it's now permanently scarred. She was also diagnosed as FIV-positive.
        </p>

        {/* After First Surgery photo - now using CloudinaryImage */}
        <div className="flex justify-center items-center my-8">
          <motion.div
            className="relative min-h-96 w-80 overflow-hidden rounded-md bg-white p-4 shadow-xl transform-3d"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            style={{ rotate: `3deg` }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 30px rgba(0, 0, 0, 0.2)",
              transition: { duration: 0.3 },
            }}
          >
            <div className="relative h-80">
              <CloudinaryImage
                src="https://res.cloudinary.com/dszhwrn7m/image/upload/v1747091111/after_surgery_ocs61z.jpg"
                alt="Beba recovering after her first eye surgery"
                width={480}
                height={480}
                priority={true}
                className="h-full w-full rounded-md"
              />
            </div>
            <h3 className="mt-4 text-center text-xl font-bold bg-gradient-to-r from-pink-500 via-lavender-500 to-teal-500 text-transparent bg-clip-text">
              After First Surgery
            </h3>
          </motion.div>
        </div>

        <p className="text-lg text-gray-700 mb-4 leading-relaxed mt-4">
          Thankfully, Maria and Eduardo sponsored all of Beba's veterinary care. Beba went to recover with foster parents Agustín and Sofía, who nursed her back to health.
        </p>
      </motion.div>
    </section>
  )
}
