---
category: Watch
---

# watchOnce

`watch` that only triggers once.

## Usage

After the callback function has been triggered once, the watch will be stopped automatically.

```ts
import { watchOnce } from 'solidjs-use'

watchOnce(source, () => {
  // triggers only once
  console.log('source changed!')
})
```
