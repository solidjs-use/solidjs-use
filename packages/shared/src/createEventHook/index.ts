import { tryOnCleanup } from '../tryOnCleanup'

/**
 * The source code for this function was inspired by vue-apollo's `useEventHook` util
 * https://github.com/vuejs/vue-apollo/blob/v4/packages/vue-apollo-composable/src/util/useEventHook.ts
 */
export type EventHookOn<T = any> = (fn: (param: T) => void) => { off: () => void }
export type EventHookOff<T = any> = (fn: (param: T) => void) => void
export type EventHookTrigger<T = any> = (param: T) => Promise<unknown[]>

export interface EventHook<T = any> {
  on: EventHookOn<T>
  off: EventHookOff<T>
  trigger: EventHookTrigger<T>
}

/**
 * Utility for creating event hooks.
 *
 * @see https://solidjs-use.github.io/solidjs-use/shared/createEventHook
 */
export function createEventHook<T = any>(): EventHook<T> {
  const fns: Set<(param: T) => void> = new Set()

  const off = (fn: (param: T) => void) => {
    fns.delete(fn)
  }

  const on = (fn: (param: T) => void) => {
    fns.add(fn)
    const offFn = () => off(fn)

    tryOnCleanup(offFn)

    return {
      off: offFn
    }
  }

  const trigger = (param: T) => {
    return Promise.all(Array.from(fns).map(fn => fn(param)))
  }

  return {
    on,
    off,
    trigger
  }
}
