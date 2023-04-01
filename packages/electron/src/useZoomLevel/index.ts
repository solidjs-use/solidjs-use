import { isAccessor, toSignal } from 'solidjs-use/solid-to-vue'
import { createEffect, createSignal, on } from 'solid-js'
import type { Signal } from 'solid-js'
import type { MaybeAccessor } from 'solidjs-use'
import type { WebFrame } from 'electron'

export function useZoomLevel(level: MaybeAccessor<number>): Signal<number>
export function useZoomLevel(webFrame: WebFrame, level: MaybeAccessor<number>): Signal<number>
export function useZoomLevel(webFrame: WebFrame): Signal<number>
export function useZoomLevel(): Signal<number>

/**
 * Reactive WebFrame zoom level
 *
 * @see https://solidjs-use.github.io/solidjs-use/electron/useZoomLevel
 * @see https://www.electronjs.org/docs/api/web-frame#webframesetzoomlevellevel
 */
export function useZoomLevel(...args: any[]): Signal<number> {
  let webFrame: WebFrame | undefined
  let newLevel: Signal<number> | null = null

  if (args.length === 0 || (isAccessor(args[0]) && typeof args[0]() === 'number') || typeof args[0] === 'number') {
    webFrame = window.require ? window.require('electron').webFrame : undefined
    newLevel = args.length > 0 ? createSignal(args[0]) : null
  } else {
    webFrame = args[0]
    newLevel = args.length > 1 ? createSignal(args[1]) : null
  }

  if (!webFrame) throw new Error('provide WebFrame module or enable nodeIntegration')

  const [level, setLevel] = toSignal(newLevel ?? webFrame.getZoomLevel())

  createEffect(
    on(level, (f, o) => {
      if (typeof f === 'number' && f !== o) webFrame?.setZoomLevel(f)
    })
  )

  return [level, setLevel]
}
