import { tryOnCleanup } from '@solidjs-use/shared'
import { createSignal, getOwner, runWithOwner } from 'solid-js'
import { defaultWindow } from '../_configurable'
import type { ConfigurableWindow } from '../_configurable'

/**
 * Reactively track `window.devicePixelRatio`.
 */
export function useDevicePixelRatio({ window = defaultWindow }: ConfigurableWindow = {}) {
  const [pixelRatio, setPixelRatio] = createSignal(1)

  const owner = getOwner()
  if (window) {
    let media: MediaQueryList
    function observe() {
      setPixelRatio(window!.devicePixelRatio)
      cleanup()
      media = window!.matchMedia(`(resolution: ${pixelRatio()}dppx)`)
      media.addEventListener('change', observe, { once: true })
    }

    function cleanup() {
      media?.removeEventListener('change', observe)
    }

    observe()

    runWithOwner(owner!, () => {
      tryOnCleanup(cleanup)
    })
  }

  return { pixelRatio }
}

export type UseDevicePixelRatioReturn = ReturnType<typeof useDevicePixelRatio>
