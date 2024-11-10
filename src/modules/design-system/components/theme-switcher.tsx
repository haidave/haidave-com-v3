'use client'

import { useEffect, useState } from 'react'
import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  if (theme === 'dark') {
    return (
      <button
        onClick={() => setTheme('light')}
        className="transition-colors hover:text-secondary"
        aria-label="Set light mode"
        type="button"
      >
        <SunIcon className="size-4" />
      </button>
    )
  }

  if (theme === 'light') {
    return (
      <button
        onClick={() => setTheme('dark')}
        className="transition-colors hover:text-secondary"
        aria-label="Set dark mode"
        type="button"
      >
        <MoonIcon className="size-4" />
      </button>
    )
  }
}

export { ThemeSwitcher }
