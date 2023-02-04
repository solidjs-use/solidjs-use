---
category: Array
---

# useArrayFind

Reactive `Array.find`.

## Usage

```js
import { useArrayFind } from 'solidjs-use'

const [item1, setItem1] = createSignal(1)
const [item2, setItem2] = createSignal(2)
const [item3, setItem3] = createSignal(3)
const positive = useArrayFind([item1, item2, item3], val => val > 0)
// positive(): 1
```

### Use with reactive array

```js
import { useArrayFind } from 'solidjs-use'
import { createMutable } from 'solid-js/store'

const list = createMutable([-1, -2])
const positive = useArrayFind(list, val => val > 0)
// positive(): undefined
list.push(1)
// positive(): 1
```
