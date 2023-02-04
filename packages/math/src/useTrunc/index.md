---
category: '@Math'
---

# useTrunc

Reactive `Math.trunc`.

## Usage

```ts
import { useTrunc } from '@solidjs-use/math'

const [value1, setValue1] = createSignal(0.95)
const [value2, setValue2] = createSignal(-2.34)
const result1 = useTrunc(value1) // 0
const result2 = useTrunc(value2) // -2
```
