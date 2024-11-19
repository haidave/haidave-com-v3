import { LINKS } from '@/config/links'
import { Link } from '@/modules/design-system/components/link'

const INTERESTS = ['Street Photography', 'Personal Branding', 'Self-Development', 'Minimalism', 'UI/UX', 'Bouldering']

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

const HomePage = () => {
  return (
    <main className="grid gap-8">
      <section>
        <p className="text-secondary">
          Obsessed with building pixel-perfect and polished interfaces that are also accessible and intuitive.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-semibold text-primary">now</h2>
        <ul className="space-y-1 text-secondary">
          <li className="flex gap-2">
            <span className="text-tertiary">&ndash;</span>
            <p>
              Frontend Engineer at{' '}
              <Link href={LINKS.strv} isExternal>
                STRV
              </Link>
            </p>
          </li>
          <li className="flex gap-2">
            <span className="text-tertiary">&ndash;</span>
            <p>
              Building{' '}
              <Link href={LINKS.everbase} isExternal>
                everbase.io{' '}
              </Link>{' '}
              in public
            </p>
          </li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="font-semibold text-primary">interests</h2>
        <ul className="grid space-y-1 text-secondary xs:grid-cols-2 sm:grid-cols-3">
          {INTERESTS.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-tertiary">&ndash;</span>
              <p>{item}</p>
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
    </main>
  )
}

export { HomePage }
