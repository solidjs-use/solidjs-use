---
category: Array
---

# useArrayUnique

Reactive unique array

## Usage

### Use with array of multiple refs

```tsx
import { useArrayUnique } from 'solidjs-use'

const [item1] = createSignal(0)
const [item2] = createSignal(1)
const [item3] = createSignal(1)
const [item4] = createSignal(2)
const [item5, setItem5] = createSignal(3)
const list = [item1, item2, item3, item4, item5]
const result = useArrayUnique(list)
// result(): [0, 1, 2, 3]
setItem5(2)
// result(): [0, 1, 2]
```
