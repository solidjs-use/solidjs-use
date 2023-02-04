---
category: Sensors
---

# useParallax

Create parallax effect easily. It uses `useDeviceOrientation` and fallback to `useMouse` if orientation is not supported.

## Usage

```jsx
import { useParallax } from 'solidjs-use'

const Demo = () => {
  const [target, setTarget] = createSignal<HTMLElement>()
  const { tilt, roll, source } = useParallax(target)

  return <div ref={setTarget}></div>
}
```
