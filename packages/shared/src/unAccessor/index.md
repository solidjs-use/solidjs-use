---
category: Reactivity
---

# unAccessor

Get the value of value/Accessor.

## Usage

```ts
import { unAccessor } from 'solidjs-use'

const [foo] = createSignal('hi')

const a = unAccessor(0) // 0
const b = unAccessor(foo) // 'hi'
const c = unAccessor(() => 'hi') // 'hi'
```
