---
category: Array
---

# useSorted

Reactive sort array

## Usage

```tsx
import { useSorted } from 'solidjs-use'

// general sort
const source = [10, 3, 5, 7, 2, 1, 8, 6, 9, 4]
const sorted = useSorted(source)

console.log(sorted()) // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(source) // [10, 3, 5, 7, 2, 1, 8, 6, 9, 4]

// object sort
const objArr = [
  {
    name: 'John',
    age: 40
  },
  {
    name: 'Jane',
    age: 20
  },
  {
    name: 'Joe',
    age: 30
  },
  {
    name: 'Jenny',
    age: 22
  }
]
const objSorted = useSorted(objArr, (a, b) => a.age - b.age)
```

### dirty mode

dirty mode will change the source array.

```ts
const sourceSignal = createSignal([10, 3, 5, 7, 2, 1, 8, 6, 9, 4])
const sorted = useSorted(sourceSignal, (a, b) => a - b, {
  dirty: true
})
console.log(source) // output: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
```
