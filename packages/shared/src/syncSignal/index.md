---
category: Reactivity
related: syncSignals
---

# syncSignal

Two-way Signals synchronization.

## Usage

```ts
import { syncSignal } from 'solidjs-use'

const [a, setA] = createSignal('a')
const [b, setB] = createSignal('b')

const stop = syncSignal([a, setA], [b, setB])

console.log(a()) // a

setB('foo')

console.log(a()) // foo

setA('bar')

console.log(b()) // bar
```

### One directional

```ts
import { syncSignal } from 'solidjs-use'

const [a, setA] = createSignal('a')
const [b, setB] = createSignal('b')

const stop = syncSignal([a, setA], [b, setB], { direction: 'rtl' })
```

### Custom Transform

```ts
import { syncSignal } from 'solidjs-use'

const [a, setA] = createSignal(10)
const [b, setB] = createSignal(2)

const stop = syncSignal([a, setA], [b, setB], {
  transform: {
    ltr: left => left * 2,
    rtl: right => right / 2
  }
})

console.log(b()) // 20

setB(30)

console.log(a()) // 15
```
