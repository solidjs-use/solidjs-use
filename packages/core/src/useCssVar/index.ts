import { resolveAccessor, unAccessor } from '@solidjs-use/shared'
import { createEffect, createMemo, createSignal, on } from 'solid-js'
import { defaultWindow } from '../_configurable'
import type { Signal } from 'solid-js'
import type { MaybeAccessor, MaybeElementAccessor } from '@solidjs-use/shared'
import type { ConfigurableWindow } from '../_configurable'

export interface UseCssVarOptions extends ConfigurableWindow {
  initialValue?: string
}

/**
 * Manipulate CSS variables.
 */
export function useCssVar(
  prop: MaybeAccessor<string>,
  target?: MaybeElementAccessor,
  { window = defaultWindow, initialValue = '' }: UseCssVarOptions = {}
): Signal<string> {
  const variableSignal = createSignal(initialValue)
  const [variable, setVariable] = variableSignal
  const elAccessor = createMemo(() => unAccessor(target) ?? window?.document?.documentElement)

  createEffect(
    on([elAccessor, resolveAccessor(prop)], ([el, prop]) => {
      if (el && window) {
        const value = window.getComputedStyle(el).getPropertyValue(prop)?.trim()
        setVariable(value || initialValue)
      }
    })
  )

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
