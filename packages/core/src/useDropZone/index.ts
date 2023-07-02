import { isClient } from '@solidjs-use/shared'
import { createSignal } from 'solid-js'
import { useEventListener } from '../useEventListener'
import type { Accessor, Setter } from 'solid-js'
import type { MaybeAccessor } from '@solidjs-use/shared'

export interface UseDropZoneReturn {
  files: Accessor<File[] | null>
  setFiles: Setter<File[] | null>
  isOverDropZone: Accessor<boolean>
}

export interface UseDropZoneOptions {
  onDrop?: (files: File[] | null, event: DragEvent) => void
  onEnter?: (files: File[] | null, event: DragEvent) => void
  onLeave?: (files: File[] | null, event: DragEvent) => void
  onOver?: (files: File[] | null, event: DragEvent) => void
}

/**
 * Create an zone where files can be dropped.
 *
 * @see https://solidjs-use.github.io/solidjs-use/core/useDropZone
 */
export function useDropZone(
  target: MaybeAccessor<HTMLElement | null | undefined>,
  options: UseDropZoneOptions | UseDropZoneOptions['onDrop'] = {}
): UseDropZoneReturn {
  const [isOverDropZone, setOverDropZone] = createSignal(false)
  const [files, setFiles] = createSignal<File[] | null>(null)

  let counter = 0

  if (isClient) {
    const _options = typeof options === 'function' ? { onDrop: options } : options
    const getFiles = (event: DragEvent) => {
      const list = Array.from(event.dataTransfer?.files ?? [])
      return setFiles(list.length === 0 ? null : list)
    }

    useEventListener<DragEvent>(target, 'dragenter', event => {
      event.preventDefault()
      counter += 1
      setOverDropZone(true)
      _options.onEnter?.(getFiles(event), event)
    })
    useEventListener<DragEvent>(target, 'dragover', event => {
      event.preventDefault()
      _options.onOver?.(getFiles(event), event)
    })
    useEventListener<DragEvent>(target, 'dragleave', event => {
      event.preventDefault()
      counter -= 1
      if (counter === 0) setOverDropZone(false)
      _options.onLeave?.(getFiles(event), event)
    })
    useEventListener<DragEvent>(target, 'drop', event => {
      event.preventDefault()
      counter = 0
      setOverDropZone(false)
      _options.onDrop?.(getFiles(event), event)
    })
  }

  return {
    files,
    setFiles,
    isOverDropZone
  }
}
