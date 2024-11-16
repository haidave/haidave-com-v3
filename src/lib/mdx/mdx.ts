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

type MDXDocument = {
  frontmatter: Frontmatter
  content: React.ReactNode
  slug: string
}

type AdjacentDocument = {
  title: string
  slug: string
} | null

// Separate file system utilities
const fsUtils = {
  basePath: process.cwd(),
  getContentPath: (category: string) => path.join(process.cwd(), 'src', 'modules', category, 'content'),

  fileExists: (filePath: string) => fs.existsSync(filePath),

  readFile: (filePath: string) => fs.readFileSync(filePath, 'utf8'),

  getMDXFiles: (contentDir: string) => fs.readdirSync(contentDir).filter((file) => path.extname(file) === '.mdx'),
}

// Document sorting utilities
const sortUtils = {
  byOrder: (a: MDXDocument, b: MDXDocument) => {
    const orderA = a.frontmatter.order ?? Number.MAX_SAFE_INTEGER
    const orderB = b.frontmatter.order ?? Number.MAX_SAFE_INTEGER
    return orderA - orderB
  },

  byDate: (a: MDXDocument, b: MDXDocument) =>
    new Date(b.frontmatter.publishedAt).getTime() - new Date(a.frontmatter.publishedAt).getTime(),
}

export const getDocumentBySlug = async (type: string, slug: string): Promise<MDXDocument | null> => {
  try {
    const contentDir = fsUtils.getContentPath(type)
    const filePath = path.join(contentDir, `${slug}.mdx`)

    if (!fsUtils.fileExists(filePath)) {
      return null
    }

    const fileContent = fsUtils.readFile(filePath)
    const { frontmatter, content } = await compileMDX<Frontmatter>({
      source: fileContent,
      components,
      options: { parseFrontmatter: true },
    })

    return { frontmatter, content, slug }
  } catch (error) {
    console.error(`Error reading document ${slug}:`, error)
    return null
  }
}

export const getDocuments = async (category: string): Promise<MDXDocument[]> => {
  const contentDir = fsUtils.getContentPath(category)
  const files = fsUtils.getMDXFiles(contentDir)

  const documents = await Promise.all(files.map((file) => getDocumentBySlug(category, path.parse(file).name)))

  return documents
    .filter((doc): doc is MDXDocument => doc !== null)
    .sort((a, b) => {
      const orderDiff = sortUtils.byOrder(a, b)
      return orderDiff !== 0 ? orderDiff : sortUtils.byDate(a, b)
    })
}

export const getAllSlugs = (category: string) => {
  const contentDir = fsUtils.getContentPath(category)
  const files = fsUtils.getMDXFiles(contentDir)
  return files.map((file) => ({ slug: path.parse(file).name }))
}

export const getAdjacentDocuments = async (
  category: string,
  currentSlug: string
): Promise<{ previous: AdjacentDocument; next: AdjacentDocument }> => {
  const allDocuments = await getDocuments(category)
  const currentIndex = allDocuments.findIndex((doc) => doc.slug === currentSlug)

  const createAdjacentDoc = (doc: MDXDocument | undefined): AdjacentDocument =>
    doc ? { title: doc.frontmatter.title, slug: doc.slug } : null

  return {
    previous: createAdjacentDoc(allDocuments[currentIndex - 1]),
    next: createAdjacentDoc(allDocuments[currentIndex + 1]),
  }
}
