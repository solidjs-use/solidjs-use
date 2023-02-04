---
category: Array
---

# useArrayFilter

Reactive `Array.filter`

## Usage

### Use with array of multiple Signals

```js
import { useArrayFilter } from 'solidjs-use'
const [item1] = createSignal(0)
const [item2, setItem2] = createSignal(2)
const [item3] = createSignal(4)
const [item4] = createSignal(6)
const [item5] = createSignal(8)
const list = [item1, item2, item3, item4, item5]
const result = useArrayFilter(list, i => i % 2 === 0)
// result(): [0, 2, 4, 6, 8]
setItem2(1)
// result(): [0, 4, 6, 8]
```

### Use with reactive array

```js
import { useArrayFilter } from 'solidjs-use'
const [list, setList] = createSignal([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
const result = useArrayFilter(list, i => i % 2 === 0)
// result(): [0, 2, 4, 6, 8]
setList(([...state]) => {
  state.shift()
  return state
})
// result(): [2, 4, 6, 8]
```
