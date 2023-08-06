---
category: State
related: useManualHistoryTravel
---

# useHistoryTravel

Track the change history of a `Signal` or `Accessor`, when the parameter is a Signal, it provides undo and redo functionality.

## Usage

```ts {5}
import { createSignal } from "solid-js"
import { useHistoryTravel } from "solidjs-use"

const [counter, setCounter] = createSignal(0)
const { history, undo, redo } = useHistoryTravel([counter, setCounter])
```

Internally, `createEffect` is used to trigger a history point when the value is modified. This means that history points are triggered asynchronously batching modifications in the same "tick".

```ts
setCounter(count => count + 1)

console.log(history())
/* [
  { snapshot: 1, timestamp: 1601912898062 },
  { snapshot: 0, timestamp: 1601912898061 }
] */
```

You can use `undo` to reset the signal value to the last history point.

```ts
console.log(counter()) // 1
undo()
console.log(counter()) // 0
```

#### Custom Clone Function

`useHistoryTravel` only embeds the minimal clone function `x => JSON.parse(JSON.stringify(x))`. To use a full featured or custom clone function, you can set up via the `clone` options.

For example, using [structuredClone](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone):

```ts
import { useHistoryTravel } from "solidjs-use"

const historyTravelData = useHistoryTravel(target, { clone: structuredClone })
```

Or by using [lodash's `cloneDeep`](https://lodash.com/docs/4.17.15#cloneDeep):

```ts
import { cloneDeep } from "lodash-es"
import { useHistoryTravel } from "solidjs-use"

const historyTravelData = useHistoryTravel(target, { clone: cloneDeep })
```

Or a more lightweight [`klona`](https://github.com/lukeed/klona):

```ts
import { klona } from "klona"
import { useHistoryTravel } from "solidjs-use"

const historyTravelData = useHistoryTravel(target, { clone: klona })
```

#### Custom Dump and Parse Function

Instead of using the `clone` options, you can pass custom functions to control the serialization and parsing. In case you do not need history values to be objects, this can save an extra clone when undoing. It is also useful in case you want to have the snapshots already stringified to be saved to local storage for example.

```ts
import { useHistoryTravel } from "solidjs-use"

const historyTravelData = useHistoryTravel(target, {
  clone: JSON.stringify,
  parse: JSON.parse
})
```

### History Capacity

We will keep all the history by default (unlimited) until you explicitly clear them up, you can set the maximal amount of history to be kept by `capacity` options.

```ts
const historyTravelData = useHistoryTravel(target, {
  capacity: 15 // limit to 15 history records
})

history.clear() // explicitly clear all the history
```
