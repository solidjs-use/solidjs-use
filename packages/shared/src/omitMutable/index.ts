import { createMemo } from 'solid-js'
import { createMutable } from 'solid-js/store'
/**
 * Reactively omit fields from a reactive object.
 *
 * @see https://solidjs-use.github.io/solidjs-use/shared/omitMutable
 */
export function omitMutable<T extends object, K extends keyof T>(obj: T, ...keys: Array<K | K[]>): Omit<T, K> {
  const res: any = createMutable({})
  const validKeys = createMemo<any>(() => {
    const flatKeys = keys.flat() as K[]
    const allKeys = Object.keys(obj) as K[]
    const validKeys = allKeys.filter(key => !flatKeys.includes(key))
    return validKeys
  })
  return new Proxy({} as any, {
    get(_, p, receiver) {
      if (validKeys().includes(p)) {
        return Reflect.get(obj, p, receiver)
      }
      return Reflect.get(res, p, receiver)
    },
    set(_, p, newValue, receiver) {
      if (validKeys().includes(p)) {
        return Reflect.set(obj, p, newValue, receiver)
      }
      return Reflect.set(res, p, newValue, receiver)
    },
    ownKeys() {
      return [...validKeys(), ...Object.keys(res)]
    },
    getOwnPropertyDescriptor() {
      return {
        enumerable: true,
        configurable: true
      }
    }
  })
}
