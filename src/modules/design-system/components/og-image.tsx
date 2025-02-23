import { STACK } from '@/modules/home/pages/home'

// Just a helper component to generate the OG image instead of Figma
const OGImage = () => {
  return (
    <section className="h-[630px] w-[1200px] p-10">
      <div>
        <div className="flex items-center gap-x-4 text-8xl font-bold text-primary">
          <div className="relative size-16">
            <div className="absolute left-0 h-full w-4 bg-primary-reverse" />
            <div className="absolute top-1/2 h-4 w-10 -translate-y-1/2 bg-primary-reverse" />
            <div className="absolute right-0 h-16 w-10 border-[16px] border-l-0 border-black dark:border-white" />
          </div>
          haidave
        </div>
      </div>

      <p className="mt-7 text-2xl text-secondary">
        Obsessed with building pixel-perfect and polished interfaces that are also accessible and intuitive.
      </p>

      <div className="mt-14 space-y-4">
        <h2 className="text-2xl font-semibold text-primary">now</h2>
        <ul className="space-y-1 text-xl text-secondary">
          <li className="flex gap-2">
            <span className="text-tertiary">&ndash;</span>
            <p>Frontend Engineer at STRV</p>
          </li>
          <li className="flex gap-2">
            <span className="text-tertiary">&ndash;</span>
            <p>Open to new opportunities</p>
          </li>
        </ul>
      </div>

      <div className="mt-14 space-y-4">
        <h2 className="text-2xl font-semibold text-primary">stack</h2>
        <ul className="flex max-w-[800px] flex-wrap gap-x-3 gap-y-2 text-xl text-secondary">
          {STACK.map((item) => (
            <li key={item} className="border border-dashed px-2 py-1 uppercase">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export { OGImage }
