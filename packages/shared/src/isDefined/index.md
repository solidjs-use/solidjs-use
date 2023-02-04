---
category: Utilities
---

# isDefined

Non-nullish checking type guard for Ref.

## Usage

```ts
import { createSignal } from 'solid-js'
import { isDefined } from 'solidjs-use'

const [example, setExample] = createSignal(Math.random() ? 'example' : undefined) // Signal<string | undefined>

if (isDefined(example)) {
  example // Accessor<string>
}
```
