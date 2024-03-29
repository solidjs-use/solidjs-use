import QRCode from 'qrcode'
import { createEffect, createSignal, on } from 'solid-js'
import { isClient, toAccessor } from 'solidjs-use'
import type { MaybeAccessor } from 'solidjs-use'

/**
 * Wrapper for qrcode.
 *
 * @see https://solidjs-use.github.io/solidjs-use/integrations/useQRCode
 */
export function useQRCode(text: MaybeAccessor<string>, options?: QRCode.QRCodeToDataURLOptions) {
  const src = toAccessor(text)
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
