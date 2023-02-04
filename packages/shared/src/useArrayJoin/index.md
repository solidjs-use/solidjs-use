---
category: Array
---

# useArrayJoin

Reactive `Array.join`

## Usage

### Use with array of multiple Signals

```js
import { useArrayJoin } from 'solidjs-use'
const [item1, setItem1] = createSignal('foo')
const [item2] = createSignal(0)
const [item3] = createSignal({ prop: 'val' })
const list = [item1, item2, item3]
const result = useArrayJoin(list)
// result(): foo,0,[object Object]
setItem1('bar')
// result(): bar,0,[object Object]
```

### Use with reactive array

```js
const [list, setList] = createSignal(['string', 0, { prop: 'val' }, false, [1], [[2]], null, undefined, []])
const result = useArrayJoin(list)
// result(): string,0,[object Object],false,1,2,,,
setList(([...state]) => {
  state.push(true)
  return state
})
// result(): string,0,[object Object],false,1,2,,,,true
setList([null, 'string', undefined])
// result(): ,string,
```

### Use with reactive separator

```js
import { useArrayJoin } from 'solidjs-use'
const [list] = createSignal(['string', 0, { prop: 'val' }, [1], [[2]], null, undefined, []])
const [separator, setSeparator] = createSignal<string>()
const result = useArrayJoin(list, separator)
// result(): string,0,[object Object]
setSeparator('')
// result(): string0[object Object]
setSeparator('--')
// result(): string--0--[object Object]
```
