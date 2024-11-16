'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

const ANIMATION_DURATION = 200
const FAVICON_SELECTOR = 'link[rel="icon"]'

enum AnimationFrame {
  Frame1,
  Frame2,
  Final,
}

const faviconUrls = {
  idle: '/images/icon-idle.png',
  active: {
    [AnimationFrame.Frame1]: '/images/icon-frame-1.png',
    [AnimationFrame.Frame2]: '/images/icon-frame-2.png',
    [AnimationFrame.Final]: '/images/icon.png',
  },
} as const

/**
 * AnimatedFavicon Component
 *
 * This component manages an animated favicon that changes based on tab activity.
 * It handles the animation sequence and cleanup automatically.
 */
const AnimatedFavicon = () => {
  const [isActive, setIsActive] = useState(true)
  const [animationFrame, setAnimationFrame] = useState(AnimationFrame.Frame1)
  const [mounted, setMounted] = useState(false)

  // Use refs for timers and favicon element to prevent unnecessary re-renders
  const timerRef = useRef<NodeJS.Timeout>()
  const faviconRef = useRef<HTMLLinkElement | null>(null)

  // Initialize favicon element reference
  const initializeFavicon = useCallback(() => {
    let favicon = document.querySelector<HTMLLinkElement>(FAVICON_SELECTOR)

    if (!favicon) {
      favicon = document.createElement('link')
      favicon.rel = 'icon'
      favicon.type = 'image/png'
      document.head.appendChild(favicon)
    }

    faviconRef.current = favicon
  }, [])

  // Handle tab visibility changes
  const handleVisibilityChange = useCallback(() => {
    const isHidden = document.hidden
    setIsActive(!isHidden)

    if (!isHidden) {
      // Reset animation when tab becomes visible
      setAnimationFrame(AnimationFrame.Frame1)
    }
  }, [])

  // Set up event listeners and initialize favicon
  useEffect(() => {
    setMounted(true)
    initializeFavicon()

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [handleVisibilityChange, initializeFavicon])

  // Manage animation frames
  useEffect(() => {
    if (!isActive || animationFrame === AnimationFrame.Final) {
      return
    }

    timerRef.current = setTimeout(() => {
      setAnimationFrame((prev) => {
        switch (prev) {
          case AnimationFrame.Frame1:
            return AnimationFrame.Frame2
          case AnimationFrame.Frame2:
            return AnimationFrame.Final
          default:
            return AnimationFrame.Final
        }
      })
    }, ANIMATION_DURATION)

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [isActive, animationFrame])

  // Determine current favicon URL
  const currentFaviconUrl = useMemo(() => {
    if (!isActive) return faviconUrls.idle
    return faviconUrls.active[animationFrame]
  }, [isActive, animationFrame])

  // Update favicon
  useEffect(() => {
    if (!mounted || !faviconRef.current) return

    try {
      faviconRef.current.href = currentFaviconUrl
    } catch (error) {
      console.error('Failed to update favicon:', error)
    }
  }, [currentFaviconUrl, mounted])

  // No need to render anything as this is a utility component
  return null
}

export { AnimatedFavicon }
