---
category: Browser
---

# usePerformanceObserver

Observe performance metrics.

## Usage

```ts
import { createSignal } from 'solid-js'
import { usePerformanceObserver } from 'solidjs-use'

const [entrys, setEntrys] = createSignal<PerformanceEntry[]>([])
usePerformanceObserver(
  {
    entryTypes: ['paint']
  },
  list => {
    setEntrys(list.getEntries())
  }
)
```
