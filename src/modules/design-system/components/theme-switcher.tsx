'use client'

import { useCallback, useEffect, useState } from 'react'
import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'

import { useThemeTransition } from '@/hooks/use-theme-transition'

import { Button } from './button'

const ThemeMode = {
  LIGHT: 'light',
  DARK: 'dark',
} as const

type ThemeMode = (typeof ThemeMode)[keyof typeof ThemeMode]

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  const handleThemeChange = useCallback(() => {
    const newTheme = theme === ThemeMode.DARK ? ThemeMode.LIGHT : ThemeMode.DARK
    setTheme(newTheme)
  }, [theme, setTheme])

  const { triggerTransition } = useThemeTransition({
    onTransition: handleThemeChange,
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="size-7" aria-hidden="true" />
  }

  const isDark = theme === ThemeMode.DARK

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={triggerTransition}
      aria-label={isDark ? 'Set light mode' : 'Set dark mode'}
      type="button"
    >
      {isDark ? <SunIcon className="size-4 stroke-[1.5]" /> : <MoonIcon className="size-4 stroke-[1.5]" />}
    </Button>
  )
}

export { ThemeSwitcher }
