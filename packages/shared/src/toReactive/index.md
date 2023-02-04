---
category: Reactivity
---

# toReactive

Converts ref to reactive. Also made possible to create a "swapable" reactive object.

<RequiresProxy />

## Usage

```ts
import { toReactive } from 'solidjs-use'

const [state, setState] = createSignal({ foo: 'bar' })

console.log(state().foo) // => 'bar'

const newState = toReactive(state) // <--

console.log(newState.foo) // => 'bar'

setState({ bar: 'foo' })

console.log(newState.foo) // => undefined
console.log(newState.bar) // => 'foo'
```
