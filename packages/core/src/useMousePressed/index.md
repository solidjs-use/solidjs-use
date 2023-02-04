---
category: Sensors
---

# useMousePressed

Reactive mouse pressing state. Triggered by `mousedown` `touchstart` on target element and released by `mouseup` `mouseleave` `touchend` `touchcancel` on window.

## Basic Usage

```js
import { useMousePressed } from 'solidjs-use'

const { pressed } = useMousePressed()
```

Touching is enabled by default. To make it only detects mouse changes, set `touch` to `false`

```js
const { pressed } = useMousePressed({ touch: false })
```

To only capture `mousedown` and `touchstart` on specific element, you can specify `target` by passing a Accessor of the element.

```tsx
import { useMousePressed } from 'solidjs-use'

const Demo = () => {
  const [el, setEl] = createSignal<HTMLElement>()
  const { pressed } = useMousePressed({ target: el })
  return <div ref={setEl}>Only clicking on this element will trigger the update.</div>
}

export default Demo
```
