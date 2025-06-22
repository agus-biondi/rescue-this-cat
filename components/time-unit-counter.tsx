"use client"

import AnimatedCountUp from "./animated-count-up"

interface TimeUnitCounterProps {
  value: number
  label: string
  delay?: number
}

export default function TimeUnitCounter({ value, label, delay = 0 }: TimeUnitCounterProps) {
  // Don't render if value is 0
  if (value === 0) return null

  return (
    <div className="flex flex-col items-center min-w-[60px]">
      <AnimatedCountUp
        toValue={value}
        delay={delay}
        duration={2.5} // Slightly faster since we have multiple counters
        className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-50"
      />
      <div className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mt-1">
        {value === 1 ? label.slice(0, -1) : label} {/* Remove 's' for singular */}
      </div>
    </div>
  )
}
