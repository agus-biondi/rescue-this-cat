import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function getTotalDaysInShelter(intakeDateString: string): number {
  const intakeDate = new Date(intakeDateString)
  const today = new Date()
  const utcIntakeDate = Date.UTC(intakeDate.getFullYear(), intakeDate.getMonth(), intakeDate.getDate())
  const utcToday = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())

  const diffTime = utcToday - utcIntakeDate
  if (isNaN(diffTime) || diffTime < 0) return 0

  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

export function breakdownTimeInShelter(totalDays: number): {
  years: number
  months: number
  days: number
} {
  if (totalDays < 0) totalDays = 0

  const years = Math.floor(totalDays / 365)
  const remainingAfterYears = totalDays % 365
  const months = Math.floor(remainingAfterYears / 30)
  const days = remainingAfterYears % 30

  return {
    years,
    months,
    days,
  }
}

export const wrap = (min: number, max: number, v: number): number => {
  const rangeSize = max - min
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min
}


