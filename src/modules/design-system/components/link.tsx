import NextLink from 'next/link'

import { cn } from '@/lib/utils'

type LinkProps = {
  href: string
  isExternal?: boolean
  isActive?: boolean
  children: React.ReactNode
  className?: string
}

export const Link = ({ href, isExternal, isActive, children, className }: LinkProps) => {
  const target = isExternal ? '_blank' : undefined
  const rel = isExternal ? 'noopener noreferrer' : undefined

  return (
    <NextLink
      href={href}
      target={target}
      rel={rel}
      className={cn(
        'group relative inline-flex items-center',
        'transition-all',
        'decoration-dashed underline-offset-4 hover:text-primary hover:underline',
        isActive && 'text-primary underline decoration-solid',
        'focus-visible:shadow-focus focus-visible:outline-0',
        className
      )}
    >
      {children}
    </NextLink>
  )
}