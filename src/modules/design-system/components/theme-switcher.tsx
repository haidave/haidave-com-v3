'use client'

import { useEffect, useState } from 'react'
import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from './button'

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Prevent layout shift
    return <div className="size-7" />
  }

  if (theme === 'dark') {
    return (
      <Button variant="ghost" size="icon" onClick={() => setTheme('light')} aria-label="Set light mode" type="button">
        <SunIcon className="size-4 stroke-[1.5]" />
      </Button>
    )
  }

  if (theme === 'light') {
    return (
      <Button variant="ghost" size="icon" onClick={() => setTheme('dark')} aria-label="Set dark mode" type="button">
        <MoonIcon className="size-4 stroke-[1.5]" />
      </Button>
    )
  }
}

export { ThemeSwitcher }
