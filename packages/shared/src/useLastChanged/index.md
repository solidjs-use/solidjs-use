---
category: State
---

# useLastChanged

Records the timestamp of the last change

## Usage

```ts
import { createSignal } from 'solid-js'
import { useLastChanged } from 'solidjs-use'

const [count, setCount] = createSignal(0)

const lastChanged = useLastChanged(a)

setCount(1)

console.log(lastChanged())
```
