---
category: Utilities
---

# useToNumber

Reactively convert a string ref to number.

## Usage

```ts
import { useToNumber } from 'solidjs-use'

const [str, setStr] = createSignal('123')
const number = useToNumber(str)

number() // 123
```
