---
category: '@Math'
---

# useFloor

Reactive `Math.floor`.

## Usage

```ts
import { useFloor } from '@solidjs-use/math'

const [value, setValue] = createSignal(45.95)
const result = useFloor(value) // 45
```
