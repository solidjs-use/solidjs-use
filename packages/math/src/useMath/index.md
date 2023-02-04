---
category: '@Math'
---

# useMath

Reactive `Math` methods.

## Usage

```ts
import { useMath } from '@solidjs-use/math'

const [base, setBase] = createSignal(2)
const [exponent, setExponent] = createSignal(3)
const result = useMath('pow', base, exponent) // Accessor<8>

const [num, setNum] = createSignal(2)
const root = useMath('sqrt', num) // Accessor<1.4142135623730951>

setNum(4)
console.log(root()) // 2
```
