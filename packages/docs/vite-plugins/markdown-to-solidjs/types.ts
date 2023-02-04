import type { PluggableList } from '@mdx-js/mdx/lib/core'
import type { FilterPattern } from 'vite'

export interface Options {
  /**
   * Class names for wrapper div
   *
   * @default 'markdown-body'
   */
  wrapperClasses?: string | string[]

  /**
   * Component name to wrapper with
   *
   * @default undefined
   */
  wrapperComponent?: string | undefined | null

  /**
   * Remark plugins to use
   *
   * @default []
   */
  remarkPlugins?: PluggableList

  /**
   * Rehype plugins to use
   *
   * @default []
   */
  rehypePlugins?: PluggableList

  include?: FilterPattern
  exclude?: FilterPattern
}

export interface ResolvedOptions extends Required<Options> {
  wrapperClasses: string
}
