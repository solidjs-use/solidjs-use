---
category: Utilities
---

# useCloned

Reactive clone of a Accessor. By default, it use `JSON.parse(JSON.stringify())` to do the clone.

## Usage

```ts
import { createSignal } from 'solid-js'
import { useCloned } from 'solidjs-use'

const { cloned, setCloned } = useCloned({ key: 'value' })
console.log(cloned().key) // 'some new value'
```

```ts
import { createSignal } from 'solid-js'
import { useCloned } from 'solidjs-use'

const [original, setOriginal] = createSignal({ key: 'value' })

// Accessor object
const { cloned } = useCloned(original)

setOriginal({ key: 'some new value' })

console.log(cloned().key) // 'some new value'
```

## Manual cloning

```ts
import { createSignal } from 'solid-js'
import { useCloned } from 'solidjs-use'

const [original, setOriginal] = createSignal({ key: 'value' })

const { cloned, sync } = useCloned(original, { manual: true })

setOriginal({ key: 'manual' })

console.log(cloned().key) // 'value'

sync()

console.log(cloned().key) // 'manual'
```

## Custom Clone Function

Using [`klona`](https://www.npmjs.com/package/klona) for example:

```ts
import { createSignal } from 'solid-js'
import { useCloned } from 'solidjs-use'
import { klona } from 'klona'

const [original, setOriginal] = createSignal({ key: 'value' })

const { cloned, sync } = useCloned(original, { clone: klona })
```
