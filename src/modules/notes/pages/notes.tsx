import { ROUTES } from '@/config/routes'
import { formatDate } from '@/lib/formatters'
import { getDocuments } from '@/lib/mdx/mdx'
import { Link } from '@/modules/design-system/components/link'

const NotesPage = async () => {
  const notes = await getDocuments('notes')

  return (
    <section className="space-y-2">
      <h2 className="font-semibold text-primary">notes</h2>
      <ul className="grid">
        {notes.map((note) => (
          <li key={note.slug} className="group -mx-2 hover:bg-secondary">
            <Link href={ROUTES.note(note.slug)} withoutUnderline className="grid size-full gap-1 p-2">
              <div className="flex items-start justify-between gap-x-4">
                <h3>{note.frontmatter.title}</h3>
                <time dateTime={note.frontmatter.publishedAt} className="text-xs text-tertiary">
                  {formatDate(note.frontmatter.publishedAt)}
                </time>
              </div>

              <p className="text-xs text-tertiary">{note.frontmatter.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export { NotesPage }
