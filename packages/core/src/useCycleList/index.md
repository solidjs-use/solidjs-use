---
category: Utilities
---

# useCycleList

Cycle through a list of items.

## Usage

```ts
import { useCycleList } from 'solidjs-use'

const { state, next, prev } = useCycleList(['Dog', 'Cat', 'Lizard', 'Shark', 'Whale', 'Dolphin', 'Octopus', 'Seal'])

console.log(state()) // 'Dog'

prev()

console.log(state()) // 'Seal'
```
