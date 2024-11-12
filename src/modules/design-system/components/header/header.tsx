'use client'

import { usePathname } from 'next/navigation'

import { ROUTES } from '@/config/routes'
import { cn } from '@/lib/utils'
import { Link } from '@/modules/design-system/components/link'

import { HeaderLink } from './parts/header-link'

const HEADER_LINKS = [
  { name: 'about', href: ROUTES.about },
  { name: 'craft', href: ROUTES.craft },
  { name: 'notes', href: ROUTES.notes },
]

const Header = () => {
  const pathname = usePathname()
  const isHome = pathname === ROUTES.home

  return (
    <header className="mb-8 flex justify-between">
      <div>
        <Link href={ROUTES.home} className={cn('font-bold text-primary', isHome && 'hover:no-underline')}>
          haidave
        </Link>
        <p className="text-tertiary">prague, czechia</p>
      </div>

      <ul className="flex gap-4">
        {HEADER_LINKS.map((item) => (
          <HeaderLink key={item.name} href={item.href} label={item.name} />
        ))}
      </ul>
    </header>
  )
}

export { Header }
