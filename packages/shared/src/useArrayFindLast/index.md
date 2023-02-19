---
category: Array
---

# useArrayFindLast

Reactive `Array.findLast`.

## Usage

```js
import { useArrayFindLast } from 'solidjs-use'

const [item1, setItem1] = createSignal(1)
const [item2, setItem2] = createSignal(-1)
const [item3, setItem3] = createSignal(2)
const list = [item1, item2, item3]
const positive = useArrayFindLast(list, val => val > 0)
// positive(): 2
```

### Use with reactive array

```js
import { createMutable } from 'solid-js/store'
import { useArrayFindLast } from 'solidjs-use'

const list = createMutable([-1, -2])
const positive = useArrayFindLast(list, val => val > 0)
// positive(): undefined
list.push(10)
// positive(): 10
list.push(5)
// positive(): 5
```
