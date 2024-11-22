'use client'

import { ViewTransitions } from 'next-view-transitions'

import { ThemeProvider } from './theme-provider'

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ViewTransitions>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        {children}
      </ThemeProvider>
    </ViewTransitions>
  )
}
