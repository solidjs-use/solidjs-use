import { tryOnCleanup } from '@solidjs-use/shared'
import { useSupported } from '../useSupported'
import { defaultWindow } from '../_configurable'
import type { ConfigurableWindow } from '../_configurable'

export type UsePerformanceObserverOptions = PerformanceObserverInit &
  ConfigurableWindow & {
    /**
     * Start the observer immediate.
     *
     * @default true
     */
    immediate?: boolean
  }

/**
 * Observe performance metrics.
 */
export function usePerformanceObserver(options: UsePerformanceObserverOptions, callback: PerformanceObserverCallback) {
  const { window = defaultWindow, immediate = true, ...performanceOptions } = options

  const isSupported = useSupported(() => window && 'PerformanceObserver' in window)

  let observer: PerformanceObserver | undefined

  const stop = () => {
    observer?.disconnect()
  }

  const start = () => {
    if (isSupported()) {
      stop()
      observer = new PerformanceObserver(callback)
      observer.observe(performanceOptions)
    }
  }

  tryOnCleanup(stop)

  if (immediate) start()

  return {
    isSupported,
    start,
    stop
  }
}
