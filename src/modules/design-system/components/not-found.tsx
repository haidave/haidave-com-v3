import { ROUTES } from '@/config/routes'
import { Link } from '@/modules/design-system/components/link'

type NotFoundProps = {
  description: string
  link: string
}

function NotFound({ description, link }: NotFoundProps) {
  return (
    <section className="grid aspect-square place-items-center border border-dashed">
      <div className="flex flex-col items-center justify-center gap-8">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-semibold">404</h2>
          <p className="text-secondary">{description}</p>
        </div>
        <Link href={link} className="gap-1.5 text-secondary">
          <span>←</span> back
        </Link>
      </div>
    </section>
  )
}

export { NotFound }
