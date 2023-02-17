import { resolveAccessor, tryOnCleanup, watch } from '@solidjs-use/shared'
import { useSupported } from '../useSupported'
import { defaultWindow } from '../_configurable'
import type { MaybeElementAccessor } from '@solidjs-use/shared'
import type { ConfigurableWindow } from '../_configurable'

export interface UseMutationObserverOptions extends MutationObserverInit, ConfigurableWindow {}

/**
 * Watch for changes being made to the DOM tree.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver MutationObserver MDN
 */
export function useMutationObserver(
  target: MaybeElementAccessor,
  callback: MutationCallback,
  options: UseMutationObserverOptions = {}
) {
  const { window = defaultWindow, ...mutationOptions } = options
  let observer: MutationObserver | undefined
  const isSupported = useSupported(() => window && 'MutationObserver' in window)

  const cleanup = () => {
    if (observer) {
      observer.disconnect()
      observer = undefined
    }
  }

  const stopWatch = watch(resolveAccessor(target), el => {
    cleanup()
    if (isSupported() && window && el) {
      observer = new MutationObserver(callback)
      observer.observe(el, mutationOptions)
    }
  })

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

export type UseMutationObserverReturn = ReturnType<typeof useMutationObserver>
