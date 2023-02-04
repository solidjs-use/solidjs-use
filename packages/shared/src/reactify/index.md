---
category: Reactivity
alias: createReactiveFn
---

# reactify

Converts plain functions into reactive functions. The converted function accepts Signals as its arguments and returns a Accessor, with proper typing.

## Usage

Basic example

```ts
import { reactify } from 'solidjs-use'

// a plain function
function add(a: number, b: number): number {
  return a + b
}

// now it accept Signals and returns a memo data
// (a: number | Accessor<number>, b: number | Accessor<number>) => Accessor<number>
const reactiveAdd = reactify(add)

const [a, setA] = createSignal(1)
const [b, setB] = createSignal(2)
const sum = reactiveAdd(a, b)

console.log(sum()) // 3

setA(5)

console.log(sum()) // 7
```

An example of implementing a reactive [Pythagorean theorem](https://en.wikipedia.org/wiki/Pythagorean_theorem).

```ts
import { reactify } from 'solidjs-use'

const pow = reactify(Math.pow)
const sqrt = reactify(Math.sqrt)
const add = reactify((a: number, b: number) => a + b)

const [a, setA] = createSignal(3)
const [b, setB] = createSignal(4)
const c = sqrt(add(pow(a, 2), pow(b, 2)))
console.log(c()) // 5

// 5:12:13
setA(5)
setB(12)
console.log(c()) // 13
```

You can also do it this way:

```ts
import { reactify } from 'solidjs-use'

function pythagorean(a: number, b: number) {
  return Math.sqrt(a ** 2 + b ** 2)
}

const [a, setA] = createSignal(3)
const [b, setB] = createSignal(4)

const c = reactify(pythagorean)(a, b)
console.log(c()) // 5
```

Another example of making reactive `stringify`

```ts
import { reactify } from 'solidjs-use'

const stringify = reactify(JSON.stringify)

const [obj, setObj] = createSignal(42)
const dumped = stringify(obj)

console.log(dumped()) // '42'

setObj({ foo: 'bar' })

console.log(dumped()) // '{"foo":"bar"}'
```
