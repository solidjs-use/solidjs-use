import { isAccessor } from '@solidjs-use/solid-to-vue'
import { createMutable } from 'solid-js/store'
import { unAccessor } from '../unAccessor'
import type { MaybeAccessor } from '../utils'

/**
 * Converts Accessor to reactive.
 */
export function toReactive<T extends object>(objectAccessor: MaybeAccessor<T>): T {
  if (!isAccessor<T>(objectAccessor)) return createMutable(objectAccessor)

  const proxy = new Proxy(
    {},
    {
      get(_, p, receiver) {
        return unAccessor(Reflect.get(objectAccessor(), p, receiver))
      },
      has(_, p) {
        return Reflect.has(objectAccessor(), p)
      },
      ownKeys() {
        return Object.keys(objectAccessor())
      },
      getOwnPropertyDescriptor() {
        return {
          enumerable: true,
          configurable: true
        }
      }
    }
  )

  return proxy as T
}
