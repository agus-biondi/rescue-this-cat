"use client"

import { useEffect } from "react"
import { motion, useMotionValue, useTransform } from "framer-motion"

interface CascadingCounterProps {
  targetYears: number
  targetMonths: number
  targetDays: number
  delay?: number
  className?: string
}

export default function CascadingCounter({
  targetYears,
  targetMonths,
  targetDays,
  delay = 1.4,
  className,
}: CascadingCounterProps) {
  const years = useMotionValue(0)
  const months = useMotionValue(0)
  const days = useMotionValue(0)

  const displayYears = useTransform(years, (latest) => Math.round(latest).toString().padStart(2, "0"))
  const displayMonths = useTransform(months, (latest) => Math.round(latest).toString().padStart(2, "0"))
  const displayDays = useTransform(days, (latest) => Math.round(latest).toString().padStart(2, "0"))

  useEffect(() => {
    const animationTimeout = setTimeout(() => {
      const totalDaysToAnimate = targetYears * 365 + targetMonths * 30 + targetDays
      const animationDuration = Math.min(totalDaysToAnimate * 0.02, 4)

      if (totalDaysToAnimate === 0) return

      let currentDay = 0
      const increment = totalDaysToAnimate / (animationDuration * 60) // 60fps

      const animateStep = () => {
        currentDay += increment

        if (currentDay >= totalDaysToAnimate) {
          years.set(targetYears)
          months.set(targetMonths)
          days.set(targetDays)
          return
        }

        const currentYearsVal = Math.floor(currentDay / 365)
        const remainingAfterYears = currentDay % 365
        const currentMonthsVal = Math.floor(remainingAfterYears / 30)
        const currentDaysVal = Math.floor(remainingAfterYears % 30)

        years.set(currentYearsVal)
        months.set(currentMonthsVal)
        days.set(currentDaysVal)

        requestAnimationFrame(animateStep)
      }
      requestAnimationFrame(animateStep)
    }, delay * 1000)

    return () => clearTimeout(animationTimeout)
  }, [targetYears, targetMonths, targetDays, delay, years, months, days])

  return (
    <div className={`flex flex-wrap justify-center items-end gap-4 md:gap-6 ${className}`}>
      <div className="flex flex-col items-center min-w-[60px]">
        <motion.span className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-50">
          {displayYears}
        </motion.span>
        <div className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mt-1">Years</div>
      </div>
      <div className="flex flex-col items-center min-w-[60px]">
        <motion.span className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-50">
          {displayMonths}
        </motion.span>
        <div className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mt-1">Months</div>
      </div>
      <div className="flex flex-col items-center min-w-[60px]">
        <motion.span className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-50">
          {displayDays}
        </motion.span>
        <div className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mt-1">Days</div>
      </div>
    </div>
  )
}
