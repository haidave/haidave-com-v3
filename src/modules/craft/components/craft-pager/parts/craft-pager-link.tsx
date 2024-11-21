import NextLink from 'next/link'

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
      className={cn('group flex flex-col gap-0.5', isPrevious ? 'items-start' : 'items-end')}
    >
      <div className={cn('flex gap-1.5 text-tertiary', !isPrevious && 'justify-end')}>
        {isPrevious ? (
          <>
            <span>←</span>
            <span className="text-tertiary">previous</span>
          </>
        ) : (
          <>
            <span className="text-tertiary">next</span>
            <span>→</span>
          </>
        )}
      </div>
      <span
        className={cn(
          'relative transition-all',
          'after:absolute after:bottom-0 after:left-0 after:h-px after:w-full',
          'after:origin-bottom-right after:scale-x-0 after:border-b',
          'after:border-dashed after:border-current after:transition-transform',
          'group-hover:after:origin-bottom-left group-hover:after:scale-x-100'
        )}
      >
        {document.title}
      </span>
    </NextLink>
  )
}

export { CraftPagerLink }
