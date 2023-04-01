import { tryOnCleanup, tryOnMount, watch } from '@solidjs-use/shared'
import { toSignal } from '@solidjs-use/shared/solid-to-vue'
import { createSignal } from 'solid-js'
import { defaultDocument } from '../_configurable'
import type { Accessor } from 'solid-js'
import type { SimpleSetter } from '@solidjs-use/shared/solid-to-vue'
import type { MaybeSignal } from '@solidjs-use/shared'
import type { ConfigurableDocument } from '../_configurable'

export interface UseStyleTagOptions extends ConfigurableDocument {
  /**
   * Media query for styles to apply
   */
  media?: string

  /**
   * Load the style immediately
   *
   * @default true
   */
  immediate?: boolean

  /**
   * Manual controls the timing of loading and unloading
   *
   * @default false
   */
  manual?: boolean

  /**
   * DOM id of the style tag
   *
   * @default auto-incremented
   */
  id?: string
}

export interface UseStyleTagReturn {
  id: string
  css: Accessor<string>
  setCss: SimpleSetter<string>
  load: () => void
  unload: () => void
  isLoaded: Accessor<boolean>
}

let _id = 0

/**
 * Inject <style> element in head.
 *
 * @see https://solidjs-use.github.io/solidjs-use/core/useStyleTag
 */
export function useStyleTag(css: MaybeSignal<string>, options: UseStyleTagOptions = {}): UseStyleTagReturn {
  const [isLoaded, setIsLoaded] = createSignal(false)

  const {
    document = defaultDocument,
    immediate = true,
    manual = false,
    id = `solidjs-use_style_tag_${++_id}`
  } = options

  const [cssAccessor, setCss] = toSignal(css)

  let stop = () => {}
  const load = () => {
    if (!document) return

    const el = (document.getElementById(id) ?? document.createElement('style')) as HTMLStyleElement

    if (!el.isConnected) {
      el.type = 'text/css'
      el.id = id
      if (options.media) el.media = options.media
      document.head.appendChild(el)
    }

    if (isLoaded()) return

    stop = watch(cssAccessor, value => {
      el.innerText = value
    })

    setIsLoaded(true)
  }

  const unload = () => {
    if (!document || !isLoaded()) return
    stop()
    document.head.removeChild(document.getElementById(id) as HTMLStyleElement)
    setIsLoaded(false)
  }

  if (immediate && !manual) tryOnMount(load)

  if (!manual) tryOnCleanup(unload)

  return {
    id,
    css: cssAccessor,
    setCss,
    unload,
    load,
    isLoaded
  }
}
