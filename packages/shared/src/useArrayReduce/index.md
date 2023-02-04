---
category: Array
---

# useArrayReduce

Reactive `Array.reduce`.

## Usage

```js
import { useArrayReduce } from 'solidjs-use'
const [item1, setItem1] = createSignal(1)
const [item2, setItem2] = createSignal(2)
const [item3, setItem3] = createSignal(3)

const sum = useArrayReduce([item1, item2, item3], (sum, val) => sum + val)
// sum(): 6
```

### Use with reactive array

```js
import { useArrayReduce } from 'solidjs-use'

const list = reactive([1, 2])
const sum = useArrayReduce(list, (sum, val) => sum + val)

list.push(3)
// sum(): 6
```

### Use with initialValue

```js
import { useArrayReduce } from 'solidjs-use'

const list = reactive([{ num: 1 }, { num: 2 }])
const sum = useArrayReduce(list, (sum, val) => sum + val.num, 0)
// sum(): 3
```
