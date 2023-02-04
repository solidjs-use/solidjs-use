---
category: State
related:
  - useHistoryTravel
  - useThrottledHistoryTravel
---

# useDebouncedHistoryTravel

Shorthand for `useHistoryTravel` with debounced filter.

## Usage

This function takes a snapshot of your counter after 1000ms when the value of it starts to change.

```ts
import { useDebouncedHistoryTravel } from 'solidjs-use'
import { createSignal } from 'solid-js'

const [counter, setCounter] = createSignal(0)
const { history, undo, redo } = useDebouncedHistoryTravel([counter, setCounter], { debounce: 1000 })
```
