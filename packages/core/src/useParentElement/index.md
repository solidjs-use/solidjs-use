---
category: Elements
---

# useParentElement

Get parent element of the given element.

## Usage

When no argument is passed, it will return the parent element of the current component.

```js
import { useParentElement } from 'solidjs-use'

const parentEl = useParentElement()

onMount(() => {
  console.log(parentEl())
})
```

It can also accept a `signal` as the first argument.

```ts
import { useParentElement } from 'solidjs-use'

const [tooltip, setTooltip] = createSignal<HTMLElement | undefined>()

const tooltipWrapper = useParentElement(tooltip)

onMount(() => {
  console.log(tooltipWrapper())
})
```
