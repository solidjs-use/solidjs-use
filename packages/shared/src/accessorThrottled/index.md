---
category: Reactivity
alias: useThrottle, accessorThrottled
---

# accessorThrottled

Throttle changing of a Accessor value.

## Usage

```js
import { accessorThrottled } from 'solidjs-use'

const [input, setInput] = createSignal('')
const throttled = accessorThrottled(input, 1000)
```

### Trailing

If you don't want to watch trailing changes, set 3rd param `false` (it's `true` by default):

```js
import { accessorThrottled } from 'solidjs-use'

const [input, setInput] = createSignal('')
const throttled = accessorThrottled(input, 1000, false)
```

### Leading

Allows the callback to be invoked immediately (on the leading edge of the `ms` timeout). If you don't want this behavior, set the 4th param `false` (it's `true` by default):

```js
import { accessorThrottled } from 'solidjs-use'

const [input, setInput] = createSignal('')
const throttled = accessorThrottled(input, 1000, undefined, false)
```

## Recommended Reading

- [Debounce vs Throttle: Definitive Visual Guide](https://redd.one/blog/debounce-vs-throttle)
- [Debouncing and Throttling Explained Through Examples](https://css-tricks.com/debouncing-throttling-explained-examples/)
