import { noop, unAccessor } from '@solidjs-use/shared'
import { isSignal } from '@solidjs-use/shared/solid-to-vue'
import { createMemo, createSignal } from 'solid-js'
import { createMutable } from 'solid-js/store'
import { useEventListener } from '../useEventListener'
import { defaultWindow } from '../_configurable'
import { DefaultMagicKeysAliasMap } from './aliasMap'
import type { Accessor } from 'solid-js'
import type { MaybeAccessor } from '@solidjs-use/shared'

export interface UseMagicKeysOptions {
  /**
   * Target for listening events
   *
   * @default window
   */
  target?: MaybeAccessor<EventTarget>

  /**
   * Alias map for keys, all the keys should be lowercase
   * { target: keycode }
   *
   * @example { ctrl: "control" }
   * @default <predefined-map>
   */
  aliasMap?: Record<string, string>

  /**
   * Register passive listener
   *
   * @default true
   */
  passive?: boolean

  /**
   * Custom event handler for keydown/keyup event.
   * Useful when you want to apply custom logic.
   *
   * When using `e.preventDefault()`, you will need to pass `passive: false` to useMagicKeys().
   */
  onEventFired?: (e: KeyboardEvent) => void | boolean
}

export interface MagicKeysInternal {
  /**
   * A Set of currently pressed keys,
   * Stores raw keyCodes.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
   */
  current: Set<string>
}

export type UseMagicKeysReturn = Readonly<
  Omit<Record<string, Accessor<boolean>>, keyof MagicKeysInternal> & MagicKeysInternal
>

export const getSetCompat = <T>() => {
  const data: T[] = createMutable([])
  return {
    value() {
      return data
    },
    add: (val: T) => {
      if (!data.includes(val)) {
        data.push(val)
      }
      return this
    },
    has: (val: T) => data.includes(val),
    delete: (val: T) => {
      const index = data.findIndex(item => item === val)
      if (index > -1) {
        data.splice(index, 1)
      }
      return true
    },
    clear: () => {
      data.length = 0
    }
  }
}

/**
 * Reactive keys pressed state, with magical keys combination support.
 *
 * @see https://solidjs-use.github.io/solidjs-use/core/useMagicKeys
 */
export function useMagicKeys(options?: UseMagicKeysOptions): UseMagicKeysReturn
export function useMagicKeys(options: UseMagicKeysOptions): UseMagicKeysReturn
export function useMagicKeys(options: UseMagicKeysOptions = {}): any {
  const { target = defaultWindow, aliasMap = DefaultMagicKeysAliasMap, passive = true, onEventFired = noop } = options
  const current = getSetCompat<string>()
  const obj = {
    toJSON() {
      return {}
    },
    current
  }
  const refs: Record<string, any> = obj
  const metaDeps = new Set<string>()
  const usedKeys = new Set<string>()

  function setRefs(key: string, value: boolean) {
    if (key in refs) {
      refs[key][1](value)
    }
  }

  function reset() {
    current.clear()
    for (const key of usedKeys) setRefs(key, false)
  }

  function updateRefs(e: KeyboardEvent, value: boolean) {
    const key = e.key?.toLowerCase()
    const code = e.code?.toLowerCase()
    const values = [code, key].filter(Boolean)

    // current set
    if (key) {
      if (value) current.add(key)
      else current.delete(key)
    }

    for (const key of values) {
      usedKeys.add(key)
      setRefs(key, value)
    }

    // #1312
    // In macOS, keys won't trigger "keyup" event when Meta key is released
    // We track it's combination and release manually
    if (key === 'meta' && !value) {
      // Meta key released
      metaDeps.forEach(key => {
        current.delete(key)
        setRefs(key, false)
      })
      metaDeps.clear()
    } else if (typeof e.getModifierState === 'function' && e.getModifierState('Meta') && value) {
      ;[...current.value(), ...values].forEach(key => metaDeps.add(key))
    }
  }

  useEventListener(
    target,
    'keydown',
    (e: KeyboardEvent) => {
      updateRefs(e, true)
      return onEventFired(e)
    },
    { passive }
  )
  useEventListener(
    target,
    'keyup',
    (e: KeyboardEvent) => {
      updateRefs(e, false)
      return onEventFired(e)
    },
    { passive }
  )

  useEventListener('blur', reset, { passive: true })
  useEventListener('focus', reset, { passive: true })

  const proxy = new Proxy(refs, {
    get(target, prop, rec) {
      if (typeof prop !== 'string') return Reflect.get(target, prop, rec)

      prop = prop.toLowerCase()
      // alias
      if (prop in aliasMap) prop = aliasMap[prop]
      // create new tracking
      if (!(prop in refs)) {
        if (/[+_-]/.test(prop)) {
          const keys = prop.split(/[+_-]/g).map(i => i.trim())
          refs[prop] = createMemo(() => keys.every(key => unAccessor(proxy[key])))
        } else {
          refs[prop] = createSignal(false)
        }
      }
      const r = Reflect.get(target, prop, rec)
      return isSignal(r) ? r[0] : r
    }
  })

  return proxy as any
}

export { DefaultMagicKeysAliasMap }
