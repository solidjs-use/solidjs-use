---
category: Reactivity
---

# reactifyObject

Apply `reactify` to an object

## Usage

```ts
import { reactifyObject } from 'solidjs-use'

const reactifiedConsole = reactifyObject(console)

const [a, setA] = createSignal('42')

reactifiedConsole.log(a) // no longer need `a()`
```
