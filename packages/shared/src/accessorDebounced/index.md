---
category: Reactivity
alias: useDebounce, accessorDebounced
---

# accessorDebounced

Debounce execution of a Accessor value.

## Usage

```js
import { accessorDebounced } from 'solidjs-use'

const [input, setInput] = createSignal('foo')
const Debounced = accessorDebounced(input, 1000)

setInput('bar')
console.log(debounced()) // 'foo'

await sleep(1100)

console.log(debounced()) // 'bar'
```

You can also pass an optional 3rd parameter including maxWait option. See `useDebounceFn` for details.

## Recommended Reading

- [**Debounce vs Throttle**: Definitive Visual Guide](https://redd.one/blog/debounce-vs-throttle)
