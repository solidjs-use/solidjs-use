---
category: Sensors
---

# useMouse

Reactive mouse position

## Basic Usage

```js
import { useMouse } from 'solidjs-use'

const { x, y, sourceType } = useMouse()
```

Touch is enabled by default. To only detect mouse changes, set `touch` to `false`.
The `dragover` event is used to track mouse position while dragging.

```js
const { x, y } = useMouse({ touch: false })
```
