import fs from 'fs'
import path from 'path'
import { compileMDX } from 'next-mdx-remote/rsc'

import { components } from './mdx-components'

type Frontmatter = {
  title: string
  description: string
  publishedAt: string
  tags?: string[]
  order?: number
}

type AdjacentDocument = {
  title: string
  slug: string
} | null

const basePath = process.cwd()
const buildContentPath = (category: string) => path.join(basePath, 'src', 'modules', category, 'content')

export const getDocumentBySlug = async (category: string, slug: string) => {
  const contentDir = buildContentPath(category)
  const fileName = slug + '.mdx'
  const filePath = path.join(contentDir, fileName)
  const fileContent = fs.readFileSync(filePath, 'utf8')

  const { frontmatter, content } = await compileMDX<Frontmatter>({
    source: fileContent,
    components: components,
    options: {
      parseFrontmatter: true,
    },
  })

  return {
    frontmatter,
    content,
    slug: path.parse(fileName).name,
  }
}

export const getDocuments = async (category: string) => {
  const contentDir = buildContentPath(category)
  const files = fs.readdirSync(contentDir)

  const documents = await Promise.all(
    files
      .filter((file) => path.extname(file) === '.mdx')
      .map(async (file) => await getDocumentBySlug(category, path.parse(file).name))
  )

  return documents.sort((a, b) => {
    // First try to sort by order if it exists
    const orderA = a.frontmatter.order ?? Number.MAX_SAFE_INTEGER
    const orderB = b.frontmatter.order ?? Number.MAX_SAFE_INTEGER

    if (orderA !== orderB) {
      return orderA - orderB
    }

    // Then sort by publishedAt date (newest first)
    return new Date(b.frontmatter.publishedAt).getTime() - new Date(a.frontmatter.publishedAt).getTime()
  })
}

export const getAllSlugs = (category: string) => {
  const contentDir = buildContentPath(category)
  const files = fs.readdirSync(contentDir)
  const slugs = files.map((file) => ({ slug: path.parse(file).name }))
  return slugs
}

export const getAdjacentDocuments = async (category: string, currentSlug: string) => {
  const allDocuments = await getDocuments(category)
  const currentIndex = allDocuments.findIndex((doc) => doc.slug === currentSlug)

  const previous: AdjacentDocument =
    currentIndex > 0 && allDocuments[currentIndex - 1]
      ? {
          title: allDocuments[currentIndex - 1]?.frontmatter?.title ?? '',
          slug: allDocuments[currentIndex - 1]?.slug ?? '',
        }
      : null

  const next: AdjacentDocument =
    currentIndex < allDocuments.length - 1 && allDocuments[currentIndex + 1]
      ? {
          title: allDocuments[currentIndex + 1]?.frontmatter?.title ?? '',
          slug: allDocuments[currentIndex + 1]?.slug ?? '',
        }
      : null

  return { previous, next }
}
