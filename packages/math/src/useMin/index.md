---
category: '@Math'
---

# useMin

Reactive `Math.min`.

## Usage

```ts
import { useMin } from '@solidjs-use/math'

const [array, setArray] = createSignal([1, 2, 3, 4])
const sum = useMin(array) // Accessor<1>
```

```ts
import { useMin } from '@solidjs-use/math'

const [a, setA] = createSignal(1)
const [b, setB] = createSignal(3)

const sum = useMin(a, b, 2) // Accessor<1>
```
