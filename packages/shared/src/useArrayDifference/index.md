---
category: Array
---

# useArrayDifference

Reactive get array difference of two array

## Usage

### Use with reactive array

```js
import { useArrayDifference } from 'solidjs-use'
const [list1, setList1] = createSignal([1, 2, 3, 4, 5])
const [list2, setList2] = createSignal([4, 5, 6])
const result = useArrayDifference(list1, list2)
// result(): [0, 1, 2, 3]
setList2([0, 1, 2])
// result(): [3, 4, 5]
```

### Use with reactive array and use function comparison

```js
import { useArrayDifference } from 'solidjs-use'

const [list1, setList1] = createSignal([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }])
const [list2, setList2] = createSignal([{ id: 4 }, { id: 5 }, { id: 6 }])

const result = useArrayDifference(list1, list2, (value, othVal) => value.id === othVal.id)
// result(): [{ id: 1 }, { id: 2 }, { id: 3 }]
```
