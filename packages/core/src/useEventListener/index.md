---
category: Browser
---

# useEventListener

Use EventListener with ease. Register using [addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) on mounted, and [removeEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener) automatically on unmounted.

## Usage

```js
import { useEventListener } from 'solidjs-use'

useEventListener(document, 'visibilitychange', evt => {
  console.log(evt)
})
```

You can also pass a Accessor as the event target, `useEventListener` will unregister the previous event and register the new one when you change the target.

```ts
import { useEventListener } from 'solidjs-use'

const element = createSignal<HTMLDivElement>()
useEventListener(element, 'keydown', e => {
  console.log(e.key)
})
```

```jsx
const Demo = () => {
  const [ref, setRef] = createSignal()
  const [cond, setCond] = createSignal(true)

  return <div>{cond() ? <div ref={setRef}>Div1</div> : <div ref={setRef}>Div2</div>}</div>
}
```

You can also call the returned to unregister the listener.

```ts
import { useEventListener } from 'solidjs-use'

const cleanup = useEventListener(document, 'keydown', e => {
  console.log(e.key)
})

cleanup() // This will unregister the listener.
```

Note if your components also run in SSR (Server Side Rendering), you might get errors (like `document is not defined`) because DOM APIs like `document` and `window` are not available in Node.js. To avoid that you can put the logic inside `onMounted` hook.

```ts
// onMount will only be called in the client side, so it guarantees the DOM APIs are available.
onMount(() => {
  useEventListener(document, 'keydown', e => {
    console.log(e.key)
  })
})
```
