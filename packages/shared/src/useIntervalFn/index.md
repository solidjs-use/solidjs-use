---
category: Animation
---

# useIntervalFn

Wrapper for `setInterval` with controls

## Usage

```js
import { useIntervalFn } from 'solidjs-use'

const { pause, resume, isActive } = useIntervalFn(() => {
  /* your function */
}, 1000)
```
