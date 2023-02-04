import { createEffect, createSignal, on } from 'solid-js'
import { useResizeObserver } from '../useResizeObserver'
import type { EffectOnDeps, MaybeAccessor } from '@solidjs-use/shared'
import type { JSX } from 'solid-js'

export interface UseTextareaAutoSizeOptions {
  /** Textarea element to autosize. */
  element?: MaybeAccessor<HTMLTextAreaElement | undefined>
  /** Textarea content. */
  input?: MaybeAccessor<string | undefined>
  /** Watch sources that should trigger a textarea resize. */
  deps?: EffectOnDeps
  /** Function called when the textarea size changes. */
  onResize?: () => void
}

export function useTextareaAutoSize(options?: UseTextareaAutoSizeOptions) {
  const [textareaRef, setTextareaRef] = createSignal<HTMLTextAreaElement>(options?.element as any)
  const [value, setValue] = createSignal<string>(options?.input as any)

  function triggerResize() {
    if (!textareaRef()) return

    textareaRef()!.style.height = '1px'
    textareaRef()!.style.height = `${textareaRef()?.scrollHeight}px`

    options?.onResize?.()
  }

  createEffect(on([value, textareaRef], triggerResize))

  useResizeObserver(textareaRef, () => triggerResize())

  if (options?.deps) createEffect(on(options.deps, triggerResize))

  const onChange: JSX.DOMAttributes<HTMLTextAreaElement>['onChange'] = event => {
    setValue(event.currentTarget.value)
  }

  return {
    setTextareaRef,
    value,
    onChange,
    triggerResize
  }
}

export type UseTextareaAutoSizeReturn = ReturnType<typeof useTextareaAutoSize>
