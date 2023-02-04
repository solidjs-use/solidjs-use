---
category: Utilities
---

# get

Shorthand for accessing `Accessor()`

## Usage

```ts
import { get } from 'solidjs-use'

const [a, setA] = createSignal(42)

console.log(get(a)) // get(a) === a() => 42
```

```ts
import { get } from 'solidjs-use'

// object Accessor
const [info, setInfo] = createSignal({ name: 'solidjs' })

console.log(get(info, 'name')) //  info()['name'] => solidjs
```
