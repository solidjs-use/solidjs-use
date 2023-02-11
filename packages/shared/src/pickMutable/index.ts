import { createMemo } from 'solid-js'
import { toReactive } from '../toReactive'

/**
 * Reactively pick fields from a reactive object
 */
export function pickMutable<T extends object, K extends keyof T>(obj: T, ...keys: Array<K | K[]>): { [S in K]: T[S] } {
  const flatKeys = keys.flat() as K[]
  return toReactive(
    createMemo(() => {
      const res: any = {}
      const allKeys = Object.keys(obj) as K[]
      allKeys
        .filter(key => flatKeys.includes(key))
        .forEach(key => {
          if (key in obj) {
            res[key] = obj[key]
          }
        })
      return res
    })
  )
}
