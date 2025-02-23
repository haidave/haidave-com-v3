import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'haidave',
    template: '%s | haidave',
  },
  description: 'Frontend Engineer / Open to new opportunities',
  icons: {
    icon: '/images/icon.png',
    shortcut: '/images/icon.png',
    apple: '/images/icon.png',
  },
}

export { RootLayout as default } from '@/modules/design-system/layouts/root-layout'
