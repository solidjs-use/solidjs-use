import { createEffect, createSignal, on } from 'solid-js'
import { toValue } from '@solidjs-use/shared'
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
  /** Specify style target to apply the height based on textarea content. If not provided it will use textarea it self.  */
  styleTarget?: MaybeAccessor<HTMLElement>
}

/**
 * Automatically update the height of a textarea depending on the content.
 *
 * @see https://solidjs-use.github.io/solidjs-use/core/useTextareaAutoSize
 */
export function useTextareaAutoSize(options?: UseTextareaAutoSizeOptions) {
  const [textareaRef, setTextareaRef] = createSignal<HTMLTextAreaElement>(options?.element as any)
  const [value, setValue] = createSignal<string>(options?.input as any)
  const [textareaScrollHeight, setTextareaScrollHeight] = createSignal(1)

  function triggerResize() {
    if (!textareaRef()) return

    let height = ''

    textareaRef()!.style.height = '1px'
    setTextareaScrollHeight(textareaRef()?.scrollHeight)

    // If style target is provided update its height
    if (options?.styleTarget) toValue(options.styleTarget).style.height = `${textareaScrollHeight()}px`
    // else update textarea's height by updating height variable
    else height = `${textareaScrollHeight()}px`

    textareaRef()!.style.height = height

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
