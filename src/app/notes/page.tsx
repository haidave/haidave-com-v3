import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'notes',
  description: 'random thoughts and ideas',
}

export { NotesPage as default } from '@/modules/notes/pages/notes'
