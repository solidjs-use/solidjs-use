---
category: Array
---

# useArraySome

Reactive `Array.some`

## Usage

### Use with array of multiple Signals

```js
import { useArraySome } from 'solidjs-use'
const [item1, setItem1] = createSignal(0)
const [item2] = createSignal(2)
const [item3] = createSignal(4)
const [item4] = createSignal(6)
const [item5] = createSignal(8)
const list = [item1, item2, item3, item4, item5]
const result = useArraySome(list, i => i > 10)
// result(): false
setItem1(11)
// result(): true
```

### Use with reactive array

```js
import { useArraySome } from 'solidjs-use'
const [list, setList] = createSignal([0, 2, 4, 6, 8])
const result = useArraySome(list, i => i > 10)
// result(): false
setList(([...state]) => [...state, 11])
// result(): true
```
