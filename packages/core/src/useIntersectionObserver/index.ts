import { noop, tryOnCleanup, toValue, watch, notNullish } from '@solidjs-use/shared'
import { createMemo, createSignal } from 'solid-js'
import { useSupported } from '../useSupported'
import { defaultWindow } from '../_configurable'
import type { Accessor } from 'solid-js'
import type { MaybeElementAccessor, Pausable, MaybeAccessor } from '@solidjs-use/shared'
import type { ConfigurableWindow } from '../_configurable'

export interface UseIntersectionObserverOptions extends ConfigurableWindow {
  /**
   * Start the IntersectionObserver immediately on creation
   *
   * @default true
   */
  immediate?: boolean

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

export interface UseIntersectionObserverReturn extends Pausable {
  isSupported: Accessor<boolean>
  stop: () => void
}

/**
 * Detects that a target element's visibility.
 *
 * @see https://solidjs-use.github.io/solidjs-use/core/useIntersectionObserver
 */
export function useIntersectionObserver(
  target: MaybeElementAccessor | MaybeAccessor<MaybeElementAccessor[]> | MaybeElementAccessor[],
  callback: IntersectionObserverCallback,
  options: UseIntersectionObserverOptions = {}
): UseIntersectionObserverReturn {
  const { root, rootMargin = '0px', threshold = 0.1, window = defaultWindow, immediate = true } = options

  const isSupported = useSupported(() => window && 'IntersectionObserver' in window)
  const targets = createMemo(() => {
    const _target = toValue(target)
    return (Array.isArray(_target) ? _target : [_target]).map(toValue).filter(notNullish)
  })
  let cleanup = noop
  const [isActive, setIsActive] = createSignal(immediate)

  const stopWatch = isSupported()
    ? watch(
        () => [targets(), toValue(root), isActive] as const,
        ([targets, root, isActive]) => {
          cleanup()

          if (!isActive) return

          if (!targets.length) return

          const observer = new IntersectionObserver(callback, {
            root: toValue(root),
            rootMargin,
            threshold
          })
          targets.forEach(el => el && observer.observe(el))

          cleanup = () => {
            observer.disconnect()
            cleanup = noop
          }
        },
        { defer: !immediate }
      )
    : noop

  const stop = () => {
    cleanup()
    stopWatch()
    setIsActive(false)
  }

  tryOnCleanup(stop)

  return {
    isSupported,
    isActive,
    pause() {
      cleanup()
      setIsActive(false)
    },
    resume() {
      setIsActive(true)
    },
    stop
  }
}
