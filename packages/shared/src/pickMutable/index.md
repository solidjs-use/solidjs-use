---
category: Reactivity
---

# pickMutable

Reactively pick fields from a reactive object.

## Usage

```js
import { pickMutable } from 'solidjs-use'

const obj = reactive({
  x: 0,
  y: 0,
  elementX: 0,
  elementY: 0
})

const picked = pickMutable(obj, 'x', 'elementX') // { x: number, elementX: number }
```
