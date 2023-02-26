import { tryOnCleanup } from '@solidjs-use/shared'
import { writableComputed } from '@solidjs-use/shared/solid-to-vue'
import { createEffect, createMemo, createSignal, on } from 'solid-js'
import { getSSRHandler } from '../ssr-handlers'
import { usePreferredDark } from '../usePreferredDark'
import { useStorage } from '../useStorage'
import { defaultWindow } from '../_configurable'
import type { UseStorageOptions } from '../useStorage'
import type { Accessor, Signal } from 'solid-js'
import type { ComputedSetter } from '@solidjs-use/shared/solid-to-vue'
import type { StorageLike } from '../ssr-handlers'

export type BasicColorSchema = 'light' | 'dark' | 'auto'

export interface UseColorModeOptions<T extends string = BasicColorSchema>
  extends UseStorageOptions<T | BasicColorSchema> {
  /**
   * CSS Selector for the target element applying to
   *
   * @default 'html'
   */
  selector?: string

  /**
   * HTML attribute applying the target element
   *
   * @default 'class'
   */
  attribute?: string

  /**
   * The initial color mode
   *
   * @default 'auto'
   */
  initialValue?: T | BasicColorSchema

  /**
   * Prefix when adding value to the attribute
   */
  modes?: Partial<Record<T | BasicColorSchema, string>>

  /**
   * A custom handler for handle the updates.
   * When specified, the default behavior will be overridden.
   *
   * @default undefined
   */
  onChanged?: (mode: T | BasicColorSchema, defaultHandler: (mode: T | BasicColorSchema) => void) => void

  /**
   * Custom storage Signal
   *
   * When provided, `useStorage` will be skipped
   */
  storageSignal?: Signal<T | BasicColorSchema>

  /**
   * Key to persist the data into localStorage/sessionStorage.
   *
   * Pass `null` to disable persistence
   *
   * @default 'solidjs-use-color-scheme'
   */
  storageKey?: string | null

  /**
   * Storage object, can be localStorage or sessionStorage
   *
   * @default localStorage
   */
  storage?: StorageLike

  /**
   * Emit `auto` mode from state
   *
   * When set to `true`, preferred mode won't be translated into `light` or `dark`.
   * This is useful when the fact that `auto` mode was selected needs to be known.
   *
   * @default undefined
   */
  emitAuto?: boolean

  /**
   * Disable transition on switch
   *
   * @see https://paco.me/writing/disable-theme-transitions
   * @default false
   */
  disableTransition?: boolean
}

/**
 * Reactive color mode with auto data persistence.
 */
export function useColorMode<T extends string = BasicColorSchema>(
  options: UseColorModeOptions<T> = {}
): [Accessor<T | BasicColorSchema>, ComputedSetter<T | BasicColorSchema>] {
  const {
    selector = 'html',
    attribute = 'class',
    initialValue = 'auto',
    window = defaultWindow,
    storage,
    storageKey = 'solidjs-use-color-scheme',
    listenToStorageChanges = true,
    storageSignal,
    emitAuto,
    disableTransition = false
  } = options

  const modes = {
    auto: '',
    light: 'light',
    dark: 'dark',
    ...(options.modes ?? {})
  } as Record<BasicColorSchema | T, string>

  const preferredDark = usePreferredDark({ window })
  const preferredMode = createMemo(() => (preferredDark() ? 'dark' : 'light'))

  const [store, setStore] = (storageSignal ??
    (storageKey == null
      ? createSignal(initialValue)
      : useStorage(storageKey, initialValue, storage, { window, listenToStorageChanges }))) as Signal<
    T | BasicColorSchema
  >

  const [state, setState] = writableComputed<T | BasicColorSchema>({
    get() {
      return store() === 'auto' && !emitAuto ? preferredMode() : store()
    },
    set(v: any) {
      setStore(v)
    }
  })

  const updateHTMLAttrs = getSSRHandler('updateHTMLAttrs', (selector, attribute, value) => {
    const el = window?.document.querySelector(selector)
    if (!el) return

    let style: HTMLStyleElement | undefined
    if (disableTransition) {
      style = window!.document.createElement('style')
      style.type = 'text/css'
      style.appendChild(
        document.createTextNode(
          '*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}'
        )
      )
      window!.document.head.appendChild(style)
    }

    if (attribute === 'class') {
      const current = value.split(/\s/g)
      Object.values(modes)
        .flatMap(i => (i || '').split(/\s/g))
        .filter(Boolean)
        .forEach(v => {
          if (current.includes(v)) el.classList.add(v)
          else el.classList.remove(v)
        })
    } else {
      el.setAttribute(attribute, value)
    }

    if (disableTransition) {
      // Calling getComputedStyle forces the browser to redraw
      // @ts-expect-error unused variable
      const _ = window!.getComputedStyle(style!).opacity
      document.head.removeChild(style!)
    }
  })

  function defaultOnChanged(mode: T | BasicColorSchema) {
    const resolvedMode = mode === 'auto' ? preferredMode() : mode
    updateHTMLAttrs(selector, attribute, modes[resolvedMode] ?? resolvedMode)
  }

  function onChanged(mode: T | BasicColorSchema) {
    if (options.onChanged) options.onChanged(mode, defaultOnChanged)
    else defaultOnChanged(mode)
  }

  createEffect(on(state, onChanged))

  if (emitAuto) {
    createEffect(on(preferredMode, () => onChanged(state())))
  }
  tryOnCleanup(() => onChanged(state()))

  return [state, setState]
}
