---
category: Elements
---

# useDraggable

Make elements draggable.

## Usage

```tsx
import { createSignal } from 'solid-js'

const Demo = () => {
  const [el, setEl] = createSignal<HTMLElement>()

  // `style` will be a helper memo for `{left: ?px, top: ?px;}`
  const { x, y } = useDraggable(el, {
    initialValue: { x: 40, y: 40 }
  })

  return (
    <div ref={setEl} style={{ ...style(), position: 'fixed' }}>
      Drag me! I am at {x()}, {y()}
    </div>
  )
}
```
