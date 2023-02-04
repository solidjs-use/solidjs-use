---
category: '@Math'
---

# useSum

Get the sum of an array reactively

## Usage

```ts
import { useSum } from '@solidjs-use/math'

const [array, setArray] = createSignal([1, 2, 3, 4])
const sum = useSum(array) // Accessor<10>
```

```ts
import { useSum } from '@solidjs-use/math'

const [a, setA] = createSignal(1)
const [b, setB] = createSignal(3)

const sum = useSum(a, b, 2) // Accessor<6>
```
