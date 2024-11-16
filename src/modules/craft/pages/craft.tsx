import { ROUTES } from '@/config/routes'
import { getDocuments } from '@/lib/mdx/mdx'
import { ButtonLink } from '@/modules/design-system/components/button-link'

const CraftPage = async () => {
  const craft = await getDocuments('craft')

  return (
    <section className="space-y-3">
      <h2 className="font-semibold text-primary">craft</h2>
      <ul className="grid grid-cols-3">
        {craft.map((craft) => (
          <li key={craft.slug} className="m-[-0.5px] aspect-square">
            <ButtonLink href={ROUTES.craftDetail(craft.slug)} className="grid size-full p-3">
              <div className="space-y-1">
                <h3>{craft.frontmatter.title}</h3>
                <p className="mt-auto text-xs text-tertiary">{craft.frontmatter.description}</p>
              </div>

              <ul className="mt-auto flex flex-wrap gap-1.5">
                {craft.frontmatter.tags?.map((tag) => (
                  <li key={tag} className="border border-dashed px-1.5 py-0.5 text-2xs text-secondary">
                    {tag}
                  </li>
                ))}
              </ul>
            </ButtonLink>
          </li>
        ))}
      </ul>
    </section>
  )
}

export { CraftPage }
