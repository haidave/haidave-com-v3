import { LINKS } from '@/config/links'
import { Link } from '@/modules/design-system/components/link'
import { ThemeSwitcher } from '@/modules/design-system/components/theme-switcher'

const SOCIALS = [
  { name: '𝕏', link: LINKS.x },
  { name: 'GitHub', link: LINKS.github },
  { name: 'LinkedIn', link: LINKS.linkedin },
]

const Footer = () => {
  return (
    <footer className="mt-8 flex items-center justify-between">
      <div className="flex gap-4 text-secondary">
        {SOCIALS.map((item) => (
          <Link key={item.name} isExternal href={item.link}>
            {item.name}
          </Link>
        ))}
      </div>

      <ThemeSwitcher />
    </footer>
  )
}

export { Footer }
