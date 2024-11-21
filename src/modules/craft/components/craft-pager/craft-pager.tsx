import { AdjacentDocument } from '@/lib/mdx/mdx'

import { CraftPagerLink } from './parts/craft-pager-link'

type CraftPagerProps = {
  previous: AdjacentDocument
  next: AdjacentDocument
}

const CraftPager = ({ previous, next }: CraftPagerProps) => {
  return (
    <div className="flex justify-between text-secondary">
      <CraftPagerLink type="previous" document={previous} />
      <CraftPagerLink type="next" document={next} />
    </div>
  )
}

export { CraftPager }
