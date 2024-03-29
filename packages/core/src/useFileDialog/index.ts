import { createEventHook, hasOwn } from '@solidjs-use/shared'
import { createSignal } from 'solid-js'
import { defaultDocument } from '../_configurable'
import type { EventHookOn } from '@solidjs-use/shared'
import type { Accessor } from 'solid-js'
import type { ConfigurableDocument } from '../_configurable'

export interface UseFileDialogOptions extends ConfigurableDocument {
  /**
   * @default true
   */
  multiple?: boolean
  /**
   * @default '*'
   */
  accept?: string
  /**
   * Select the input source for the capture file.
   * @see [HTMLInputElement Capture](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/capture)
   */
  capture?: string
  /**
   * Reset when open file dialog.
   * @default false
   */
  reset?: boolean
}

const DEFAULT_OPTIONS: UseFileDialogOptions = {
  multiple: true,
  accept: '*',
  reset: false
}

export interface UseFileDialogReturn {
  files: Accessor<FileList | null>
  open: (localOptions?: Partial<UseFileDialogOptions>) => void
  reset: () => void
  onChange: EventHookOn<FileList | null>
}

/**
 * Open file dialog with ease.
 *
 * @see https://solidjs-use.github.io/solidjs-use/core/useFileDialog
 */
export function useFileDialog(options: UseFileDialogOptions = {}): UseFileDialogReturn {
  const { document = defaultDocument } = options

  const [files, setFiles] = createSignal<FileList | null>(null)
  const { on: onChange, trigger } = createEventHook()

  let input: HTMLInputElement | undefined
  if (document) {
    input = document.createElement('input')
    input.type = 'file'

    input.onchange = (event: Event) => {
      const result = event.target as HTMLInputElement
      setFiles(result.files)
      trigger(result.files)
    }
  }

  const reset = () => {
    setFiles(null)
    if (input) input.value = ''
  }

  const open = (localOptions?: Partial<UseFileDialogOptions>) => {
    if (!input) return
    const _options = {
      ...DEFAULT_OPTIONS,
      ...options,
      ...localOptions
    }
    input.multiple = _options.multiple!
    input.accept = _options.accept!
    if (hasOwn(_options, 'capture')) input.capture = _options.capture!
    if (_options.reset) reset()
    input.click()
  }

  return {
    files,
    open,
    reset,
    onChange
  }
}
