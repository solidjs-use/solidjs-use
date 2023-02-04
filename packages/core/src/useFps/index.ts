import { createSignal } from 'solid-js'
import { useRafFn } from '../useRafFn'
import type { Accessor } from 'solid-js'

export interface UseFpsOptions {
  /**
   * Calculate the FPS on every x frames.
   * @default 10
   */
  every?: number
}

export function useFps(options?: UseFpsOptions): Accessor<number> {
  const [fps, setFps] = createSignal(0)
  if (typeof performance === 'undefined') return fps
  const every = options?.every ?? 10

  let last = performance.now()
  let ticks = 0

  useRafFn(() => {
    ticks += 1
    if (ticks >= every) {
      const now = performance.now()
      const diff = now - last
      setFps(Math.round(1000 / (diff / ticks)))
      last = now
      ticks = 0
    }
  })

  return fps
}
