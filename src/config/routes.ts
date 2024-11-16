const ROUTES = {
  home: '/',
  about: '/about',
  craft: '/craft',
  craftDetail: (slug: string) => `/craft/${slug}`,
  notes: '/notes',
  note: (slug: string) => `/notes/${slug}`,
} as const

export { ROUTES }
