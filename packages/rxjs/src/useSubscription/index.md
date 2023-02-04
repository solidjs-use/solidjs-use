---
category: '@RxJS'
---

# useSubscription

Use an RxJS [`Subscription`](https://rxjs.dev/guide/subscription) without worrying about unsubscribing from it or creating memory leaks.

## Usage

```ts
import { useSubscription } from '@solidjs-use/rxjs'
import { interval } from 'rxjs'
import { createSignal } from 'solid-js'

const [count, setCount] = createSignal(0)

// useSubscription call unsubscribe method before unmount the component
useSubscription(
  interval(1000).subscribe(() => {
    setCount(state => state + 1)
  })
)
```
