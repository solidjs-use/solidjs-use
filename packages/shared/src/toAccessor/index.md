---
category: Reactivity
related: toValue
---

# toAccessor

Normalize value/accessor/getter to `Accessor`.

## Usage

```ts
import { toAccessor } from 'solidjs-use'

const [foo] = createSignal('hi')

const a = toAccessor(0) // Accessor<number>
const b = toAccessor(foo) // Accessor<string>
const c = toAccessor(() => 'hi') // Accessor<string>
```
