import { isAccessor } from '@solidjs-use/solid-to-vue'
import { createEffect, createSignal, on } from 'solid-js'
import { isObject } from '../utils'
import { toAccessors } from '../toAccessors'
import type { Accessor, AccessorArray, OnOptions } from 'solid-js/types/reactive/signal'

export type WatchOptions = OnOptions
export type WatchStopHandle = () => void
export type WatchDeps<S> = AccessorArray<S> | Accessor<S> | S
export type WatchSource<S> = WatchDeps<S>
export type WatchCallback<S, Next extends Prev = any, Prev = Next> = (
  input: S,
  prevInput: S | undefined,
  prev: Prev
) => void | Next | Promise<void | Next>

/**
 * Shorthand for `createEffect(on()))` and return stop handler
 */
export function watch<S, Next extends Prev, Prev = Next>(
  deps: WatchDeps<S>,
  fn: WatchCallback<S, Next, Prev>,
  options?: OnOptions
) {
  const [isWatch, setIsWatch] = createSignal(true)

  createEffect(
    on(
      getAccessors(deps),
      (input, prevInput, prev) => {
        if (isWatch()) {
          fn(input, prevInput, prev as any)
        }
      },
      options as any
    )
  )

  const stop = () => {
    setIsWatch(false)
  }
  return stop
}

function getAccessors<S>(deps: WatchDeps<S>): AccessorArray<S> | Accessor<S> {
  if (Array.isArray(deps)) return deps
  if (isObject(deps)) {
    return Object.values(toAccessors(deps)) as AccessorArray<S>
  }
  if (isAccessor<S>(deps)) return deps
  return () => deps
}
