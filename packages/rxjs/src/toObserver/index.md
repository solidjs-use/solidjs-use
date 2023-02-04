---
category: '@RxJS'
---

# toObserver

Sugar function to convert a `Accessor` into an RxJS [Observer](https://rxjs.dev/guide/observer).

## Usage

```tsx
import { from, fromEvent, toObserver, useSubscription } from '@solidjs-use/rxjs'
import { interval } from 'rxjs'
import { map, mapTo, startWith, takeUntil, withLatestFrom } from 'rxjs/operators'
import { Accessor, createSignal } from 'solid-js'

const Demo = () => {
  const [count, setCount] = createSignal(0)
  const [button, setButton] = createSignal<HTMLButtonElement | null>(null)

  useSubscription(
    interval(1000)
      .pipe(
        mapTo(1),
        takeUntil(fromEvent(button as Accessor<HTMLButtonElement>, 'click')),
        withLatestFrom(from(count).pipe(startWith(0))),
        map(([total, curr]) => curr + total)
      )
      .subscribe(toObserver(setCount))
  )

  return (
    <>
      <div>
        <button onClick={() => setCount(state => state + 1)}>count is: {count()}</button>
        <button ref={setButton}>stop</button>
      </div>
    </>
  )
}
```
