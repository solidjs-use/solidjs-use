---
category: State
related: useThrottledHistoryTravel, useHistoryTravel
---

# useThrottledHistoryTravel

Shorthand for `useHistoryTravel` with throttled filter.

## Usage

This function takes the first snapshot right after the counter's value was changed and the second with a delay of 1000ms.

```ts
import { createSignal } from 'solid-js'
import { useThrottledHistoryTravel } from 'solidjs-use'

const [counter, setCounter] = createSignal(0)
const { history } = useThrottledHistoryTravel(counter, { throttle: 1000 }) // Accessor
const { history, redo, undo } = useThrottledHistoryTravel([counter, setCounter], { throttle: 1000 }) // Signal
```
