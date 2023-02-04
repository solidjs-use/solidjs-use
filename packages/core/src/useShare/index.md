---
category: Browser
---

# useShare

Reactive [Web Share API](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share). The Browser provides features that can share content in text or file.

> The `share` method has to be called following a user gesture like a button click. It can’t simply be called on page load for example. That’s in place to help prevent abuse.

## Usage

```js
import { useShare } from 'solidjs-use'

const { share, isSupported } = useShare()

function startShare() {
  share({
    title: 'Hello',
    text: 'Hello my friend!',
    url: location.href
  })
}
```

### Passing a source Accessor

You can pass a `Accessor` to it, changes from the source ref will be reflected to your sharing options.

```ts
import { createSignal } from 'solid-js'

const [shareOptions, setShareOptions] = createSignal<ShareOptions>({ text: 'foo' })
const { share, isSupported } = useShare(shareOptions)

setShareOptions({
  text: 'bar'
})

share()
```
