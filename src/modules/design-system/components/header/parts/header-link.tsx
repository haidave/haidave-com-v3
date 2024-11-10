'use client'

import { usePathname } from 'next/navigation'

import { ROUTES } from '@/config/routes'
import { cn } from '@/lib/utils'

import { Link } from '../../link'

type HeaderLinkProps = {
  href: string
  label: string
}

const HeaderLink = ({ href, label }: HeaderLinkProps) => {
  const pathname = usePathname()

  const isActive = pathname.includes(href)

  return (
    <li className="text-sm text-secondary">
      <Link href={href} isActive={isActive}>
        {label}
      </Link>
    </li>
  )
}

export { HeaderLink }
