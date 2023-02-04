---
category: State
related: useHistoryTravel
---

# useManualHistoryTravel

Manually track the change history of a `Signal` or `Accessor` when the using calls `commit()`, when the parameter is a Signal, it provides undo and redo functionality.

## Usage

```js {5}
import { createSignal } from 'solid-js'
import { useManualHistoryTravel } from 'solidjs-use'

const [counter, setCounter] = createSignal(0)
const { history, commit, undo, redo } = useManualHistoryTravel([counter, setCounter])

setCounter(state => state + 1)
commit()

console.log(history())
/* [
  { snapshot: 1, timestamp: 1601912898062 },
  { snapshot: 0, timestamp: 1601912898061 }
] */
```

You can use `undo` to reset the ref value to the last history point.

```ts
console.log(counter()) // 1
undo()
console.log(counter()) // 0
```

#### History of mutable objects

If you are going to mutate the source, you need to pass a custom clone function or use `clone` `true` as a param, that is a shortcut for a minimal clone function `x => JSON.parse(JSON.stringify(x))` that will be used in both `dump` and `parse`.

```ts {5}
import { createSignal } from 'solid-js'
import { useManualHistoryTravel } from 'solidjs-use'

const [counter, setCounter] = createSignal({ foo: 1, bar: 2 })
const { history, commit, undo, redo } = useManualHistoryTravel([counter, setCounter], { clone: true })

counter().foo += 1
commit()
```

#### Custom Clone Function

To use a full featured or custom clone function, you can set up via the `dump` options.

For example, using [structuredClone](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone):

```ts
import { useManualHistoryTravel } from 'solidjs-use'

const history = useManualHistoryTravel(target, { clone: structuredClone })
```

Or by using [lodash's `cloneDeep`](https://lodash.com/docs/4.17.15#cloneDeep):

```ts
import { cloneDeep } from 'lodash-es'
import { useManualHistoryTravel } from 'solidjs-use'

const history = useManualHistoryTravel(target, { clone: cloneDeep })
```

Or a more lightweight [`klona`](https://github.com/lukeed/klona):

```ts
import { klona } from 'klona'
import { useManualHistoryTravel } from 'solidjs-use'

const history = useManualHistoryTravel(target, { clone: klona })
```

#### Custom Dump and Parse Function

Instead of using the `clone` param, you can pass custom functions to control the serialization and parsing. In case you do not need history values to be objects, this can save an extra clone when undoing. It is also useful in case you want to have the snapshots already stringified to be saved to local storage for example.

```ts
import { useManualHistoryTravel } from 'solidjs-use'

const refHistory = useManualHistoryTravel(target, {
  dump: JSON.stringify,
  parse: JSON.parse
})
```

### History Capacity

We will keep all the history by default (unlimited) until you explicitly clear them up, you can set the maximal amount of history to be kept by `capacity` options.

```ts
const history = useManualHistoryTravel(target, {
  capacity: 15 // limit to 15 history records
})

history.clear() // explicitly clear all the history
```
