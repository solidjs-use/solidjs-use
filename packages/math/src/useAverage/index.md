---
category: '@Math'
---

# useAverage

Get the average of an array reactively.

## Usage

```ts
import { useAverage } from '@solidjs-use/math'

const [list, setList] = createSignal([1, 2, 3])
const averageValue = useAverage(list) // Accessor<2>
```

```ts
import { useAverage } from '@solidjs-use/math'

const [a, setA] = createSignal(1)
const [b, setB] = createSignal(3)

const averageValue = useAverage(a, b) // Accessor<2>
```
