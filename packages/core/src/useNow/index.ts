import { createSignal } from 'solid-js'
import { useIntervalFn } from '@solidjs-use/shared'
import { useRafFn } from '../useRafFn'
import type { Accessor } from 'solid-js'
import type { Pausable } from '@solidjs-use/shared'

export interface UseNowOptions<Controls extends boolean> {
  /**
   * Expose more controls
   *
   * @default false
   */
  controls?: Controls

  /**
   * Update interval, or use requestAnimationFrame
   *
   * @default requestAnimationFrame
   */
  interval?: 'requestAnimationFrame' | number
}

/**
 * Reactive current Date instance.
 */
export function useNow(options?: UseNowOptions<false>): Accessor<Date>
export function useNow(options: UseNowOptions<true>): { now: Accessor<Date> } & Pausable
export function useNow(options: UseNowOptions<boolean> = {}) {
  const { controls: exposeControls = false, interval = 'requestAnimationFrame' } = options

  const [now, setNow] = createSignal(new Date())

  const update = () => setNow(new Date())

  const controls: Pausable =
    interval === 'requestAnimationFrame'
      ? useRafFn(update, { immediate: true })
      : useIntervalFn(update, interval, { immediate: true })

  if (exposeControls) {
    return {
      now,
      ...controls
    }
  }
  return now
}

export type UseNowReturn = ReturnType<typeof useNow>
