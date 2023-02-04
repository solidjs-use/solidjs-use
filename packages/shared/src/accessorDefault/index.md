---
category: Reactivity
---

# accessorDefault

Apply default value to a Accessor.

## Usage

```ts
import { accessorDefault, useStorage } from 'solidjs-use'

const [message, setMessage] = useStorage('key')
const state = accessorDefault(message, 'default')

setMessage('hello')
console.log(state()) // hello

setMessage(undefined)
console.log(state()) // default
```
