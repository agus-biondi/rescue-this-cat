"use client"

import { getTotalDaysInShelter, breakdownTimeInShelter } from "@/lib/utils"
import CascadingCounter from "./cascading-counter"

interface TimeInShelterDisplayProps {
  intakeDate: string
}

export default function TimeInShelterDisplay({ intakeDate }: TimeInShelterDisplayProps) {
  const totalDays = getTotalDaysInShelter(intakeDate)
  const { years, months, days } = breakdownTimeInShelter(totalDays)

  return (
    <div className="text-center my-1 md:my-2 p-1 md:p-2">
      <div className="text-lg md:text-xl font-medium text-slate-700 dark:text-slate-200 mb-3">Time in Shelter</div>
      {totalDays === 0 ? (
        <div className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-50">Arrived Today!</div>
      ) : (
        <CascadingCounter targetYears={years} targetMonths={months} targetDays={days} delay={1.4} />
      )}
    </div>
  )
}
