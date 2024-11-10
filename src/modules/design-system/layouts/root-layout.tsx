import '@/styles/globals.css'

import { Providers } from '@/lib/providers/providers'

import { Header } from '../components/header/header'
import { geistMono } from '../theme/fonts'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistMono.variable} bg-primary font-mono text-primary`}>
        <Providers>
          <div className="mx-auto mt-20 w-full max-w-[680px] p-4">
            <Header />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}

export { RootLayout }
