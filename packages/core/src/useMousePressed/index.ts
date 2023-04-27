import { toValue } from '@solidjs-use/shared'
import { createMemo, createSignal } from 'solid-js'
import { useEventListener } from '../useEventListener'
import { defaultWindow } from '../_configurable'
import type { MaybeElementAccessor } from '@solidjs-use/shared'
import type { UseMouseSourceType } from '../useMouse'
import type { ConfigurableWindow } from '../_configurable'

export interface MousePressedOptions extends ConfigurableWindow {
  /**
   * Listen to `touchstart` `touchend` events
   *
   * @default true
   */
  touch?: boolean

  /**
   * Listen to `dragstart` `drop` and `dragend` events
   *
   * @default true
   */
  drag?: boolean

  /**
   * Initial values
   *
   * @default false
   */
  initialValue?: boolean

  /**
   * Element target to be capture the click
   */
  target?: MaybeElementAccessor
}

/**
 * Reactive mouse position.
 *
 * @see https://solidjs-use.github.io/solidjs-use/core/useMousePressed
 */
export function useMousePressed(options: MousePressedOptions = {}) {
  const { touch = true, drag = true, initialValue = false, window = defaultWindow } = options

  const [pressed, setPressed] = createSignal(initialValue)
  const [sourceType, setSourceType] = createSignal<UseMouseSourceType>(null)

  if (!window) {
    return {
      pressed,
      sourceType
    }
  }

  const onPressed = (srcType: UseMouseSourceType) => () => {
    setPressed(true)
    setSourceType(srcType)
  }
  const onReleased = () => {
    setPressed(false)
    setSourceType(null)
  }

  const target = createMemo(() => toValue(options.target) ?? window)

  useEventListener(target, 'mousedown', onPressed('mouse'), { passive: true })

  useEventListener(window, 'mouseleave', onReleased, { passive: true })
  useEventListener(window, 'mouseup', onReleased, { passive: true })

  if (drag) {
    useEventListener(target, 'dragstart', onPressed('mouse'), { passive: true })

    useEventListener(window, 'drop', onReleased, { passive: true })
    useEventListener(window, 'dragend', onReleased, { passive: true })
  }

  if (touch) {
    useEventListener(target, 'touchstart', onPressed('touch'), { passive: true })

    useEventListener(window, 'touchend', onReleased, { passive: true })
    useEventListener(window, 'touchcancel', onReleased, { passive: true })
  }

  return {
    pressed,
    sourceType
  }
}

export type UseMousePressedReturn = ReturnType<typeof useMousePressed>
