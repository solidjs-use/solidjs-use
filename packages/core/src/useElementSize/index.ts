import { toAccessor, toValue } from '@solidjs-use/shared'
import { createEffect, createMemo, createSignal, on } from 'solid-js'
import { useResizeObserver } from '../useResizeObserver'
import { defaultWindow } from '../_configurable'

import type { MaybeElementAccessor } from '@solidjs-use/shared'
import type { UseResizeObserverOptions } from '../useResizeObserver'

export interface ElementSize {
  width: number
  height: number
}

/**
 * Reactive size of an HTML element.
 *
 * @see https://solidjs-use.github.io/solidjs-use/core/useElementSize
 */
export function useElementSize(
  target: MaybeElementAccessor,
  initialSize: ElementSize = { width: 0, height: 0 },
  options: UseResizeObserverOptions = {}
) {
  const { window = defaultWindow, box = 'content-box' } = options

  const isSVG = createMemo(() => toValue(target)?.namespaceURI?.includes('svg'))
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

      if (window && isSVG()) {
        const $elem = toValue(target)
        if ($elem) {
          const styles = window.getComputedStyle($elem)
          setWidth(parseFloat(styles.width))
          setHeight(parseFloat(styles.height))
        }
      } else {
        if (boxSize) {
          const formatBoxSize = Array.isArray(boxSize) ? boxSize : [boxSize]
          setWidth(formatBoxSize.reduce<number>((acc, { inlineSize }) => acc + Number(inlineSize), 0))
          setHeight(formatBoxSize.reduce<number>((acc, { blockSize }) => acc + Number(blockSize), 0))
        } else {
          // fallback
          setWidth(entry.contentRect.width)
          setHeight(entry.contentRect.height)
        }
      }
    },
    options
  )

  createEffect(
    on(
      toAccessor(target),
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
