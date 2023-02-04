---
category: Browser
---

# useImage

Reactive load an image in the browser, you can wait the result to display it or show a fallback.

## Usage

```jsx
import { createSignal, Show } from 'solid-js'
import { useImage } from 'solidjs-use'

function Demo() {
  const [imageOptions, setImageOptions] = createSignal({ src: 'https://place.dog/300/200' })
  const { isLoading, error } = useImage(imageOptions)

  return (
    <Show when={!isLoading()} fallback={<div>Loading...</div>}>
      <Show when={!error()} fallback={<div>Failed</div>}>
        <img src={imageOptions().src} />
      </Show>
    </Show>
  )
}
```
