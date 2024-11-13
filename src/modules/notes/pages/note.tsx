import { notFound } from 'next/navigation'
import { ArrowLeftIcon } from 'lucide-react'

import { ROUTES } from '@/config/routes'
import { formatDate } from '@/lib/formatters'
import { getAllSlugs, getDocumentBySlug } from '@/lib/mdx/mdx'
import { Link } from '@/modules/design-system/components/link'

const generateStaticParams = () => {
  return getAllSlugs('notes')
}

const generateMetadata = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const resolvedParams = await params
  const component = await getDocumentBySlug('notes', resolvedParams.slug)

  return {
    title: component.frontmatter.title,
  }
}

export const metadata = {
  title: 'Notes',
}

const NotePage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const resolvedParams = await params
  const note = await getDocumentBySlug('notes', resolvedParams.slug)

  if (!note) {
    return notFound()
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <Link href={ROUTES.notes} className="flex items-center gap-1.5 text-xs text-tertiary">
          <span className="text-sm">←</span> back
        </Link>

        <h2>{note.frontmatter.title}</h2>

        <time dateTime={note.frontmatter.publishedAt} className="text-xs text-tertiary">
          {formatDate(note.frontmatter.publishedAt)}
        </time>
      </div>
      <div className="grid gap-y-2 text-secondary">{note.content}</div>
    </section>
  )
}

export { NotePage, generateStaticParams, generateMetadata }
