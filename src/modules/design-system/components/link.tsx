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
        'text-secondary hover:text-primary',
        'after:absolute after:bottom-0 after:left-0 after:h-px after:w-full',
        'after:origin-bottom-right after:scale-x-0 after:border-b',
        'after:border-dashed after:border-current after:transition-transform',
        'hover:after:origin-bottom-left hover:after:scale-x-100',
        isActive && 'text-primary after:scale-x-100 after:border-solid',
        'focus-visible:shadow-focus focus-visible:outline-0',
        className
      )}
    >
      {children}
    </NextLink>
  )
}
