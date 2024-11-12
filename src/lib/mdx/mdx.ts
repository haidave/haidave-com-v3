import fs from 'fs'
import path from 'path'
import type { Element, Literal } from 'hast'
import { compileMDX } from 'next-mdx-remote/rsc'
import rehypePrettyCode from 'rehype-pretty-code'
import githubDarkDefault from 'shiki/themes/github-dark-default.mjs'
import { visit } from 'unist-util-visit'

import { components } from './mdx-components'

type Frontmatter = {
  title: string
  description: string
  publishedAt: string
  order?: number
}

const basePath = process.cwd()
const buildContentPath = (category: string) => path.join(basePath, 'src', 'modules', category, 'content')

// Extract raw code from `code` element nested inside `pre` tag and store value in `pre` node.
// This need to be before `rehypePrettyCode` so that we get the raw value.
const preprocessRawCode = (tree: Element) => {
  visit(tree, (node) => {
    if (!(node.type === 'element' && node.tagName === 'pre')) {
      return
    }

    const [element] = node.children as Element[]

    if (element?.tagName !== 'code') {
      return
    }

    const [code] = element.children as (Literal & Text)[]

    ;(node as Element & { raw?: string }).raw = code?.value
  })
}
// Pass raw value found in `pre` node and store to figure[data-rehype-pretty-code-figure]
// This need to be after `rehypePrettyCode` so the stored raw code can be moved to the target figure.
const postprocessRawCode = (tree: Element) => {
  visit(tree, (node) => {
    if (
      !(node.type === 'element' && node.tagName === 'figure') ||
      !('data-rehype-pretty-code-figure' in node.properties)
    ) {
      return
    }

    for (const child of node.children as Element[]) {
      if (child.tagName === 'pre') {
        node.properties.raw = (node as Element & { raw?: string }).raw
      }
    }
  })
}

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
      mdxOptions: {
        rehypePlugins: [
          () => preprocessRawCode,
          [
            rehypePrettyCode as never,
            {
              theme: githubDarkDefault,
              keepBackground: false,
            },
          ],
          () => postprocessRawCode,
        ],
      },
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
