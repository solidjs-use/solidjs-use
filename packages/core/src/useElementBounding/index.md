---
category: Elements
---

# useElementBounding

Reactive [bounding box](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect) of an HTML element

## Usage

```jsx
import { useElementBounding } from 'solidjs-use'
import { createSignal } from 'solid-js'

const Demo = () => {
  const [el, setEl] = createSignal()
  const { x, y, top, right, bottom, left, width, height } = useElementBounding(el)
  // ...
  return <div ref={setEl} />
}

export default Demo
```
