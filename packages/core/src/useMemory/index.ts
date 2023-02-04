import { createSignal } from 'solid-js'
import { useIntervalFn } from '@solidjs-use/shared'
import { useSupported } from '../useSupported'
import type { UseIntervalFnOptions } from '@solidjs-use/shared'

/**
 * Performance.memory
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Performance/memory
 */
export interface MemoryInfo {
  /**
   * The maximum size of the heap, in bytes, that is available to the context.
   */
  readonly jsHeapSizeLimit: number
  /**
   *  The total allocated heap size, in bytes.
   */
  readonly totalJSHeapSize: number
  /**
   * The currently active segment of JS heap, in bytes.
   */
  readonly usedJSHeapSize: number

  [Symbol.toStringTag]: 'MemoryInfo'
}

export interface UseMemoryOptions extends UseIntervalFnOptions {
  interval?: number
}

type PerformanceMemory = Performance & {
  memory: MemoryInfo
}

/**
 * Reactive Memory Info.
 */
export function useMemory(options: UseMemoryOptions = {}) {
  const [memory, setMemory] = createSignal<MemoryInfo>()
  const isSupported = useSupported(() => typeof performance !== 'undefined' && 'memory' in performance)

  if (isSupported()) {
    const { interval = 1000 } = options
    useIntervalFn(
      () => {
        setMemory((performance as PerformanceMemory).memory)
      },
      interval,
      { immediate: options.immediate, immediateCallback: options.immediateCallback }
    )
  }

  return { isSupported, memory }
}

export type UseMemoryReturn = ReturnType<typeof useMemory>
