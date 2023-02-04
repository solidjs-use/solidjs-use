import { createFilter } from 'vite'
import { createMarkdown } from './markdown'
import { resolveOptions } from './options'
import type { Plugin } from 'vite'
import type { Options } from './types'

function VitePluginSolidMarkdown(userOptions: Options = {}): Plugin {
  const filter = createFilter(userOptions.include ?? /\.(mdx?|md)$/, userOptions.exclude ?? /node_modules/)

  const options = resolveOptions(userOptions)
  const markdownToSolid = createMarkdown(options)

  return {
    name: 'vite-plugin-solid-markdown',
    enforce: 'pre',
    async transform(raw, id) {
      if (!filter(id)) return

      try {
        return await markdownToSolid(id, raw)
      } catch (e: any) {
        this.error(e)
      }
    },
    handleHotUpdate(ctx) {
      if (!filter(ctx.file)) return

      const defaultRead = ctx.read
      ctx.read = async function () {
        return (await markdownToSolid(ctx.file, await defaultRead())).code
      }
    }
  }
}

export default VitePluginSolidMarkdown
