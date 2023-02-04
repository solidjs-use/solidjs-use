---
category: Sensors
---

# useElementByPoint

Reactive element by point.

## Usage

```ts
import { useElementByPoint, useMouse } from 'solidjs-use'

const { x, y } = useMouse({ type: 'client' })
const { element } = useElementByPoint({ x, y })
```
