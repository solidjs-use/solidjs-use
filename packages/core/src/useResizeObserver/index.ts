import { resolveAccessor, tryOnCleanup, watch } from '@solidjs-use/shared'
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
  target: MaybeElementAccessor,
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

  const stopWatch = watch(resolveAccessor(target), el => {
    cleanup()

    if (isSupported() && window && el) {
      observer = new ResizeObserver(callback)
      observer.observe(el, observerOptions)
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

export type UseResizeObserverReturn = ReturnType<typeof useResizeObserver>
