import { tryOnCleanup } from '@solidjs-use/shared'
import { createSignal } from 'solid-js'
import { defaultWindow } from '../_configurable'
import type { ConfigurableWindow } from '../_configurable'
import type { Fn } from '@solidjs-use/shared'

/**
 * Reactively track `window.devicePixelRatio`.
 */
export function useDevicePixelRatio({ window = defaultWindow }: ConfigurableWindow = {}) {
  if (!window) {
    return {
      pixelRatio: createSignal(1)[0]
    }
  }

  const [pixelRatio, setPixelRatio] = createSignal(1)

  const cleanups: Fn[] = []

  const cleanup = () => {
    cleanups.map(i => i())
    cleanups.length = 0
  }

  const observe = () => {
    setPixelRatio(window.devicePixelRatio)
    cleanup()
    const media = window.matchMedia(`(resolution: ${pixelRatio()}dppx)`)
    media.addEventListener('change', observe, { once: true })
    cleanups.push(() => {
      media.removeEventListener('change', observe)
    })
  }

  observe()
  tryOnCleanup(cleanup)

  return { pixelRatio }
}

export type UseDevicePixelRatioReturn = ReturnType<typeof useDevicePixelRatio>
