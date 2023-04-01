import { resolveAccessor } from '@solidjs-use/shared'
import { writableComputed } from '@solidjs-use/shared/solid-to-vue'
import { createEffect, createSignal, on } from 'solid-js'
import { useEventListener } from '../useEventListener'

import type { WritableComputedReturn } from '@solidjs-use/shared/solid-to-vue'
import type { MaybeElementAccessor } from '@solidjs-use/shared'
import type { ConfigurableWindow } from '../_configurable'

export interface UseFocusOptions extends ConfigurableWindow {
  /**
   * Initial value. If set true, then focus will be set on the target
   *
   * @default false
   */
  initialValue?: boolean
}

/**
 * Track or set the focus state of a DOM element.
 *
 * @see https://solidjs-use.github.io/solidjs-use/core/useFocus
 */
export function useFocus(target: MaybeElementAccessor, options: UseFocusOptions = {}): WritableComputedReturn<boolean> {
  const { initialValue = false } = options

  const [innerFocused, setInnerFocused] = createSignal(false)
  const targetElement = resolveAccessor(target)

  useEventListener(targetElement, 'focus', () => setInnerFocused(true))
  useEventListener(targetElement, 'blur', () => setInnerFocused(false))

  const [focused, setFocused] = writableComputed({
    get() {
      return innerFocused()
    },
    set(value: boolean) {
      if (!value && innerFocused()) targetElement()?.blur()
      if (value && !innerFocused()) targetElement()?.focus()
    }
  })

  createEffect(
    on(targetElement, () => {
      setFocused(initialValue)
    })
  )

  return [focused, setFocused]
}
