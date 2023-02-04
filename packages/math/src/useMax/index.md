---
category: '@Math'
---

# useMax

Reactive `Math.max`.

## Usage

```ts
import { useMax } from '@solidjs-use/math'

const [array, setArray] = createSignal([1, 2, 3, 4])
const sum = useMax(array) // Accessor<4>
```

```ts
import { useMax } from '@solidjs-use/math'

const [a, setA] = createSignal(1)
const [b, setB] = createSignal(3)

const sum = useMax(a, b, 2) // Accessor<3>
```
