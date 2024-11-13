import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'about',
  description: 'a little bit about me',
}

export { AboutPage as default } from '@/modules/about/pages/about'
