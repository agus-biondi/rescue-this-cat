"use client"
import { MessageCircleQuestion } from "lucide-react"
import AnimatedSectionHeader from "@/components/animated-section-header"
import FIVExpandableCards from "@/components/fiv-expandable-cards"

export default function FIVSection() {
  return (
    <section className="w-full py-8 px-4 md:px-8 relative">
      {/* Colorful background */}
      <div className="absolute inset-0 bg-gradient-to-r from-lavender-100/50 via-pink-100/50 to-teal-100/50 -z-10 transform -skew-y-3"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <AnimatedSectionHeader
          title="Understanding FIV"
          subtitle="Beba is FIV-positive, but that doesn't define her or limit her ability to be a wonderful companion."
          icon={<MessageCircleQuestion className="w-8 h-8 text-white" />}
        />

        {/* Expandable Cards Component */}
        <FIVExpandableCards />
      </div>
    </section>
  )
}
