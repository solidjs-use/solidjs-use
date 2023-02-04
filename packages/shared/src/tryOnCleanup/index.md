---
category: Component
---

# tryOnCleanup

Safe `onCleanup`. Call `onCleanup()` if it's inside a component lifecycle, if not, do nothing

## Usage

```js
import { tryOnCleanup } from 'solidjs-use'

tryOnCleanup(() => {})
```
