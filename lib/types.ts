export interface AnimalPhoto {
  url: string
  date?: string // ISO date string - Note: date is no longer displayed but kept in type for data structure
}

export interface Animal {
  id: string
  name: string
  intakeDate: string // ISO date string
  photos: [AnimalPhoto, AnimalPhoto]
  species?: string
}
