import { Note } from '@solidjs-use/docs-components'
import { useQRCode } from '@solidjs-use/integrations/useQRCode'
import { createSignal } from 'solid-js'

const Demo = () => {
  const [text, setText] = createSignal('https://solidjs-use.github.io/solidjs-use/integrations/useQRCode')
  const qrcode = useQRCode(text, {
    errorCorrectionLevel: 'H',
    margin: 3
  })
  return (
    <>
      <Note>Text content for QRCode</Note>
      <input value={text()} onInput={e => setText(e.currentTarget.value)} type="text" />
      {text() && <img src={qrcode()} class="mt-6 mb-2 rounded" alt="QR Code" />}
    </>
  )
}

export default Demo
