import type { ComponentPropsWithoutRef } from 'react'
import React from 'react'
import type { MDXComponents } from 'mdx/types'

import { BlockQuote } from '@/modules/design-system/components/blockquote'
import { CopyToClipboard } from '@/modules/design-system/components/copy-to-clipboard'
import { Link } from '@/modules/design-system/components/link'
import { ThemeSwitcher } from '@/modules/design-system/components/theme-switcher'

interface FigureProps extends ComponentPropsWithoutRef<'figure'> {
  'data-rehype-pretty-code-figure'?: string
  raw?: string
  children?: React.ReactNode
}

export const components: MDXComponents = {
  figure: ({ children, className, raw, ...props }: FigureProps) => {
    if (props['data-rehype-pretty-code-figure'] !== undefined && raw) {
      const figcaption = React.Children.toArray(children || []).find(
        (child) => React.isValidElement(child) && child.type === 'figcaption'
      )
      const filteredChildren = React.Children.toArray(children || []).filter(
        (child) => !(React.isValidElement(child) && child.type === 'figcaption')
      )

      return (
        <figure className="border-subtle bg-subtle dark relative overflow-hidden rounded-lg border" {...props}>
          <div className="border-subtle relative border-b">
            <div className="flex items-center justify-between">
              {figcaption && (
                <div className="relative px-4 py-2 font-mono [&>figcaption]:mt-0 [&>figcaption]:text-xs [&>figcaption]:text-primary">
                  {figcaption}
                  {/* tab indicator */}
                  <div aria-hidden className="bg-text-primary absolute -bottom-2 left-0 h-px w-full translate-y-full" />
                </div>
              )}
              <div className="px-4 py-2">
                <CopyToClipboard value={raw} />
              </div>
            </div>
          </div>
          {filteredChildren}
        </figure>
      )
    }

    return (
      <div className={className} {...props}>
        {children}
      </div>
    )
  },
  pre: ({ ...props }) => <pre className="bg-subtle dark relative block py-6 [&>code]:grid" {...props} />,
  BlockQuote: BlockQuote,
  Link: Link,
  ThemeSwitcher: ThemeSwitcher,
}
