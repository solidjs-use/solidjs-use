import { createMemo } from 'solid-js'
import { useTimeoutFn } from '../useTimeoutFn'
import { noop } from '../utils'
import type { Accessor } from 'solid-js'
import type { UseTimeoutFnOptions } from '../useTimeoutFn'
import type { Fn, Stoppable } from '../utils'

export interface UseTimeoutOptions<Controls extends boolean> extends UseTimeoutFnOptions {
  /**
   * Expose more controls
   *
   * @default false
   */
  controls?: Controls
  /**
   * Callback on timeout
   */
  callback?: Fn
}

/**
 * Update value after a given time with controls.
 */
export function useTimeout(interval?: number, options?: UseTimeoutOptions<false>): Accessor<boolean>
export function useTimeout(interval: number, options: UseTimeoutOptions<true>): { ready: Accessor<boolean> } & Stoppable
export function useTimeout(interval = 1000, options: UseTimeoutOptions<boolean> = {}) {
  const { controls: exposeControls = false, callback } = options

  const controls = useTimeoutFn(callback ?? noop, interval, options)

  const ready = createMemo(() => !controls.isPending())

  if (exposeControls) {
    return {
      ready,
      ...controls
    }
  }
  return ready
}
