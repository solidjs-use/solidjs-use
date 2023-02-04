---
category: '@Math'
alias: or
related: logicAnd, logicNot
---

# logicOr

`OR` conditions for Signals.

## Usage

```ts
import { logicOr } from '@solidjs-use/math'
import { whenever } from 'solidjs-use'

const [a, setA] = createSignal(true)
const [b, setB] = createSignal(false)

whenever(logicOr(a, b), () => {
  console.log('either a or b is truthy!')
})
```
