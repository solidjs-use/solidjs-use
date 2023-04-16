import { toValue } from '@solidjs-use/shared'
import { isAccessor, toSignal } from '@solidjs-use/shared/solid-to-vue'
import { createEffect, on } from 'solid-js'
import { useMutationObserver } from '../useMutationObserver'
import { defaultDocument } from '../_configurable'
import type { Accessor, Signal } from 'solid-js'
import type { MaybeAccessor } from '@solidjs-use/shared'
import type { ConfigurableDocument } from '../_configurable'

export type UseTitleOptionsBase =
  | {
      /**
       * Observe `document.title` changes using MutationObserve
       * Cannot be used together with `titleTemplate` option.
       *
       * @default false
       */
      observe?: boolean
    }
  | {
      /**
       * The template string to parse the title (e.g., '%s | My Website')
       * Cannot be used together with `observe` option.
       *
       * @default '%s'
       */
      titleTemplate?: MaybeAccessor<string> | ((title: string) => string)
    }

export type UseTitleOptions = ConfigurableDocument & UseTitleOptionsBase

export function useTitle(
  newTitle: Accessor<string | null | undefined>,
  options?: UseTitleOptions
): Accessor<string | null | undefined>

export function useTitle(
  newTitle?: string | null | undefined,
  options?: UseTitleOptions
): Signal<string | null | undefined>

/**
 * Reactive document title.
 *
 * @see https://solidjs-use.github.io/solidjs-use/core/useTitle
 */
export function useTitle(newTitle: MaybeAccessor<string | null | undefined> = null, options: UseTitleOptions = {}) {
  /*
    `titleTemplate` that returns the modified input string will make
    the `document.title` to be different from the `title.value`,
    causing the title to update infinitely if `observe` is set to `true`.
  */
  const { document = defaultDocument } = options

  const title = toSignal(newTitle ?? document?.title ?? null)
  const isReadonly = !!(newTitle && isAccessor(newTitle))

  function format(t: string) {
    if (!('titleTemplate' in options)) return t
    const template = options.titleTemplate ?? '%s'
    return typeof template === 'function' ? template(t) : toValue(template).replace(/%s/g, t)
  }

  createEffect(
    on(title[0], (t, o) => {
      if (t !== o && document) document.title = format(typeof t === 'string' ? t : '')
    })
  )

  if ((options as any).observe && !(options as any).titleTemplate && document && !isReadonly) {
    useMutationObserver(
      document.head?.querySelector('title'),
      () => {
        if (document && document.title !== title[0]()) title[1](format(document.title))
      },
      { childList: true }
    )
  }

  if (isReadonly) return title[0]
  return title
}

export type UseTitleReturn = ReturnType<typeof useTitle>
