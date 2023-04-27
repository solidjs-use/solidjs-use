import { toValue, tryOnCleanup } from '@solidjs-use/shared'
import { toSignal, writableComputed } from '@solidjs-use/shared/solid-to-vue'
import { createEffect, createMemo, on } from 'solid-js'
import { getSSRHandler } from '../ssr-handlers'
import { usePreferredDark } from '../usePreferredDark'
import { useStorage } from '../useStorage'
import { defaultWindow } from '../_configurable'
import type { MaybeAccessor, MaybeElementAccessor } from '@solidjs-use/shared'
import type { UseStorageOptions } from '../useStorage'
import type { Signal } from 'solid-js'
import type { StorageLike } from '../ssr-handlers'

export type BasicColorMode = 'light' | 'dark'
export type BasicColorSchema = BasicColorMode | 'auto'

export interface UseColorModeOptions<T extends string = BasicColorMode> extends UseStorageOptions<T | BasicColorMode> {
  /**
   * CSS Selector for the target element applying to
   *
   * @default 'html'
   */
  selector?: string | MaybeElementAccessor

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
  initialValue?: MaybeAccessor<T | BasicColorSchema>

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
  onChanged?: (mode: T | BasicColorMode, defaultHandler: (mode: T | BasicColorMode) => void) => void

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
   * @deprecated use `store()` when `auto` mode needs to be known
   */
  emitAuto?: boolean

  /**
   * Disable transition on switch
   *
   * @see https://paco.me/writing/disable-theme-transitions
   * @default true
   */
  disableTransition?: boolean
}

/**
 * Reactive color mode with auto data persistence.
 *
 * @see https://solidjs-use.github.io/solidjs-use/core/useColorMode
 */
export function useColorMode<T extends string = BasicColorMode>(options: UseColorModeOptions<T> = {}) {
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
    disableTransition = true
  } = options

  const modes = {
    auto: '',
    light: 'light',
    dark: 'dark',
    ...(options.modes ?? {})
  } as Record<BasicColorSchema | T, string>

  const preferredDark = usePreferredDark({ window })
  const system = createMemo(() => (preferredDark() ? 'dark' : 'light'))

  const [store, setStore] = (storageSignal ??
    (storageKey == null
      ? toSignal(initialValue)
      : useStorage(storageKey, initialValue, storage, { window, listenToStorageChanges }))) as Signal<
    T | BasicColorSchema
  >

  const state = createMemo(() => {
    const value = store()
    return value === 'auto' ? system() : value
  })

  const updateHTMLAttrs = getSSRHandler('updateHTMLAttrs', (selector, attribute, value) => {
    const el = typeof selector === 'string' ? window?.document.querySelector(selector) : toValue(selector)
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

  function defaultOnChanged(mode: T | BasicColorMode) {
    updateHTMLAttrs(selector, attribute, modes[mode] ?? mode)
  }

  function onChanged(mode: T | BasicColorMode) {
    if (options.onChanged) options.onChanged(mode, defaultOnChanged)
    else defaultOnChanged(mode)
  }

  createEffect(on(state, onChanged))

  tryOnCleanup(() => onChanged(state()))

  const [mode, setMode] = writableComputed({
    get() {
      return emitAuto ? store() : state()
    },
    set(v) {
      setStore(v as BasicColorMode)
    }
  })

  return { mode, setMode, store, setStore, system, state }
}
