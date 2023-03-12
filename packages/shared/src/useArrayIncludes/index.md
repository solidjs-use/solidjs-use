---
category: Array
---

# useArrayIncludes

Reactive `Array.includes`

## Usage

### Use with reactive array

```js
import { useArrayIncludes } from 'solidjs-use'
const [list, setList] = createSignal([0, 2, 4, 6, 8])
const result = useArrayIncludes(list, 10)
// result(): false
setArray(([...arr]) => {
  arr.push(10)
  return arr
})
// result(): true
setArray(([...arr]) => {
  arr.pop()
  return arr
})
// result(): false
```
