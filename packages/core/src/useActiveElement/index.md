---
category: Elements
---

# useActiveElement

Reactive `document.activeElement`

## Usage

```js
import { useActiveElement } from 'solidjs-use'

const activeElement = useActiveElement()

createEffect(el => {
  console.log('focus changed to', activeElement())
})
```
