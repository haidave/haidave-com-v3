import type { ComponentPropsWithoutRef } from 'react'

import { cn } from '@/lib/utils'

interface BlockQuoteProps extends ComponentPropsWithoutRef<'blockquote'> {
  author?: string
  children: React.ReactNode
}

export const BlockQuote = ({ author, children, className, ...props }: BlockQuoteProps) => {
  return (
    <blockquote className={cn('grid gap-4 border-l-4 pl-4 text-secondary', className)} {...props}>
      {children}
      {author && <cite>&mdash; {author}</cite>}
    </blockquote>
  )
}
