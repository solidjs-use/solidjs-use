import { timestamp, useIntervalFn } from '@solidjs-use/shared'
import { createSignal } from 'solid-js'
import { useRafFn } from '../useRafFn'
import type { Accessor, Signal } from 'solid-js'
import type { Pausable } from '@solidjs-use/shared'

export interface UseTimestampOptions<Controls extends boolean> {
  /**
   * Expose more controls
   *
   * @default false
   */
  controls?: Controls

  /**
   * Offset value adding to the value
   *
   * @default 0
   */
  offset?: number

  /**
   * Update the timestamp immediately
   *
   * @default true
   */
  immediate?: boolean

  /**
   * Update interval, or use requestAnimationFrame
   *
   * @default requestAnimationFrame
   */
  interval?: 'requestAnimationFrame' | number
  /**
   * Callback on each update
   */
  callback?: (timestamp: number) => void
}

/**
 * Reactive current timestamp.
 */
export function useTimestamp(options?: UseTimestampOptions<false>): Signal<number>
export function useTimestamp(options: UseTimestampOptions<true>): { timestamp: Accessor<number> } & Pausable
export function useTimestamp(options: UseTimestampOptions<boolean> = {}) {
  const {
    controls: exposeControls = false,
    offset = 0,
    immediate = true,
    interval = 'requestAnimationFrame',
    callback
  } = options

  const tsSignal = createSignal(timestamp() + offset)
  const [ts, setTs] = tsSignal

  const update = () => setTs(timestamp() + offset)
  const cb = callback
    ? () => {
        update()
        callback(ts())
      }
    : update

  const controls: Pausable =
    interval === 'requestAnimationFrame' ? useRafFn(cb, { immediate }) : useIntervalFn(cb, interval, { immediate })

  if (exposeControls) {
    return {
      timestamp: ts,
      ...controls
    }
  }
  return tsSignal
}

export type UseTimestampReturn = ReturnType<typeof useTimestamp>
