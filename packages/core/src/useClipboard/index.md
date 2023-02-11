---
category: Browser
---

# useClipboard

Reactive [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API). Provides the ability to respond to clipboard commands (cut, copy, and paste) as well as to asynchronously read from and write to the system clipboard. Access to the contents of the clipboard is gated behind the [Permissions API](https://developer.mozilla.org/en-US/docs/Web/API/Permissions_API). Without user permission, reading or altering the clipboard contents is not permitted.

## Usage

```js
import { useClipboard } from 'solidjs-use'

const [source, setSource] = createSignal('Hello')
const { text, copy, copied, isSupported } = useClipboard({ source })
```

```tsx
<Show
  when={isSupported()}
  fallback={<p>Your browser does not support Clipboard API</p>}
>
  <button onClick={() => copy(source())}>
    {/* by default, `copied` will be reset in 1.5s */}
    <Show when={!copied()} fallback={<span>Copied!</span>}>
      <span>Copy</span>
    <Show>
  </button>
</Show>
```

Set `legacy: true` to keep the ability to copy if [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API) is not available. It will handle copy with [execCommand](https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand) as fallback.
