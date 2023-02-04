import { watch } from '../watch'
import type { Accessor, OnOptions } from 'solid-js/types/reactive/signal'

export declare type WatchArrayCallback<V = any, OV = any> = (value: V, oldValue: OV, added: V, removed: OV) => any

/**
 * Watch for an array with additions and removals.
 */
export function watchArray<T, Defer extends Readonly<boolean> = false>(
  source: Accessor<T[]>,
  cb: WatchArrayCallback<T[], Defer extends false ? T[] | undefined : T[]>,
  options?: OnOptions
) {
  let oldList: T[] = options?.defer === true ? source() : []
  return watch(
    source,
    newList => {
      const oldListRemains = new Array<boolean>(oldList.length)
      const added: T[] = []
      for (const obj of newList) {
        let found = false
        for (let i = 0; i < oldList.length; i++) {
          if (!oldListRemains[i] && obj === oldList[i]) {
            oldListRemains[i] = true
            found = true
            break
          }
        }
        if (!found) added.push(obj)
      }
      const removed = oldList.filter((_, i) => !oldListRemains[i])
      cb(newList, oldList, added, removed)
      oldList = [...newList]
    },
    options
  )
}
