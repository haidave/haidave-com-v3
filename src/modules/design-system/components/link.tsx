import { Link as NextLink } from 'next-view-transitions'

import { cn } from '@/lib/utils'

type LinkProps = {
  href: string
  isExternal?: boolean
  isActive?: boolean
  children: React.ReactNode
  className?: string
}

const Link = ({ href, isExternal, isActive, children, className }: LinkProps) => {
  const target = isExternal ? '_blank' : undefined
  const rel = isExternal ? 'noopener noreferrer' : undefined

  return (
    <NextLink
      href={href}
      target={target}
      rel={rel}
      className={cn(
        'link-underline inline-flex items-center',
        isActive && 'text-primary after:scale-x-100 after:border-solid',
        'focus-visible:shadow-focus focus-visible:outline-0',
        className
      )}
    >
      {children}
    </NextLink>
  )
}

export { Link }
