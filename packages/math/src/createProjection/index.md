---
category: '@Math'
related: useProjection, createGenericProjection
---

# createProjection

Reactive numeric projection from one domain to another.

## Usage

```ts
import { createProjection } from '@solidjs-use/math'

const useProjector = createProjection([0, 10], [0, 100])
const [input, setInput] = createSignal(0)
const projected = useProjector(input) // projected() === 0

setInput(5) // projected() === 50
setInput(10) // projected() === 100
```
