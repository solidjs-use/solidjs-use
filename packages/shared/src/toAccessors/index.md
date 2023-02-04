---
category: Reactivity
---

# toAccessors

Change mutable object to Accessors.

## Usage

```tsx
import type { Component } from 'solid-js'
import { toAccessors } from 'solidjs-use'

const Demo: Component<{ name: string; count?: number }> = props => {
  const { name, count } = toAccessors(props, { count: 0 })
  return (
    <div>
      <div>name: {name()}</div>
      <div>count: {count()}</div>
    </div>
  )
}
```
