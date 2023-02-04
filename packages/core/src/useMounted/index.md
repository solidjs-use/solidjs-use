---
category: Component
---

# useMounted

Mounted state in Accessor.

## Usage

```js
import { useMounted } from 'solidjs-use'

const isMounted = useMounted()
```

Which is essentially a shorthand of:

```ts
const [isMounted, setIsMounted] = createSignal(false)

onMount(() => {
  setIsMounted(true)
})
```
