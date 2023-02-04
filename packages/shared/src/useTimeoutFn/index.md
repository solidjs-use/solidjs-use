---
category: Animation
---

# useTimeoutFn

Wrapper for `setTimeout` with controls.

## Usage

```js
import { useTimeoutFn } from 'solidjs-use'

const { isPending, start, stop } = useTimeoutFn(() => {
  /* ... */
}, 3000)
```
