'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'

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

// Memoize the animation sequence function
const getNextFrame = (prev: AnimationFrame): AnimationFrame => {
  switch (prev) {
    case AnimationFrame.Frame1:
      return AnimationFrame.Frame2
    case AnimationFrame.Frame2:
      return AnimationFrame.Final
    default:
      return AnimationFrame.Final
  }
}

const AnimatedFavicon = () => {
  const pathname = usePathname()
  const [isActive, setIsActive] = useState(true)
  const [animationFrame, setAnimationFrame] = useState(AnimationFrame.Frame1)
  const [mounted, setMounted] = useState(false)

  const handleVisibilityChange = useCallback(() => {
    // Batch state updates
    if (document.hidden) {
      setIsActive(false)
    } else {
      setIsActive(true)
      setAnimationFrame(AnimationFrame.Frame1)
    }
  }, [])

  // Route change handler
  const handleRouteChange = useCallback(() => {
    if (mounted) {
      setAnimationFrame(AnimationFrame.Frame1)
    }
  }, [mounted])

  useEffect(() => {
    handleRouteChange()
  }, [pathname, handleRouteChange])

  useEffect(() => {
    setMounted(true)
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [handleVisibilityChange])

  useEffect(() => {
    if (!isActive || animationFrame === AnimationFrame.Final) {
      return
    }

    const timer = setTimeout(() => {
      setAnimationFrame(getNextFrame)
    }, ANIMATION_DURATION)

    return () => clearTimeout(timer)
  }, [isActive, animationFrame])

  const currentFaviconUrl = useMemo(() => {
    if (!isActive) return faviconUrls.idle
    return faviconUrls.active[animationFrame]
  }, [isActive, animationFrame])

  useEffect(() => {
    if (!mounted) return

    // Cache the favicon element reference
    const favicon = document.querySelector<HTMLLinkElement>(FAVICON_SELECTOR)
    if (!favicon) return

    // Only update if the URL actually changed
    if (favicon.href !== currentFaviconUrl) {
      favicon.href = currentFaviconUrl
    }
  }, [currentFaviconUrl, mounted])

  return null
}

export { AnimatedFavicon }
