import { LINKS } from '@/config/links'
import { Link } from '@/modules/design-system/components/link'

const TOOLS = [
  {
    name: 'Arc',
    description: 'Innovative browser',
  },
  {
    name: 'Cursor',
    description: 'AI-first code editor',
  },
  {
    name: 'Raycast',
    description: 'Spotlight on steroids',
  },
  {
    name: 'Rize',
    description: 'Auto time tracker',
  },
  {
    name: 'Spark',
    description: 'All emails in one place',
  },
  {
    name: 'Warp',
    description: 'Modern terminal',
  },
]

const AboutPage = () => {
  return (
    <main className="grid gap-8">
      <section className="space-y-2">
        <h2 className="font-semibold text-primary">me</h2>
        <p className="text-secondary">
          Heyo! I&apos;m Hai, but you can call me Dave &ndash; like everyone else. Currently working at{' '}
          <Link href={LINKS.strv} isExternal>
            STRV
          </Link>{' '}
          as a Frontend Engineer. I&nbsp;take pride in&nbsp;my attention to detail and aim for prime user satisfaction.
          When I&apos;m&nbsp;not coding, I&nbsp;enjoy living life and capturing moments with my camera.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-semibold text-primary">career</h2>
        <ul className="w-full space-y-4">
          <li className="flex gap-2">
            <span className="w-28 shrink-0 text-nowrap text-tertiary">2021-present</span>
            <div className="space-y-1">
              <span>
                Frontend Engineer at{' '}
                <Link href={LINKS.strv} isExternal>
                  STRV
                </Link>
              </span>
              <p className="text-xs text-tertiary">
                Building software solutions for US clients, now developing an artist platform for a major global record
                label.
              </p>
            </div>
          </li>

          <li className="flex gap-2">
            <span className="w-28 shrink-0 text-nowrap text-tertiary">2018-2021</span>
            <div className="space-y-1">
              <span>
                Creative Coder at{' '}
                <Link href={LINKS.dentsu} isExternal>
                  Dentsu Creative CZ
                </Link>
              </span>
              <p className="text-xs text-tertiary">
                Led campaign assets such as dynamic banners, newsletters and landing pages for ŠKODA Auto, Sazka,
                Heineken, Sunar, Generali and more.
              </p>
            </div>
          </li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="font-semibold text-primary">tools</h2>
        <ul className="grid grid-cols-3 text-secondary">
          {TOOLS.map((item) => (
            <li key={item.name} className="grid content-start gap-y-0.5 border border-dashed p-2">
              <span>{item.name}</span>
              <p className="text-xs text-tertiary">{item.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="font-semibold text-primary">this site</h2>
        <div className="space-y-2 text-secondary">
          <p>My personal space representing both me and my work. Here I explore new technologies and design trends.</p>
          <p>A space where I hold myself accountable, document my journey, and share insights along the way.</p>
          <p>Built with Next.js 15, deployed on Vercel and styled with Tailwind CSS.</p>
        </div>
      </section>
    </main>
  )
}

export { AboutPage }
