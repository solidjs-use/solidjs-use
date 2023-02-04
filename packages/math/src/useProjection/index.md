---
category: '@Math'
related: createGenericProjection
---

# useProjection

Reactive numeric projection from one domain to another.

## Usage

```ts
import { useProjection } from '@solidjs-use/math'

const [input, setInput] = createSignal(0)
const projected = useProjection(input, [0, 10], [0, 100])

setInput(5) // projected() === 50
setInput(10) // projected() === 100
```
