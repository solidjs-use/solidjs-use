import { unAccessor } from '@solidjs-use/shared'
import { createMemo } from 'solid-js'
import { useActiveElement } from '../useActiveElement'
import type { Accessor } from 'solid-js'
import type { MaybeElementAccessor } from '@solidjs-use/shared'
import type { ConfigurableWindow } from '../_configurable'

/**
 * Track if focus is contained within the target element.
 *
 * @see https://solidjs-use.github.io/solidjs-use/core/useFocusWithin
 */
export function useFocusWithin(target: MaybeElementAccessor, options: ConfigurableWindow = {}): Accessor<boolean> {
  const activeElement = useActiveElement(options)
  const targetElement = createMemo(() => unAccessor(target))
  const focused = createMemo(() =>
    targetElement() && activeElement() ? targetElement()!.contains(activeElement()!) : false
  )

  return focused
}
