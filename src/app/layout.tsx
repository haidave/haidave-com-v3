import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'haidave',
    template: '%s | haidave',
  },
  description: 'my personal space representing both me and my work.',
}

export { RootLayout as default } from '@/modules/design-system/layouts/root-layout'
