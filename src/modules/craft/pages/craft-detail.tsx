import { notFound } from 'next/navigation'

import { ROUTES } from '@/config/routes'
import { formatDate } from '@/lib/formatters'
import { getAdjacentDocuments, getAllSlugs, getDocumentBySlug } from '@/lib/mdx/mdx'
import { Link } from '@/modules/design-system/components/link'

import { CraftPager } from '../components/craft-pager/craft-pager'

const generateStaticParams = () => {
  return getAllSlugs('craft')
}

const generateMetadata = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const resolvedParams = await params
  const craft = await getDocumentBySlug('craft', resolvedParams.slug)

  if (!craft) {
    return {
      title: 'not found',
    }
  }

  return {
    title: craft.frontmatter.title,
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

      <div className="grid aspect-square size-full place-items-center border border-dashed">{craft.content}</div>

      <CraftPager previous={previous} next={next} />
    </section>
  )
}

export { CraftDetailPage, generateStaticParams, generateMetadata }
