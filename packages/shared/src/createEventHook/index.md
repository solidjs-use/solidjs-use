---
category: Utilities
---

# createEventHook

Utility for creating event hooks

## Usage

Creating a function that uses `createEventHook`.

```ts
import { createEventHook } from 'solidjs-use'

export function useMyFetch(url) {
  const fetchResult = createEventHook<Response>()
  const fetchError = createEventHook<any>()

  fetch(url)
    .then(result => fetchResult.trigger(result))
    .catch(error => fetchError.trigger(error.message))

  return {
    onResult: fetchResult.on,
    onError: fetchError.on
  }
}
```

Using a function that uses `createEventHook`

```ts
import { useMyFetch } from './my-fetch-function'

const { onResult, onError } = useMyFetch('my api url')

onResult(result => {
  console.log(result)
})

onError(error => {
  console.error(error)
})
```
