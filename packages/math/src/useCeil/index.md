---
category: '@Math'
---

# useCeil

Reactive `Math.ceil`

## Usage

```ts
import { useCeil } from '@solidjs-use/math'

const [value, setValue] = createSignal(0.95)
const result = useCeil(value) // 1
```
