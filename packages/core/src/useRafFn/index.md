---
category: Animation
---

# useRafFn

Call function on every `requestAnimationFrame`. With controls of pausing and resuming.

## Usage

```js
import { createSignal } from 'solid-js'
import { useRafFn } from 'solidjs-use'

const [count, setCount] = createSignal(0)

const { pause, resume } = useRafFn(() => {
  setCount(count => count + 1)
  console.log(count())
})
```
