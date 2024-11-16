'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'

const ANIMATION_DURATION = 200

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
 * This component manages an animated favicon that changes based on tab activity
 * and route changes.
 */
const AnimatedFavicon = () => {
  const pathname = usePathname()
  const [isActive, setIsActive] = useState(true)
  const [animationFrame, setAnimationFrame] = useState(AnimationFrame.Frame1)
  const [mounted, setMounted] = useState(false)

  // Handle tab visibility changes
  const handleVisibilityChange = useCallback(() => {
    setIsActive(!document.hidden)
    if (!document.hidden) {
      setAnimationFrame(AnimationFrame.Frame1)
    }
  }, [])

  // Handle route changes
  useEffect(() => {
    if (mounted) {
      setAnimationFrame(AnimationFrame.Frame1)
    }
  }, [pathname, mounted])

  // Set up event listeners
  useEffect(() => {
    setMounted(true)
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [handleVisibilityChange])

  // Manage animation frames
  useEffect(() => {
    if (isActive && animationFrame !== AnimationFrame.Final) {
      const timer = setTimeout(() => {
        setAnimationFrame((prev) => {
          if (prev === AnimationFrame.Frame1) return AnimationFrame.Frame2
          if (prev === AnimationFrame.Frame2) return AnimationFrame.Final
          return AnimationFrame.Final
        })
      }, ANIMATION_DURATION)

      return () => clearTimeout(timer)
    }
  }, [isActive, animationFrame])

  // Determine current favicon URL
  const currentFaviconUrl = useMemo(() => {
    if (!isActive) return faviconUrls.idle
    return faviconUrls.active[animationFrame]
  }, [isActive, animationFrame])

  // Update favicon
  useEffect(() => {
    if (!mounted) return

    const favicon = document.querySelector('link[rel="icon"]')
    if (favicon && favicon instanceof HTMLLinkElement) {
      favicon.href = currentFaviconUrl
    }
  }, [currentFaviconUrl, mounted])

  if (!mounted) return null

  return null
}

export { AnimatedFavicon }
