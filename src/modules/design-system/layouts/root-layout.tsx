import '@/styles/globals.css'

import { Providers } from '@/lib/providers/providers'

import { Footer } from '../components/footer'
import { Header } from '../components/header/header'
import { geistMono } from '../theme/fonts'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistMono.variable} bg-primary font-mono text-sm text-primary`}>
        <Providers>
          <div className="mx-auto w-full max-w-[680px] p-4 pt-16">
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
