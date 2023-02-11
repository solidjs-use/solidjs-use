import { isDef, resolveAccessor } from '@solidjs-use/shared'
import { writableComputed } from '@solidjs-use/shared/solid-to-vue'
import { createEffect, on } from 'solid-js'
import { useActiveElement } from '../useActiveElement'
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
 */
export function useFocus(target: MaybeElementAccessor, options: UseFocusOptions = {}): WritableComputedReturn<boolean> {
  const { initialValue = false } = options

  const activeElement = useActiveElement(options)
  const targetElement = resolveAccessor(target)
  const [focused, setFocused] = writableComputed({
    get() {
      return isDef(activeElement()) && isDef(targetElement()) && activeElement() === targetElement()
    },
    set(value: boolean) {
      if (!value && focused()) targetElement()?.blur()
      if (value && !focused()) targetElement()?.focus()
    }
  })

  createEffect(
    on(targetElement, () => {
      setFocused(initialValue)
    })
  )

  return [focused, setFocused]
}
