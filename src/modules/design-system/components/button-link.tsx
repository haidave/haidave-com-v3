import { Link as NextLink } from 'next-view-transitions'

import { cn } from '@/lib/utils'

type LinkProps = {
  href: string
  isExternal?: boolean
  withoutBorder?: boolean
  children: React.ReactNode
  className?: string
}

const ButtonLink = ({ href, isExternal, withoutBorder, children, className }: LinkProps) => {
  const target = isExternal ? '_blank' : undefined
  const rel = isExternal ? 'noopener noreferrer' : undefined

  return (
    <NextLink
      href={href}
      target={target}
      rel={rel}
      className={cn(
        'text-secondary transition',
        'hover:bg-secondary',
        !withoutBorder && 'border border-dashed',
        !withoutBorder && 'hover:z-10 hover:border-secondary',
        'focus-visible:shadow-focus focus-visible:outline-0',
        className
      )}
    >
      {children}
    </NextLink>
  )
}

export { ButtonLink }
