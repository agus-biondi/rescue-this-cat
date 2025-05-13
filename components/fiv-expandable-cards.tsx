"use client"

import { useEffect, useId, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useOutsideClick } from "@/hooks/use-outside-click"
import { X, ChevronRight, Stethoscope, Cat, PawPrint, HandHeart, MessageCircleX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useUI } from "@/context/ui-context"

export default function FIVExpandableCards() {
  const [active, setActive] = useState<(typeof cards)[number] | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const id = useId()
  const { setIsCardExpanded } = useUI()

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null)
      }
    }

    if (active) {
      document.body.style.overflow = "hidden"
      setIsCardExpanded(true)
    } else {
      document.body.style.overflow = "auto"
      setIsCardExpanded(false)
    }

    window.addEventListener("keydown", onKeyDown, { passive: true })
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [active, setIsCardExpanded])

  useOutsideClick(ref, () => setActive(null))

  // Handle swipe down to close on mobile
  const handleSwipeDown = (_, info) => {
    if (info.offset.y > 150) {
      setActive(null)
    }
  }

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            onClick={() => setActive(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active ? (
          <motion.div
            className="fixed inset-0 flex items-end sm:items-center justify-center z-[100] px-4 py-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              ref={ref}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              onDragEnd={handleSwipeDown}
              dragElastic={0.5}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-lg bg-white dark:bg-neutral-900 rounded-t-xl sm:rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] will-change-transform"
            >
              {/* Drag handle for mobile */}
              <div className="w-full flex justify-center pt-2 pb-1 sm:hidden">
                <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
              </div>

              {/* Header with icon */}
              <div className="relative p-5 border-b border-gray-100 dark:border-gray-800 flex items-center">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-lavender-400 to-pink-400 flex items-center justify-center text-white flex-shrink-0 mr-4">
                  {active.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">{active.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{active.description}</p>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  className="rounded-full ml-2"
                  onClick={(e) => {
                    e.stopPropagation()
                    setActive(null)
                  }}
                >
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>

              {/* Content */}
              <div className="p-5">
                <div
                  ref={contentRef}
                  className="prose prose-sm sm:prose max-w-none dark:prose-invert overflow-auto max-h-[50vh] sm:max-h-[60vh] pr-2"
                  style={{ scrollbarWidth: "thin" }}
                >
                  {active.content}
                </div>

                {active.ctaLink && (
                  <div className="mt-6 flex justify-center">
                    <Button
                      asChild
                      className="bg-gradient-to-r from-pink-500 via-lavender-500 to-teal-500 hover:from-pink-600 hover:via-lavender-600 hover:to-teal-600 text-white rounded-full shadow-md"
                    >
                      <a href={active.ctaLink} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                        {active.ctaIcon && active.ctaIcon}
                        {active.ctaText}
                      </a>
                    </Button>
                  </div>
                )}
              </div>

              {/* Bottom action for mobile */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-800 mt-auto sm:hidden">
                <Button variant="ghost" className="w-full justify-center" onClick={() => setActive(null)}>
                  Close
                </Button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="space-y-3">
        {cards.map((card, index) => (
          <motion.div
            key={`card-${card.title}-${id}`}
            onClick={() => setActive(card)}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="p-4 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm rounded-lg cursor-pointer shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-800"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-lavender-400 to-pink-400 flex items-center justify-center text-white flex-shrink-0">
                {card.icon}
              </div>
              <h3 className="font-medium text-gray-800 dark:text-gray-200">{card.title}</h3>
              <ChevronRight className="h-4 w-4 text-gray-400 ml-auto" />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 pl-11"></p>
          </motion.div>
        ))}
      </div>
    </>
  )
}

const cards = [
  {
    title: "What is FIV?",
    icon: <Stethoscope className="h-5 w-5" />,
    content: (
      <div>
        <p>
          Feline Immunodeficiency Virus is a retrovirus that targets a cat's white‑blood‑cell defenses, gradually
          reducing resistance to secondary infections. It is biologically similar to HIV in people but infects only
          felines.
        </p>
        <p>Most cats experience a long dormant phase with few outward signs before any immune problems appear.</p>
      </div>
    ),
  },
  {
    title: "How Does FIV Affect Cats?",
    icon: <Cat className="h-5 w-5" />,
    content: (
      <div>
        <p>
          After an initial mild fever or swollen lymph nodes, many FIV‑positive cats enter a symptom‑free period that
          can last years.
        </p>
        <p>
          Over time the immune system may falter, making ordinary ailments such as dental disease, skin infections,
          upper‑respiratory bugs, harder to shake without prompt treatment.
        </p>
        <p>
          With good nutrition, indoor housing, and regular check‑ups, life expectancy can equal that of uninfected cats.
        </p>
      </div>
    ),
  },
  {
    title: "Is FIV Contagious?",
    icon: <PawPrint className="h-5 w-5" />,
    content: (
      <div>
        <p>
          FIV is transmitted mainly by bite wounds that inject virus‑laden saliva into tissue. Casual sharing of bowls,
          litter trays, or grooming generally don't spread the disease. Mother‑to‑kitten transmission is also possible.
        </p>
        <p>The virus is affects only cats, posing no danger to humans, dogs, or other pets.</p>
      </div>
    ),
  },
  {
    title: "What Special Care Do FIV Cats Need?",
    icon: <HandHeart className="h-5 w-5" />,
    content: (
      <div>
        <ul className="list-disc pl-5 space-y-4">
          <li>
            <strong>Indoor living</strong> to avoid random pathogens.
          </li>
          <li>
            <strong>High‑quality diet and fresh water</strong> to support immune health.
          </li>
          <li>
            <strong>Regular veterinary exams</strong> so minor issues are caught early.
          </li>
          <li>
            <strong>Prompt treatment</strong> of any sniffle, wound, or dental flare‑up before it blossoms into a
            serious infection.
          </li>
        </ul>
      </div>
    ),
  },
  {
    title: "Common Misconceptions",
    icon: <MessageCircleX className="h-5 w-5" />,
    content: (
      <div>
        <ul className="space-y-2">
          <li>
            <p className="leading-snug">
              <strong className="text-lavender-600 dark:text-lavender-400">
                “FIV cats live short lives.”
              </strong>{" "}
              Large rescue studies show many reach normal senior ages with proper care.
            </p>
          </li>
          <li>
            <p className="leading-snug">
              <strong className="text-lavender-600 dark:text-lavender-400">
                “FIV cats are always sick.”
              </strong>{" "}
              Most remain outwardly healthy for years; only unmanaged secondary infections cause trouble.
            </p>
          </li>
          <li>
            <p className="leading-snug">
              <strong className="text-lavender-600 dark:text-lavender-400">
                “FIV can jump to people or dogs.”
              </strong>{" "}
              Not biologically possible. The virus is strictly feline.
            </p>
          </li>
        </ul>
      </div>
    ),
  },
]
