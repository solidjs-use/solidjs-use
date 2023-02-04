---
category: Utilities
---

# useToString

Reactively convert a Accessor to string.

## Usage

```ts
import { useToString } from 'solidjs-use'

const [number, setNumber] = createSignal(3.14)
const str = useToString(number)

str() // '3.14'
```
