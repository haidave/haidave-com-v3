import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'haidave.com',
    template: '%s | haidave.com',
  },
  description: 'TBD',
}

export { RootLayout as default } from '@/modules/design-system/layouts/root-layout'
