// Just a helper component to generate the OG image instead of Figma
const OGImage = () => {
  return (
    <section className="grid h-[630px] w-[1200px] place-items-center p-10">
      <div className="grid place-items-center gap-y-8">
        <div className="flex items-center gap-x-6 text-9xl font-bold text-primary">
          <div className="relative size-24">
            <div className="absolute left-0 h-full w-6 bg-primary-reverse" />
            <div className="absolute top-1/2 h-6 w-14 -translate-y-1/2 bg-primary-reverse" />
            <div className="absolute right-0 h-24 w-14 border-[24px] border-l-0 border-black dark:border-white" />
          </div>
          haidave
        </div>
        <p className="text-3xl font-semibold tracking-wide text-tertiary">
          Frontend Engineer / Open to new opportunities
        </p>
      </div>
    </section>
  )
}

export { OGImage }
