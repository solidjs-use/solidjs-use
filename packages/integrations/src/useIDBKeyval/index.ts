import { toSignal } from 'solidjs-use/solid-to-vue'
import { del, get, set, update } from 'idb-keyval'
import { createEffect, on } from 'solid-js'
import { unAccessor } from 'solidjs-use'
import type { Accessor, Setter } from 'solid-js'
import type { MaybeAccessor } from 'solidjs-use'

export interface UseIDBOptions {
  /**
   * On error callback
   *
   * Default log error to `console.error`
   */
  onError?: (error: unknown) => void
}

export function useIDBKeyval<T>(
  key: IDBValidKey,
  initialValue: MaybeAccessor<T>,
  options: UseIDBOptions = {}
): [Accessor<T>, Setter<T | null | undefined>] {
  const {
    onError = e => {
      console.error(e)
    }
  } = options

  const [data, setData] = toSignal(initialValue) as [Accessor<T>, Setter<T | null | undefined>]
  const rawInit: T = unAccessor(initialValue)

  async function read() {
    try {
      const rawValue = await get<T>(key)
      if (rawValue === undefined) {
        if (rawInit !== undefined && rawInit !== null) {
          await set(key, rawInit)
        }
      } else {
        setData(() => rawValue)
      }
    } catch (e) {
      onError(e)
    }
  }

  read()

  createEffect(
    on(data, async () => {
      try {
        if (data() == null) {
          await del(key)
        } else {
          // IndexedDB does not support saving proxies, convert from proxy before saving
          if (Array.isArray(data())) await update(key, () => JSON.parse(JSON.stringify(data())))
          else if (typeof data() === 'object') await update(key, () => ({ ...data() }))
          else await update(key, () => data())
        }
      } catch (e) {
        onError(e)
      }
    })
  )

  return [data, setData]
}
