import { ROUTES } from '@/config/routes'
import { NotFound } from '@/modules/design-system/components/not-found'

export default function NotFoundPage() {
  return <NotFound description="requested page not found" link={ROUTES.home} />
}
