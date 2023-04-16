import Fuse from 'fuse.js'
import { createEffect, createMemo, createSignal, on } from 'solid-js'
import { toAccessor, toValue } from 'solidjs-use'
import type { Accessor } from 'solid-js'
import type { MaybeAccessor } from 'solidjs-use'

export type FuseOptions<T> = Fuse.IFuseOptions<T>
export interface UseFuseOptions<T> {
  fuseOptions?: FuseOptions<T>
  resultLimit?: number
  matchAllWhenSearchEmpty?: boolean
}

/**
 * Easily implement fuzzy search using a composable with Fuse.js.
 *
 * @see https://solidjs-use.github.io/solidjs-use/integrations/useFuse
 * @see https://github.com/krisk/fuse
 */
export function useFuse<DataItem>(
  search: MaybeAccessor<string>,
  data: MaybeAccessor<DataItem[]>,
  options?: MaybeAccessor<UseFuseOptions<DataItem>>
) {
  const createFuse = () => {
    return new Fuse(toValue(data) ?? [], toValue(options)?.fuseOptions)
  }

  const [fuse, setFuse] = createSignal<Fuse<DataItem>>(createFuse())

  createEffect(
    on(
      () => toValue(options)?.fuseOptions,
      () => {
        setFuse(createFuse())
      }
    )
  )
  createEffect(
    on(toAccessor(data), newData => {
      fuse().setCollection(newData)
    })
  )

  const results: Accessor<Array<Fuse.FuseResult<DataItem>>> = createMemo(() => {
    const resolved = toValue(options)
    // This will also be recomputed when `data` changes, as it causes a change
    // to the Fuse instance, which is tracked here.
    if (resolved?.matchAllWhenSearchEmpty && !toValue(search))
      return toValue(data).map((item, index) => ({ item, refIndex: index }))

    const limit = resolved?.resultLimit
    return fuse().search(toValue(search), limit ? { limit } : undefined)
  })

  return {
    fuse,
    results
  }
}

export type UseFuseReturn = ReturnType<typeof useFuse>
