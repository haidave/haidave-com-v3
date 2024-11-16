import { notFound } from 'next/navigation'

import { ROUTES } from '@/config/routes'
import { formatDate } from '@/lib/formatters'
import { getAdjacentDocuments, getAllSlugs, getDocumentBySlug } from '@/lib/mdx/mdx'
import { Link } from '@/modules/design-system/components/link'

const generateStaticParams = () => {
  return getAllSlugs('craft')
}

const generateMetadata = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const resolvedParams = await params
  const component = await getDocumentBySlug('craft', resolvedParams.slug)

  return {
    title: component.frontmatter.title,
  }
}

const CraftDetailPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const resolvedParams = await params
  const craft = await getDocumentBySlug('craft', resolvedParams.slug)
  const { previous, next } = await getAdjacentDocuments('craft', resolvedParams.slug)

  if (!craft) {
    return notFound()
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <Link href={ROUTES.craft} className="flex items-center gap-1.5 text-xs text-tertiary">
          <span className="text-sm">←</span> back
        </Link>

        <h2>{craft.frontmatter.title}</h2>

        <time dateTime={craft.frontmatter.publishedAt} className="text-xs text-tertiary">
          {formatDate(craft.frontmatter.publishedAt)}
        </time>
      </div>

      <div className="grid aspect-square place-items-center border border-dashed">{craft.content}</div>

      <div className="flex justify-between text-secondary">
        {previous ? (
          <Link href={ROUTES.craftDetail(previous.slug)} className="gap-1.5">
            <span>←</span> {previous.title}
          </Link>
        ) : (
          <div />
        )}

        {next ? (
          <Link href={ROUTES.craftDetail(next.slug)} className="gap-1.5">
            {next.title} <span>→</span>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </section>
  )
}

export { CraftDetailPage, generateStaticParams, generateMetadata }
