---
category: Utilities
---

# usePrevious

Holds the previous value of a Accessor.

## Usage

```ts
import { createSignal } from 'solid-js'
import { usePrevious } from 'solidjs-use'

const [counter, setCounter] = createSignal('Hello')
const previous = usePrevious(counter)

console.log(previous()) // undefined

setCounter('World')

console.log(previous()) // Hello
```
