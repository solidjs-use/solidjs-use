---
category: Utilities
---

# useCounter

Basic counter with utility functions.

## Basic Usage

```js
import { useCounter } from 'solidjs-use'

const { count, inc, dec, set, reset } = useCounter()
```

## Usage with options

```js
import { useCounter } from 'solidjs-use'

const { count, inc, dec, set, reset } = useCounter(1, { min: 0, max: 16 })
```
