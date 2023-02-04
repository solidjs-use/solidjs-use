import fs from 'fs'
import path from 'path'
import { compile } from '@mdx-js/mdx'
import remarkFrontmatter from 'remark-frontmatter'
import rehypePrettyCode from 'rehype-pretty-code'
import remarkGfm from 'remark-gfm'
import type { Options as RehypePrettyCodeOptions } from 'rehype-pretty-code'
import type { ResolvedOptions } from './types'
import type { TransformResult } from 'vite'

export function createMarkdown(options: ResolvedOptions) {
  function rehypeWrapperClasses() {
    // unknown is not assignable to type Element
    return function (tree: any) {
      if (options.wrapperClasses) {
        const wrapper = {
          type: 'element',
          tagName: 'div',
          properties: {
            className: options.wrapperClasses
          }
        }
        // @ts-expect-error - property children does not exist on type Element
        wrapper.children = tree.children
        tree.children = [wrapper]
      }
      if (options.wrapperComponent) {
        const wrapper = {
          type: 'element',
          tagName: options.wrapperComponent,
          properties: {}
        }
        // @ts-expect-error - property children does not exist on type Element
        wrapper.children = tree.children
        tree.children = [wrapper]
      }
    }
  }
  return async (id: string, raw: string): Promise<TransformResult> => {
    const res = await compile(raw, {
      jsx: true,
      jsxImportSource: 'solid-js',
      providerImportSource: 'solid-mdx',
      rehypePlugins: [
        [
          rehypePrettyCode,
          {
            keepBackground: true,
            theme: JSON.parse(fs.readFileSync(path.join(__dirname, './moonlight-ii.json'), 'utf-8')),
            onVisitLine(node) {
              // Prevent lines from collapsing in `display: grid` mode, and allow empty
              // lines to be copy/pasted
              if (node.children.length === 0) {
                node.children = [{ type: 'text', value: ' ' }]
              }
            },
            onVisitHighlightedLine(node) {
              node.properties.className.push('line--highlighted')
            },
            onVisitHighlightedWord(node, id) {
              node.properties.className = ['word']

              if (id) {
                const backgroundColor = {
                  v: 'rgb(196 42 94 / 59%)',
                  s: 'rgb(0 103 163 / 56%)',
                  i: 'rgb(100 50 255 / 35%)'
                }[id]

                const color = {
                  v: 'rgb(255 225 225 / 100%)',
                  s: 'rgb(175 255 255 / 100%)',
                  i: 'rgb(225 200 255 / 100%)'
                }[id]

                if (node.properties['data-rehype-pretty-code-wrapper']) {
                  node.children.forEach((childNode: any) => {
                    childNode.properties.style = ''
                  })
                }

                node.properties.style = `background-color: ${backgroundColor}; color: ${color};`
              }
            }
          } as RehypePrettyCodeOptions
        ],
        rehypeWrapperClasses
      ],
      remarkPlugins: [remarkGfm, remarkFrontmatter]
    })

    return {
      code: String(res),
      map: { mappings: '' } as any
    }
  }
}
