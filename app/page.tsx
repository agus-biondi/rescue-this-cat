"use client"

import FloatingAdoptButton from "@/components/floating-adopt-button"
import ScrollDownArrow from "@/components/scroll-down-arrow"
import { UIProvider } from "@/context/ui-context"

// Import section components
import HeroSection from "@/components/sections/hero-section"
import BebaStorySection from "@/components/sections/beba-story-section"
import ComplicationsSection from "@/components/sections/complications-section"
import RecoverySection from "@/components/sections/recovery-section"
import SpiritSection from "@/components/sections/spirit-section"
import FIVSection from "@/components/sections/fiv-section"
import PhotoGallerySection from "@/components/sections/photo-gallery-section"
import AdoptSection from "@/components/sections/adopt-section"
import FooterSection from "@/components/sections/footer-section"

export default function Home() {
  return (
    <UIProvider>
      <main className="flex min-h-screen flex-col items-center overflow-x-hidden">
        {/* Decorative background elements */}
        <div className="fixed inset-0 -z-10 bg-gradient-to-b from-lavender-50 via-pink-50 to-teal-50 opacity-70"></div>
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-100 via-transparent to-transparent opacity-40"></div>

        {/* Floating Adopt Button */}
        <FloatingAdoptButton />

        {/* Scroll Down Arrow */}
        <ScrollDownArrow />

        {/* Sections */}
        <HeroSection />
        <BebaStorySection />
        <ComplicationsSection />
        <RecoverySection />
        <SpiritSection />
        <FIVSection />
        <PhotoGallerySection />
        <AdoptSection />
        <FooterSection />
      </main>
    </UIProvider>
  )
}
