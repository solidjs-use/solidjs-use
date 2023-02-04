---
category: Reactivity
---

# mutableMemo

Computed mutable object. Instead of returning a Accessor that `createMemo` does, `mutableMemo` returns a reactive object.

<RequiresProxy />

## Usage

```ts
import { mutableMemo } from 'solidjs-use'

const state = mutableMemo(() => {
  return {
    foo: 'bar',
    bar: 'baz'
  }
})

state.bar // 'baz'
```
