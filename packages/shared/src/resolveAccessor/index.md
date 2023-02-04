---
category: Reactivity
related: unAccessor
---

# resolveAccessor

Normalize value/accessor/getter to `Accessor`.

## Usage

```ts
import { resolveAccessor } from 'solidjs-use'

const [foo] = createSignal('hi')

const a = resolveAccessor(0) // Accessor<number>
const b = resolveAccessor(foo) // Accessor<string>
const c = resolveAccessor(() => 'hi') // Accessor<string>
```
