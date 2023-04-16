---
category: Reactivity
---

# toValue

Get the value of value/Accessor.

## Usage

```ts
import { toValue } from 'solidjs-use'

const [foo] = createSignal('hi')

const a = toValue(0) // 0
const b = toValue(foo) // 'hi'
const c = toValue(() => 'hi') // 'hi'
```
