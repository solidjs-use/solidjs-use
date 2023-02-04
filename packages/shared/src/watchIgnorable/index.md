---
category: Watch
alias: ignorableWatch
---

# watchIgnorable

Ignorable watch

## Usage

Extended `createEffect(on(deps, cb))` that returns extra `ignoreUpdates(updater)` to ignore particular updates to the source.

```ts
import { watchIgnorable } from 'solidjs-use'
import { createSignal } from 'solid-js'

const [str, setStr] = createSignal('foo')

const { stop, ignoreUpdates } = watchIgnorable(str, v => console.log(`Changed to ${v}!`))

setStr('bar') // logs: Changed to bar!

ignoreUpdates(() => {
  setStr('foobar') // (nothing happened)
})

setStr('hello') // logs: Changed to hello!

ignoreUpdates(() => {
  setStr('ignored')
})

setStr('logged') // logs: Changed to logged!
```
