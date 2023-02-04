---
category: Sensors
---

# useScroll

Reactive scroll position and state.

## Usage

```tsx
import { useScroll } from 'solidjs-use'
import { createSignal } from 'solid-js'

const Demo = () => {
  const [el, setEl] = createSignal<HTMLElement>()
  const { x, y, setX, setY, isScrolling, arrivedState, directions } = useScroll(el)

  return <div ref={setEl}>...</div>
}
```

### With offsets

```js
const { x, y, setX, setY, isScrolling, arrivedState, directions } = useScroll(el, {
  offset: { top: 30, bottom: 30, right: 30, left: 30 }
})
```

### Setting scroll position

Set the `x` and `y` values to make the element scroll to that position.

```tsx
import { useScroll } from 'solidjs-use'
import { createSignal } from 'solid-js'

const Demo = () => {
  const [el, setEl] = createSignal<HTMLElement>()
  const { x, y, setX, setY } = useScroll(el)

  return (
    <>
      <div ref={setEl}></div>
      <button onClick={() => setX(x() + 10)}>Scroll right 10px</button>
      <button onClick={() => setY(y() + 10)}>Scroll down 10px</button>
    </>
  )
}
```

### Smooth scrolling

Set `behavior: smooth` to enable smooth scrolling. The `behavior` option defaults to `auto`, which means no smooth scrolling. See the `behavior` option on [`window.scrollTo()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo) for more information.

```ts
import { useScroll } from 'solidjs-use'

const [el, setEl] = createSignal<HTMLElement>()
const { x, y } = useScroll(el, { behavior: 'smooth' })

// Or as a `signal`:
const [smooth, setSmooth] = createSignal(false)
const behavior = createSignal(() => (smooth() ? 'smooth' : 'auto'))
const { x, y } = useScroll(el, { behavior })
```
