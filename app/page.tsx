"use client"

import FloatingAdoptButton from "@/components/floating-adopt-button"
import ScrollDownArrow from "@/components/scroll-down-arrow"
import { UIProvider } from "@/context/ui-context"
import { useEffect, useRef } from "react"
import { track } from "@vercel/analytics"

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

function useScrollDepthTracking(sampleRate = 0.1) {

  const fortyTracked = useRef(false);
  const eightyTracked = useRef(false);

  useEffect(() => {
    const shouldSample = Math.random() < sampleRate;
    if (!shouldSample) return;

    function handleScroll() {
      const scrollDepth = window.scrollY + window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const percent = scrollDepth / docHeight;
      if (!fortyTracked.current && percent > 0.4) {
        track(`ScrollDepthSR-${sampleRate}`, { percent: 40 });
        fortyTracked.current = true;
      }
      if (!eightyTracked.current && percent > 0.8) {
        track(`ScrollDepthSR-${sampleRate}`, { percent: 80 });
        eightyTracked.current = true;
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
}

export default function Home() {
  useScrollDepthTracking(1);
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
