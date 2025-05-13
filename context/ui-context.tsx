"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface UIContextType {
  isCardExpanded: boolean
  setIsCardExpanded: (expanded: boolean) => void
}

const UIContext = createContext<UIContextType | undefined>(undefined)

export function UIProvider({ children }: { children: ReactNode }) {
  const [isCardExpanded, setIsCardExpanded] = useState(false)

  return <UIContext.Provider value={{ isCardExpanded, setIsCardExpanded }}>{children}</UIContext.Provider>
}

export function useUI() {
  const context = useContext(UIContext)
  if (context === undefined) {
    throw new Error("useUI must be used within a UIProvider")
  }
  return context
}
