---
category: Watch
---

# whenever

Shorthand for watching value to be truthy.

## Usage

```js
import { useAsyncState, whenever } from 'solidjs-use'

const { state, isReady } = useAsyncState(
  fetch('https://jsonplaceholder.typicode.com/todos/1').then(t => t.json()),
  {}
)

whenever(isReady, () => console.log(state()))
```

```ts
// this
whenever(ready, () => console.log(state()))

// is equivalent to:
createEffect(
  on(ready, isReady => {
    if (isReady) console.log(state())
  })
)
```

### Callback Function

Same as `on`, the callback will be called with `cb(input, prevInput, prev)`.

```ts
whenever(height, (current, lastHeight) => {
  if (current > lastHeight) console.log(`Increasing height by ${current - lastHeight}`)
})
```

### Computed

Same as `createEffect`, you can pass a getter function to calculate on each change.

```ts
// this
whenever(
  () => counter() === 7,
  () => console.log('counter is 7 now!')
)
```

### Options

Options and defaults are same with `createEffect`.

```ts
// this
whenever(
  () => counter() === 7,
  () => console.log('counter is 7 now!'),
  { defer: true }
)
```
