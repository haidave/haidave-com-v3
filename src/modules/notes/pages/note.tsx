import { notFound } from 'next/navigation'

import { ROUTES } from '@/config/routes'
import { formatDate } from '@/lib/formatters'
import { getAllSlugs, getDocumentBySlug } from '@/lib/mdx/mdx'
import { Link } from '@/modules/design-system/components/link'

const generateStaticParams = () => {
  return getAllSlugs('notes')
}

const generateMetadata = async ({ params }: { params: Promise<{ slug: string }> | { slug: string } }) => {
  const resolvedParams = await params
  const component = await getDocumentBySlug('notes', resolvedParams.slug)

  return {
    title: component.frontmatter.title,
  }
}

export const metadata = {
  title: 'Notes',
}

const NotePage = async ({ params }: { params: Promise<{ slug: string }> | { slug: string } }) => {
  const resolvedParams = await params
  const note = await getDocumentBySlug('notes', resolvedParams.slug)

  if (!note) {
    return notFound()
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <Link href={ROUTES.notes} className="flex items-center gap-1.5 text-tertiary">
          <svg width="13" height="9" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.7071 0.29289C8.0976 0.68342 8.0976 1.31658 7.7071 1.70711L3.41422 6H17C17.5523 6 18 6.4477 18 7C18 7.5523 17.5523 8 17 8H3.41421L7.7071 12.2929C8.0976 12.6834 8.0976 13.3166 7.7071 13.7071C7.3166 14.0976 6.68342 14.0976 6.29289 13.7071L0.29289 7.7071C0.10536 7.5196 0 7.2652 0 7C0 6.7348 0.10536 6.4804 0.29289 6.2929L6.29289 0.29289C6.68342 -0.09763 7.3166 -0.09763 7.7071 0.29289Z"
              fill="currentColor"
            ></path>
          </svg>
          back
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
