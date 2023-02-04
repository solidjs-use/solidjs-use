import { noop, tryOnCleanup, unAccessor, watch } from '@solidjs-use/shared'
import { useSupported } from '../useSupported'
import { defaultWindow } from '../_configurable'
import type { MaybeElementAccessor } from '@solidjs-use/shared'
import type { ConfigurableWindow } from '../_configurable'

export interface UseIntersectionObserverOptions extends ConfigurableWindow {
  /**
   * The Element or Document whose bounds are used as the bounding box when testing for intersection.
   */
  root?: MaybeElementAccessor

  /**
   * A string which specifies a set of offsets to add to the root's bounding_box when calculating intersections.
   */
  rootMargin?: string

  /**
   * Either a single number or an array of numbers between 0.0 and 1.
   */
  threshold?: number | number[]
}

/**
 * Detects that a target element's visibility.
 */
export function useIntersectionObserver(
  target: MaybeElementAccessor,
  callback: IntersectionObserverCallback,
  options: UseIntersectionObserverOptions = {}
) {
  const { root, rootMargin = '0px', threshold = 0.1, window = defaultWindow } = options

  const isSupported = useSupported(() => window && 'IntersectionObserver' in window)

  let cleanup = noop

  const stopWatch = isSupported()
    ? watch(
        () => ({
          el: unAccessor(target),
          root: unAccessor(root)
        }),
        ({ el, root }) => {
          cleanup()

          if (!el) return

          const observer = new IntersectionObserver(callback, {
            root,
            rootMargin,
            threshold
          })
          observer.observe(el)

          cleanup = () => {
            observer.disconnect()
            cleanup = noop
          }
        }
      )
    : noop

  const stop = () => {
    cleanup()
    stopWatch()
  }

  tryOnCleanup(stop)

  return {
    isSupported,
    stop
  }
}

export type UseIntersectionObserverReturn = ReturnType<typeof useIntersectionObserver>
