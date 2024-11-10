import { LINKS } from '@/config/links'
import { Link } from '@/modules/design-system/components/link'
import { ThemeSwitcher } from '@/modules/design-system/components/theme-switcher'

const INTERESTS = ['Street Photography', 'Minimalism', 'UI/UX', 'Self-Development', 'Bouldering']

const STACK = [
  'React',
  'Next.js',
  'Vercel',
  'Typescript',
  'Supabase',
  'TanStack Query',
  'Zustand',
  'Playwright',
  'Framer Motion',
  'Tailwind CSS',
  'shadcn/ui',
]

const SOCIALS = [
  { name: '𝕏', link: LINKS.x },
  { name: 'GitHub', link: LINKS.github },
  { name: 'LinkedIn', link: LINKS.linkedin },
]

const HomePage = () => {
  return (
    <main className="grid gap-8 text-sm">
      <section>
        <p className="text-secondary">
          Obsessed with building pixel-perfect and polished interfaces that are also accessible and intuitive.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-semibold text-primary">now</h2>
        <ul className="space-y-1 text-secondary">
          <li className="flex items-center gap-2">
            <span className="text-tertiary">&ndash;</span>
            Frontend Engineer at{' '}
            <Link href={LINKS.strv} isExternal>
              STRV
            </Link>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-tertiary">&ndash;</span>
            Building{' '}
            <Link href={LINKS.everbase} isExternal>
              everbase.io
            </Link>{' '}
            in public
          </li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="font-semibold text-primary">interests</h2>
        <ul className="space-y-1 text-secondary">
          {INTERESTS.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span className="text-tertiary">&ndash;</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="font-semibold text-primary">stack</h2>
        <ul className="flex flex-wrap gap-x-3 gap-y-2 text-secondary">
          {STACK.map((item) => (
            <li key={item} className="border border-dashed px-2 py-1 uppercase">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <footer className="flex items-center justify-between">
        <div className="flex gap-4">
          {SOCIALS.map((item) => (
            <Link key={item.name} href={item.link}>
              {item.name}
            </Link>
          ))}
        </div>

        <ThemeSwitcher />
      </footer>
    </main>
  )
}

export { HomePage }
