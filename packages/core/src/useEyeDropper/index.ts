import { createSignal } from 'solid-js'
import { useSupported } from '../useSupported'

export interface EyeDropperOpenOptions {
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal
   */
  signal?: AbortSignal
}

export interface EyeDropper {
  // eslint-disable-next-line @typescript-eslint/no-misused-new
  new (): EyeDropper
  open: (options?: EyeDropperOpenOptions) => Promise<{ sRGBHex: string }>
  [Symbol.toStringTag]: 'EyeDropper'
}

export interface UseEyeDropperOptions {
  /**
   * Initial sRGBHex.
   *
   * @default ''
   */
  initialValue?: string
}

/**
 * Reactive [EyeDropper API](https://developer.mozilla.org/en-US/docs/Web/API/EyeDropper_API)
 *
 * @see https://solidjs-use.github.io/solidjs-use/core/useEyeDropper
 */
export function useEyeDropper(options: UseEyeDropperOptions = {}) {
  const { initialValue = '' } = options
  const isSupported = useSupported(() => typeof window !== 'undefined' && 'EyeDropper' in window)
  const [sRGBHex, setSRGBHex] = createSignal(initialValue)

  async function open(openOptions?: EyeDropperOpenOptions) {
    if (!isSupported()) return
    const eyeDropper: EyeDropper = new (window as any).EyeDropper()
    const result = await eyeDropper.open(openOptions)
    setSRGBHex(result.sRGBHex)
    return result
  }

  return { isSupported, sRGBHex, open }
}

export type UseEyeDropperReturn = ReturnType<typeof useEyeDropper>
