---
category: Elements
---

# useIntersectionObserver

Detects that a target element's visibility.

## Usage

```jsx
import { useIntersectionObserver } from 'solidjs-use'
import { createSignal } from 'solid-js'

const Demo = () => {
  const [target, setTarget] = createSignal(null)
  const [isVisible, setIsVisible] = createSignal(false)

  useIntersectionObserver(target, ([{ isIntersecting }]) => {
    setIsVisible(isIntersecting)
  })
  return (
    <div ref={setTarget}>
      <h1>Hello world</h1>
    </div>
  )
}
```

[IntersectionObserver MDN](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver)
