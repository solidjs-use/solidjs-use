import { isClient } from '@solidjs-use/shared'
import { createSignal } from 'solid-js'
import { useEventListener } from '../useEventListener'
import type { Accessor } from 'solid-js'
import type { MaybeAccessor } from '@solidjs-use/shared'

export interface UseDropZoneReturn {
  isOverDropZone: Accessor<boolean>
}

/**
 * Create an zone where files can be dropped.
 *
 * @see https://solidjs-use.github.io/solidjs-use/core/useDropZone
 */
export function useDropZone(
  target: MaybeAccessor<HTMLElement | null | undefined>,
  onDrop?: (files: File[] | null) => void
): UseDropZoneReturn {
  const [isOverDropZone, setOverDropZone] = createSignal(false)
  let counter = 0

  if (isClient) {
    useEventListener<DragEvent>(target, 'dragenter', event => {
      event.preventDefault()
      counter += 1
      setOverDropZone(true)
    })
    useEventListener<DragEvent>(target, 'dragover', event => {
      event.preventDefault()
    })
    useEventListener<DragEvent>(target, 'dragleave', event => {
      event.preventDefault()
      counter -= 1
      if (counter === 0) setOverDropZone(false)
    })
    useEventListener<DragEvent>(target, 'drop', event => {
      event.preventDefault()
      counter = 0
      setOverDropZone(false)
      const files = Array.from(event.dataTransfer?.files ?? [])
      onDrop?.(files.length === 0 ? null : files)
    })
  }

  return {
    isOverDropZone
  }
}
