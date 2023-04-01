import { tryOnCleanup, unAccessor, watch } from '@solidjs-use/shared'
import { createMemo } from 'solid-js'
import { useSupported } from '../useSupported'
import { defaultWindow } from '../_configurable'
import type { MaybeElementAccessor } from '@solidjs-use/shared'
import type { ConfigurableWindow } from '../_configurable'

export interface ResizeObserverSize {
  readonly inlineSize: number
  readonly blockSize: number
}

export interface ResizeObserverEntry {
  readonly target: Element
  readonly contentRect: DOMRectReadOnly
  readonly borderBoxSize?: readonly ResizeObserverSize[]
  readonly contentBoxSize?: readonly ResizeObserverSize[]
  readonly devicePixelContentBoxSize?: readonly ResizeObserverSize[]
}

export type ResizeObserverCallback = (entries: readonly ResizeObserverEntry[], observer: ResizeObserver) => void

export interface UseResizeObserverOptions extends ConfigurableWindow {
  /**
   * Sets which box model the observer will observe changes to. Possible values
   * are `content-box` (the default), `border-box` and `device-pixel-content-box`.
   *
   * @default 'content-box'
   */
  box?: ResizeObserverBoxOptions
}

declare class ResizeObserver {
  constructor(callback: ResizeObserverCallback)
  disconnect(): void
  observe(target: Element, options?: UseResizeObserverOptions): void
  unobserve(target: Element): void
}

/**
 * Reports changes to the dimensions of an Element's content or the border-box
 */
export function useResizeObserver(
  target: MaybeElementAccessor | MaybeElementAccessor[],
  callback: ResizeObserverCallback,
  options: UseResizeObserverOptions = {}
) {
  const { window = defaultWindow, ...observerOptions } = options
  let observer: ResizeObserver | undefined
  const isSupported = useSupported(() => window && 'ResizeObserver' in window)

  const cleanup = () => {
    if (observer) {
      observer.disconnect()
      observer = undefined
    }
  }

  const targets = createMemo(() => (Array.isArray(target) ? target.map(unAccessor) : [unAccessor(target)]))

  const stopWatch = watch(
    targets,
    els => {
      cleanup()

      if (isSupported() && window) {
        observer = new ResizeObserver(callback)
        for (const _el of els) _el && observer!.observe(_el, observerOptions)
      }
    },
    { defer: false }
  )

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

export type UseResizeObserverReturn = ReturnType<typeof useResizeObserver>
