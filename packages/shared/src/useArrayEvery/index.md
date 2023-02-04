---
category: Array
---

# useArrayEvery

Reactive `Array.every`

## Usage

### Use with array of multiple Signals

```js
import { useArrayEvery } from 'solidjs-use'
const [item1, setItem1] = createSignal(0)
const [item2] = createSignal(2)
const [item3] = createSignal(4)
const [item4] = createSignal(6)
const [item5] = createSignal(8)
const list = [item1, item2, item3, item4, item5]
const result = useArrayEvery(list, i => i % 2 === 0)
// result(): true
setItem1(1)
// result(): false
```

### Use with reactive array

```js
import { useArrayEvery } from 'solidjs-use'
const [list, setList] = createSignal([0, 2, 4, 6, 8])
const result = useArrayEvery(list, i => i % 2 === 0)
// result(): true
setList(([...state]) => {
  state.push(9)
  return state
})
// result(): false
```
