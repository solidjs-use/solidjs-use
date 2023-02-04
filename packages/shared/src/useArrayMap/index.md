---
category: Array
---

# useArrayMap

Reactive `Array.map`

## Usage

### Use with array of multiple Signals

```js
import { useArrayMap } from 'solidjs-use'
const [item1, setItem1] = createSignal(0)
const [item2] = createSignal(2)
const [item3] = createSignal(4)
const [item4] = createSignal(6)
const [item5] = createSignal(8)
const list = [item1, item2, item3, item4, item5]
const result = useArrayMap(list, i => i * 2)
// result(): [0, 4, 8, 12, 16]
setItem1(1)
// result(): [2, 4, 8, 12, 16]
```

### Use with reactive array

```js
import { useArrayMap } from 'solidjs-use'
const [list, setList] = createSignal([0, 1, 2, 3, 4])
const result = useArrayMap(list, i => i * 2)
// result(): [0, 2, 4, 6, 8]
setList(([...state]) => {
  state.pop()
  return state
})
// result(): [0, 2, 4, 6]
```
