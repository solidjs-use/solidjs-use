---
category: Component
---

# tryOnMount

Safe `onMount`. Call `onMount()` if it's inside a component lifecycle, if not, just call the function

## Usage

```js
import { tryOnMount } from 'solidjs-use'

tryOnMount(() => {})
```
