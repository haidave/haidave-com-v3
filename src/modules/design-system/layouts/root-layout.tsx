/* eslint-disable @next/next/no-head-element */
import '@/styles/globals.css'

import { Providers } from '@/lib/providers/providers'

import { AnimatedFavicon } from '../components/animated-favicon'
import { Footer } from '../components/footer'
import { Header } from '../components/header/header'
import { geistMono } from '../theme/fonts'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <AnimatedFavicon />
      </head>
      <body className={`${geistMono.variable} bg-primary font-mono text-sm text-primary`}>
        <Providers>
          <div className="mx-auto w-full max-w-[680px] px-6 py-8 sm:pt-16">
            <Header />
            {children}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}

export { RootLayout }
