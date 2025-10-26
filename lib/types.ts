export interface AnimalPhoto {
  url: string
  date?: string // ISO date string - Note: date is no longer displayed but kept in type for data structure
  objectPosition?: "top" | "center" | "bottom" | "1/4" | "3/4"
  scale?: number // Scale factor for zoom (e.g., 0.9 = zoom out 10%, 1.1 = zoom in 10%)
}

export interface Animal {
  id: string
  name: string
  intakeDate: string // ISO date string
  photos: AnimalPhoto[]
  species?: string
}
