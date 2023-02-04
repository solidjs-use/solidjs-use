---
category: '@Math'
---

# useClamp

Reactively clamp a value between two other values.

## Usage

```ts
import { useClamp } from '@solidjs-use/math'

const [min, setMin] = createSignal(0)
const [max, setMax] = createSignal(10)
const value = useClamp(0, min, max)
```
