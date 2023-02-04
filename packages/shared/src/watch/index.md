---
category: Watch
---

# watch

Shorthand for `createEffect(on()))` and return stop handler

## Usage

```ts
import { watch } from 'solidjs-use'

const [num, setNum] = createSignal(0)

const stop = watch(num, num => {
  console.log('number ', num)
})

setNum(1) // number 1

setTimeout(() => {
  stop() // stop watch

  setNum(2) // nothing
}, 1000)
```
