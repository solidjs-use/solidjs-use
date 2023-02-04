---
category: Elements
---

# useElementVisibility

Tracks the visibility of an element within the viewport.

## Usage

```jsx
import { createSignal } from 'solid-js'
import { useElementVisibility } from 'solidjs-use'

const Demo = () => {
  const [target, setTarget] = createSignal()
  const isVisible = useElementVisibility(target)

  return (
    <div ref={setEl}>
      <h1>{isVisible().toString()}</h1>
    </div>
  )
}

export default Demo
```
