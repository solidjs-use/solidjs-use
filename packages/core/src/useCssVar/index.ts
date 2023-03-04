import { resolveAccessor, unAccessor } from '@solidjs-use/shared'
import { createEffect, createMemo, createSignal, on } from 'solid-js'
import { defaultWindow } from '../_configurable'
import { useMutationObserver } from '../useMutationObserver'
import type { Signal } from 'solid-js'
import type { MaybeAccessor, MaybeElementAccessor } from '@solidjs-use/shared'
import type { ConfigurableWindow } from '../_configurable'

export interface UseCssVarOptions extends ConfigurableWindow {
  initialValue?: string

  /**
   * Use MutationObserver to monitor variable changes
   * @default false
   */
  observe?: boolean
}

/**
 * Manipulate CSS variables.
 */
export function useCssVar(
  prop: MaybeAccessor<string>,
  target?: MaybeElementAccessor,
  options: UseCssVarOptions = {}
): Signal<string> {
  const { window = defaultWindow, initialValue = '', observe = false } = options
  const variableSignal = createSignal(initialValue)
  const [variable, setVariable] = variableSignal
  const elAccessor = createMemo(() => unAccessor(target) ?? window?.document?.documentElement)

  function updateCssVar() {
    const key = unAccessor(prop)
    const el = unAccessor(elAccessor)
    if (el && window) {
      const value = window.getComputedStyle(el).getPropertyValue(key)?.trim()
      setVariable(() => value || initialValue)
    }
  }

  if (observe) {
    useMutationObserver(elAccessor, updateCssVar, {
      attributes: true,
      window
    })
  }

  createEffect(on([elAccessor, resolveAccessor(prop)], updateCssVar))

  createEffect(
    on(
      variable,
      val => {
        if (elAccessor()?.style) {
          elAccessor()?.style.setProperty(unAccessor(prop), val)
        }
      },
      { defer: true }
    )
  )

  return variableSignal
}
