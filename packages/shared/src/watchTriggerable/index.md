---
category: Watch
---

# watchTriggerable

Watch that can be triggered manually

## Usage

A `watch` wrapper that supports manual triggering of `WatchCallback`, which returns an additional `trigger` to execute a `WatchCallback` immediately.

```ts
import { watchTriggerable } from 'solidjs-use'

const [source, setSource] = createSignal(0)

const { trigger, ignoreUpdates } = watchTriggerable(source, v => console.log(`Changed to ${v}!`))

setSource('bar')
await nextTick() // logs: Changed to bar!

// Execution of WatchCallback via `trigger` does not require waiting
trigger() // logs: Changed to bar!
```
