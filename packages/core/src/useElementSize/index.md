---
category: Elements
---

# useElementSize

Reactive size of an HTML element. [ResizeObserver MDN](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver)

## Usage

```jsx
import { useElementSize } from 'solidjs-use'
import { createSignal } from 'solid-js'

const Demo = () => {
  const [el, setEl] = createSignal()
  const { x, y, top, right, bottom, left, width, height } = useElementSize(el)

  return (
    <div ref={setEl}>
      Height: {height()}
      Width: {width()}
    </div>
  )
}

export default Demo
```
