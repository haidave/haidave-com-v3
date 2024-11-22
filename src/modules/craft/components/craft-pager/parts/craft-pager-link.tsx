import { Link as NextLink } from 'next-view-transitions'

import { ROUTES } from '@/config/routes'
import { AdjacentDocument } from '@/lib/mdx/mdx'
import { cn } from '@/lib/utils'

type CraftPagerLinkProps = {
  type: 'previous' | 'next'
  document: AdjacentDocument
}

const CraftPagerLink = ({ type, document }: CraftPagerLinkProps) => {
  if (!document) {
    return <div />
  }

  const isPrevious = type === 'previous'

  return (
    <NextLink
      href={ROUTES.craftDetail(document.slug)}
      className={cn('group flex flex-col gap-px', isPrevious ? 'items-start' : 'items-end')}
    >
      <div className={cn('flex gap-1.5 text-tertiary', !isPrevious && 'justify-end')}>
        {isPrevious ? (
          <div className="flex items-center gap-1.5 text-xs text-tertiary transition-colors group-hover:text-secondary">
            <span className="text-sm">←</span>
            <span>previous</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-xs text-tertiary transition-colors group-hover:text-secondary">
            <span>next</span>
            <span className="text-sm">→</span>
          </div>
        )}
      </div>
      <span className="link-underline">{document.title}</span>
    </NextLink>
  )
}

export { CraftPagerLink }
