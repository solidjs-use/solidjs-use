---
category: State
---

# createSharedComposable

Make a composable function usable with multiple SolidJS component instances.

## Usage

```ts
import { createSharedComposable, useCounter } from 'solidjs-use'

const useSharedCounter = createSharedComposable(useCounter)

// CompA.tsx
const { count, inc, dec } = useSharedCounter()

// CompB.tsx - will reuse the previous state and no new event listeners will be registered
const { count, inc, dec } = useSharedCounter()
```
