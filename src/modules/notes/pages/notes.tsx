import type { Metadata } from 'next'

import { ROUTES } from '@/config/routes'
import { formatDate } from '@/lib/formatters'
import { getDocuments } from '@/lib/mdx/mdx'
import { Link } from '@/modules/design-system/components/link'

export const metadata: Metadata = {
  title: 'Notes',
}

const NotesPage = async () => {
  const notes = await getDocuments('notes')

  return (
    <section className="space-y-2">
      <h2 className="font-semibold text-primary">notes</h2>
      <ul className="grid">
        {notes.map((note) => (
          <li key={note.slug} className="group -mx-2 hover:bg-secondary">
            <Link
              href={ROUTES.note(note.slug)}
              className="flex size-full items-start justify-between gap-8 p-2 hover:after:scale-x-0"
            >
              <div className="space-y-1">
                <h3>{note.frontmatter.title}</h3>
                <p className="line-clamp-1 overflow-hidden text-ellipsis text-xs text-tertiary">
                  {note.frontmatter.description}
                </p>
              </div>
              <time dateTime={note.frontmatter.publishedAt} className="shrink-0 text-xs text-tertiary">
                {formatDate(note.frontmatter.publishedAt)}
              </time>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export { NotesPage }
