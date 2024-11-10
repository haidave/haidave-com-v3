import '@/styles/globals.css'

import { Providers } from '@/lib/providers/providers'

import { geistMono } from '../theme/fonts'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistMono.variable} bg-primary font-mono text-primary`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

export { RootLayout }
