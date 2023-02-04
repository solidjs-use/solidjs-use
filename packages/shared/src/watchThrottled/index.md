---
category: Watch
alias: throttledWatch
---

# watchThrottled

Throttled watch.

## Usage

Similar to `watch`, but offering an extra option `throttle` which will be applied to the callback function.

```ts
import { watchThrottled } from 'solidjs-use'

watchThrottled(
  source,
  () => {
    console.log('changed!')
  },
  { throttle: 500 }
)
```

It's essentially a shorthand for the following code:

```ts
import { throttleFilter, watchWithFilter } from 'solidjs-use'

watchWithFilter(
  source,
  () => {
    console.log('changed!')
  },
  {
    eventFilter: throttleFilter(500)
  }
)
```
