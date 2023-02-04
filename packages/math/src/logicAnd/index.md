---
category: '@Math'
alias: and
related: logicNot, logicOr
---

# logicAnd

`AND` condition for Signals.

## Usage

```ts
import { logicAnd } from '@solidjs-use/math'
import { whenever } from 'solidjs-use'

const [a, setA] = createSignal(true)
const [b, setB] = createSignal(false)

whenever(logicAnd(a, b), () => {
  console.log('both a and b are now truthy!')
})
```
