import { isAccessor, toSignal } from 'solidjs-use/solid-to-vue'
import { createEffect, createSignal, on } from 'solid-js'
import type { Signal } from 'solid-js'
import type { MaybeAccessor } from 'solidjs-use'
import type { WebFrame } from 'electron'

export function useZoomFactor(factor: MaybeAccessor<number>): Signal<number>
export function useZoomFactor(webFrame: WebFrame, factor: MaybeAccessor<number>): Signal<number>
export function useZoomFactor(webFrame: WebFrame): Signal<number>
export function useZoomFactor(): Signal<number>

/**
 * Reactive WebFrame zoom factor
 *
 * @see https://solidjs-use.github.io/solidjs-use/electron/useZoomFactor
 * @see https://www.electronjs.org/docs/api/web-frame#webframesetzoomfactorfactor
 */
export function useZoomFactor(...args: any[]): Signal<number> {
  let webFrame: WebFrame | undefined
  let newFactorSignal: Signal<number> | null = null

  if (args.length === 0 || (isAccessor(args[0]) && typeof args[0]() === 'number') || typeof args[0] === 'number') {
    webFrame = window.require ? window.require('electron').webFrame : undefined
    newFactorSignal = args.length > 0 ? createSignal(args[0]) : null
  } else {
    webFrame = args[0]
    newFactorSignal = args.length > 1 ? createSignal(args[1]) : null
  }

  if (!webFrame) throw new Error('provide WebFrame module or enable nodeIntegration')

  if (newFactorSignal && newFactorSignal[0]() === 0) throw new Error('the factor must be greater than 0.0.')

  const [factor, setFactor] = toSignal(newFactorSignal ?? webFrame.getZoomFactor())

  createEffect(
    on(factor, (f, o) => {
      if (typeof f === 'number' && f === 0) throw new Error('the factor must be greater than 0.0.')

      if (typeof f === 'number' && f !== o) webFrame?.setZoomFactor(f)
    })
  )

  return [factor, setFactor]
}
