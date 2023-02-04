---
category: '@Math'
alias: not
---

# logicNot

`NOT` condition for ref.

## Usage

```ts
import { logicNot } from '@solidjs-use/math'
import { whenever } from 'solidjs-use'

const [a, setA] = createSignal(true)

whenever(logicNot(a), () => {
  console.log('a is now falsy!')
})
```
