const ROUTES = {
  home: '/',
  about: '/about',
  craft: '/craft',
  notes: '/notes',
  note: (slug: string) => `/notes/${slug}`,
} as const

export { ROUTES }
