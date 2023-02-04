---
category: Reactivity
---

# omitMutable

Reactively omit fields from `createMutable` object.

## Usage

```js
import { omitMutable } from 'solidjs-use'

const obj = createMutable({
  x: 0,
  y: 0,
  elementX: 0,
  elementY: 0
})

const picked = omitMutable(obj, 'x', 'elementX') // { y: number, elementY: number }
```
