import { isAccessor, toSignal } from '@solidjs-use/shared/solid-to-vue'
import { createEffect, on } from 'solid-js'
import { defaultDocument } from '../_configurable'
import type { Accessor, Signal } from 'solid-js'
import type { MaybeSignal } from '@solidjs-use/shared'
import type { ConfigurableDocument } from '../_configurable'

export interface UseFaviconOptions extends ConfigurableDocument {
  baseUrl?: string
  rel?: string
}

/**
 * Reactive favicon.
 *
 * @see https://solidjs-use.github.io/solidjs-use/core/useFavicon
 */
export function useFavicon(
  newIcon?: string | null | undefined | Signal<string | null | undefined>,
  options?: UseFaviconOptions
): Signal<string | null | undefined>
export function useFavicon(
  newIcon: Accessor<string | null | undefined>,
  options?: UseFaviconOptions
): Accessor<string | null | undefined>
export function useFavicon(newIcon: MaybeSignal<string | null | undefined> = null, options: UseFaviconOptions = {}) {
  const { baseUrl = '', rel = 'icon', document = defaultDocument } = options

  const [favicon, setFavicon] = toSignal(newIcon)

  const applyIcon = (icon: string) => {
    document?.head
      .querySelectorAll<HTMLLinkElement>(`link[rel*="${rel}"]`)
      .forEach(el => (el.href = `${baseUrl}${icon}`))
  }

  createEffect(
    on(favicon, (i, o) => {
      if (typeof i === 'string' && i !== o) applyIcon(i)
    })
  )

  if (isAccessor(newIcon)) {
    return favicon
  }
  return [favicon, setFavicon]
}

export type UseFaviconReturn = ReturnType<typeof useFavicon>
