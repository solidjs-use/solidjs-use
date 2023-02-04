---
category: '@Math'
---

# useAbs

Reactive `Math.abs`.

## Usage

```ts
import { useAbs } from '@solidjs-use/math'

const [value, setValue] = createSignal(-23)
const absValue = useAbs(value) // Accessor<23>
```
