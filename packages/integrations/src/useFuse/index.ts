import Fuse from 'fuse.js'
import { createEffect, createMemo, createSignal, on } from 'solid-js'
import { resolveAccessor, unAccessor } from 'solidjs-use'
import type { Accessor } from 'solid-js'
import type { MaybeAccessor } from 'solidjs-use'

export type FuseOptions<T> = Fuse.IFuseOptions<T>
export interface UseFuseOptions<T> {
  fuseOptions?: FuseOptions<T>
  resultLimit?: number
  matchAllWhenSearchEmpty?: boolean
}

export function useFuse<DataItem>(
  search: MaybeAccessor<string>,
  data: MaybeAccessor<DataItem[]>,
  options?: MaybeAccessor<UseFuseOptions<DataItem>>
) {
  const createFuse = () => {
    return new Fuse(unAccessor(data) ?? [], unAccessor(options)?.fuseOptions)
  }

  const [fuse, setFuse] = createSignal<Fuse<DataItem>>(createFuse())

  createEffect(
    on(
      () => unAccessor(options)?.fuseOptions,
      () => {
        setFuse(createFuse())
      }
    )
  )
  createEffect(
    on(resolveAccessor(data), newData => {
      fuse().setCollection(newData)
    })
  )

  const results: Accessor<Array<Fuse.FuseResult<DataItem>>> = createMemo(() => {
    const resolved = unAccessor(options)
    // This will also be recomputed when `data` changes, as it causes a change
    // to the Fuse instance, which is tracked here.
    if (resolved?.matchAllWhenSearchEmpty && !unAccessor(search))
      return unAccessor(data).map((item, index) => ({ item, refIndex: index }))

    const limit = resolved?.resultLimit
    return fuse().search(unAccessor(search), limit ? { limit } : undefined)
  })

  return {
    fuse,
    results
  }
}

export type UseFuseReturn = ReturnType<typeof useFuse>
