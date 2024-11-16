import { ROUTES } from '@/config/routes'
import { Link } from '@/modules/design-system/components/link'

export default function NotFound() {
  return (
    <section className="grid aspect-square place-items-center border border-dashed">
      <div className="flex flex-col items-center justify-center gap-8">
        <div className="text-center">
          <h2 className="text-3xl font-semibold">404</h2>
          <p className="text-secondary">requested page not found</p>
        </div>
        <Link href={ROUTES.home} className="gap-1.5 text-secondary">
          <span>←</span> back
        </Link>
      </div>
    </section>
  )
}
