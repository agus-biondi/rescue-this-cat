"use client"

import { useState, useEffect } from "react"

export function useImagePreloader(imageSrcs: string[]) {
  const [imagesPreloaded, setImagesPreloaded] = useState(false)
  const [loadedCount, setLoadedCount] = useState(0)

  useEffect(() => {
    if (!imageSrcs.length) return

    let isMounted = true
    let loadedImages = 0
    const totalImages = imageSrcs.length

    const preloadImage = (src: string) => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image()
        img.src = src
        img.onload = () => {
          if (isMounted) {
            loadedImages++
            setLoadedCount(loadedImages)
            resolve()
          }
        }
        img.onerror = reject
      })
    }

    const preloadAllImages = async () => {
      try {
        // Load images in parallel
        await Promise.all(imageSrcs.map((src) => preloadImage(src)))
        if (isMounted) {
          setImagesPreloaded(true)
        }
      } catch (error) {
        console.error("Failed to preload images:", error)
      }
    }

    preloadAllImages()

    return () => {
      isMounted = false
    }
  }, [imageSrcs])

  return { imagesPreloaded, loadedCount, totalCount: imageSrcs.length }
}
