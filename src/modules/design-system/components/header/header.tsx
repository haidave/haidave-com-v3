import { ROUTES } from '@/config/routes'
import { Link } from '@/modules/design-system/components/link'

import { HeaderLink } from './parts/header-link'

const HEADER_LINKS = [
  { name: 'about', href: ROUTES.about },
  // { name: 'craft', href: ROUTES.craft },
  { name: 'notes', href: ROUTES.notes },
]

const Header = () => {
  return (
    <header className="mb-8 flex justify-between gap-x-8">
      <div>
        <Link href={ROUTES.home} className="gap-x-1.5 text-base font-bold text-primary">
          <div className="relative size-4">
            <div className="absolute left-0 h-full w-1 bg-primary-reverse" />
            <div className="absolute top-1/2 h-1 w-2.5 -translate-y-1/2 bg-primary-reverse" />
            <div className="absolute right-0 h-4 w-2.5 border-4 border-l-0 border-black dark:border-white" />
          </div>
          haidave
        </Link>
        <p className="flex gap-x-0.5 text-xs text-tertiary">
          <span>prague,</span>
          <span>czechia</span>
        </p>
      </div>

      <ul className="flex flex-wrap justify-end gap-x-4">
        {HEADER_LINKS.map((item) => (
          <HeaderLink key={item.name} href={item.href} label={item.name} />
        ))}
      </ul>
    </header>
  )
}

export { Header }
