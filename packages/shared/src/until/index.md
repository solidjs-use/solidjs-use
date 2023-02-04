---
category: Watch
---

# until

Promised one-time watch for changes

## Usage

### Wait for some async data to be ready

```js
import { until, useAsyncState } from 'solidjs-use'

const { state, isReady } = useAsyncState(
  fetch('https://jsonplaceholder.typicode.com/todos/1').then(t => t.json()),
  {}
)

;(async () => {
  await until(isReady).toBe(true)

  console.log(state()) // state is now ready!
})()
```

### Wait for custom conditions

> You can use `invoke` to call the async function.

```js
import { invoke, until, useCounter } from 'solidjs-use'

const { count } = useCounter()

invoke(async () => {
  await until(count).toMatch(v => v > 7)

  alert('Counter is now larger than 7!')
})
```

### Timeout

```ts
// will be resolve until state() === true or 1000ms passed
await until(state).toBe(true, { timeout: 1000 })

// will throw if timeout
try {
  await until(state).toBe(true, { timeout: 1000, throwOnTimeout: true })
  // state() === true
} catch (e) {
  // timeout
}
```

### More Examples

```ts
await until(state).toBe(true)
await until(state).toMatch(v => v > 10 && v < 100)
await until(state).changed()
await until(state).changedTimes(10)
await until(state).toBeTruthy()
await until(state).toBeNull()

await until(state).not.toBeNull()
await until(state).not.toBeTruthy()
```
