import { createFocusTrap } from 'focus-trap'
import { createEffect, createSignal, on } from 'solid-js'
import { resolveAccessor, tryOnCleanup } from 'solidjs-use'
import type { Accessor } from 'solid-js'
import type { Fn, MaybeElementAccessor } from 'solidjs-use'
import type { ActivateOptions, DeactivateOptions, FocusTrap, Options } from 'focus-trap'

export interface UseFocusTrapOptions extends Options {
  /**
   * Immediately activate the trap
   */
  immediate?: boolean
}

export interface UseFocusTrapReturn {
  /**
   * Indicates if the focus trap is currently active
   */
  hasFocus: Accessor<boolean>

  /**
   * Indicates if the focus trap is currently paused
   */
  isPaused: Accessor<boolean>

  /**
   * Activate the focus trap
   *
   * @see https://github.com/focus-trap/focus-trap#trapactivateactivateoptions
   * @param opts Activate focus trap options
   */
  activate: (opts?: ActivateOptions) => void

  /**
   * Deactivate the focus trap
   *
   * @see https://github.com/focus-trap/focus-trap#trapdeactivatedeactivateoptions
   * @param opts Deactivate focus trap options
   */
  deactivate: (opts?: DeactivateOptions) => void

  /**
   * Pause the focus trap
   *
   * @see https://github.com/focus-trap/focus-trap#trappause
   */
  pause: Fn

  /**
   * Unpauses the focus trap
   *
   * @see https://github.com/focus-trap/focus-trap#trapunpause
   */
  unpause: Fn
}

/**
 * Reactive focus-trap
 *
 * @see https://solidjs-use.github.io/solidjs-use/integrations/useFocusTrap
 * @see https://github.com/focus-trap/focus-trap
 * @param target The target element to trap focus within
 * @param options Focus trap options
 * @param autoFocus Focus trap automatically when mounted
 */
export function useFocusTrap(target: MaybeElementAccessor, options: UseFocusTrapOptions = {}): UseFocusTrapReturn {
  let trap: undefined | FocusTrap

  const { immediate, ...focusTrapOptions } = options
  const [hasFocus, setHasFocus] = createSignal(false)
  const [isPaused, setIsPaused] = createSignal(false)

  const activate = (opts?: ActivateOptions) => trap?.activate(opts)
  const deactivate = (opts?: DeactivateOptions) => trap?.deactivate(opts)

  const pause = () => {
    if (trap) {
      trap.pause()
      setHasFocus(true)
    }
  }

  const unpause = () => {
    if (trap) {
      trap.unpause()
      setIsPaused(false)
    }
  }

  createEffect(
    on(resolveAccessor(target), el => {
      if (!el) return

      trap = createFocusTrap(el, {
        ...focusTrapOptions,
        onActivate() {
          setHasFocus(true)

          // Apply if user provided onActivate option
          if (options.onActivate) options.onActivate()
        },
        onDeactivate() {
          setHasFocus(false)

          // Apply if user provided onDeactivate option
          if (options.onDeactivate) options.onDeactivate()
        }
      })

      // Focus if immediate is set to true
      if (immediate) activate()
    })
  )

  // Cleanup on unmount
  tryOnCleanup(() => deactivate())

  return {
    hasFocus,
    isPaused,
    activate,
    deactivate,
    pause,
    unpause
  }
}
