---
category: '@RxJS'
---

# useObservable

Use an RxJS [`Observable`](https://rxjs.dev/guide/observable), return a `Signal`, and automatically unsubscribe from it when the component is unmounted.

## Usage

```tsx
import { useObservable } from '@solidjs-use/rxjs'
import { interval } from 'rxjs'
import { mapTo, scan, startWith } from 'rxjs/operators'

const Demo = () => {
  const [count, setCount] = useObservable(
    interval(1000).pipe(
      mapTo(1),
      startWith(0),
      scan((total, next) => next + total)
    )
  )

  return (
    <>
      <p>Counter: {count}</p>
    </>
  )
}
```

If you want to add custom error handling to an `Observable` that might error, you can supply an optional `onError` configuration. Without this, RxJS will treat any error in the supplied `Observable` as an "unhandled error" and it will be thrown in a new call stack and reported to `window.onerror` (or `process.on('error')` if you happen to be in Node).

```ts
import { useObservable } from '@solidjs-use/rxjs'
import { interval } from 'rxjs'
import { map } from 'rxjs/operators'

const [count, setCount] = useObservable(
  interval(1000).pipe(
    map(n => {
      if (n === 10) throw new Error('oops')

      return n + n
    })
  ),
  {
    onError: err => {
      console.log(err.message) // "oops"
    }
  }
)
```
