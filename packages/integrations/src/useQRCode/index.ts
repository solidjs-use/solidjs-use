import QRCode from 'qrcode'
import { createEffect, createSignal, on } from 'solid-js'
import { isClient, resolveAccessor } from 'solidjs-use'
import type { MaybeAccessor } from 'solidjs-use'

/**
 * Wrapper for qrcode.
 */
export function useQRCode(text: MaybeAccessor<string>, options?: QRCode.QRCodeToDataURLOptions) {
  const src = resolveAccessor(text)
  const [result, setResult] = createSignal('')

  createEffect(
    on(src, async value => {
      if (src() && isClient) {
        const res = await QRCode.toDataURL(value, options)
        setResult(res)
      }
    })
  )

  return result
}
