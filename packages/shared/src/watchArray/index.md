---
category: Watch
---

# watchArray

Watch for an array with additions and removals.

## Usage

Similar to `createEffect(on())`, but provides the added and removed elements to the callback function.

```ts
import { watchArray } from 'solidjs-use'

const [list, setList] = createSignal([1, 2, 3])

watchArray(list, (newList, oldList, added, removed) => {
  console.log(newList) // [1, 2, 3, 4]
  console.log(oldList) // [1, 2, 3]
  console.log(added) // [4]
  console.log(removed) // []
})

onMount(() => {
  setList(list => [...list(), 4])
})
```
