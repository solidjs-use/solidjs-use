---
category: '@Integrations'
---

# useQRCode

Wrapper for [`qrcode`](https://github.com/soldair/node-qrcode).

## Install

```bash
npm i solidjs-use @solidjs-use/integrations qrcode
```

## Usage

```ts
import { useQRCode } from '@solidjs-use/integrations/useQRCode'

// `qrcode` will be a signal of data URL
const qrcode = useQRCode('text-to-encode')
```

or passing a `signal` to it, the returned data URL ref will change along with the source ref's changes.

```tsx
import { createSignal } from 'solid-js'
import { useQRCode } from '@solidjs-use/integrations/useQRCode'

const [text, setText] = createSignal('text-to-encode')
const qrcode = useQRCode(text)

return (
  <>
    <input value={text()} onInput={e => setText(e.currentTarget.value)} type="text" />
    <img src={qrcode()} alt="QR Code" />
  </>
)
```
