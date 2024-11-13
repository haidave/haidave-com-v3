import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'craft',
  description: 'a playground for sharpening my skills',
}

export { CraftPage as default } from '@/modules/craft/pages/craft'
