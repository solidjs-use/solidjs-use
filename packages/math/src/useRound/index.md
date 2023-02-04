---
category: '@Math'
---

# useRound

Reactive `Math.round`.

## Usage

```ts
import { useRound } from '@solidjs-use/math'

const [value, setValue] = createSignal(20.49)
const result = useRound(value) // 20
```
