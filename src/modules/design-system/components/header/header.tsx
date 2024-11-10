import { ROUTES } from '@/config/routes'
import { Link } from '@/modules/design-system/components/link'

import { HeaderLink } from './parts/header-link'

const HEADER_LINKS = [
  { name: 'about', href: ROUTES.about },
  { name: 'craft', href: ROUTES.craft },
  { name: 'notes', href: ROUTES.notes },
]

const Header = () => {
  return (
    <header className="mb-8 flex justify-between">
      <div>
        <Link href={ROUTES.home} className="font-bold">
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
