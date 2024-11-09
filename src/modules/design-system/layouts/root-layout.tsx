import '@/styles/globals.css'

import { geistMono } from '../theme/fonts'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistMono.variable} bg-primary font-mono text-primary`}>{children}</body>
    </html>
  )
}

export { RootLayout }
