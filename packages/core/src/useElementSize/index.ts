import { resolveAccessor } from '@solidjs-use/shared'
import { createEffect, createSignal, on } from 'solid-js'
import { useResizeObserver } from '../useResizeObserver'
import type { MaybeElementAccessor } from '@solidjs-use/shared'
import type { UseResizeObserverOptions } from '../useResizeObserver'

export interface ElementSize {
  width: number
  height: number
}

/**
 * Reactive size of an HTML element.
 */
export function useElementSize(
  target: MaybeElementAccessor,
  initialSize: ElementSize = { width: 0, height: 0 },
  options: UseResizeObserverOptions = {}
) {
  const { box = 'content-box' } = options
  const [width, setWidth] = createSignal(initialSize.width)
  const [height, setHeight] = createSignal(initialSize.height)

  useResizeObserver(
    target,
    ([entry]) => {
      const boxSize =
        box === 'border-box'
          ? entry.borderBoxSize
          : box === 'content-box'
          ? entry.contentBoxSize
          : entry.devicePixelContentBoxSize

      if (boxSize) {
        setWidth(boxSize.reduce((acc, { inlineSize }) => acc + inlineSize, 0))
        setHeight(boxSize.reduce((acc, { blockSize }) => acc + blockSize, 0))
      } else {
        // fallback
        setWidth(entry.contentRect.width)
        setHeight(entry.contentRect.height)
      }
    },
    options
  )

  createEffect(
    on(
      resolveAccessor(target),
      ele => {
        setWidth(ele ? initialSize.width : 0)
        setHeight(ele ? initialSize.height : 0)
      },
      { defer: true }
    )
  )

  return {
    width,
    height
  }
}

export type UseElementSizeReturn = ReturnType<typeof useElementSize>
