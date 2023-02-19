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

You can pass a `Accessor` or a `Signal`:

```ts
import { useClamp } from '@solidjs-use/math'

const [number, setNumber] = createSignal(0)
const clamped = useClamp(number, 0, 10) // Accessor
const [clamped, setClamped] = useClamp([number, setNumber], 0, 10) // Signal
```
