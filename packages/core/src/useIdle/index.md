---
category: Sensors
---

# useIdle

Tracks whether the user is being inactive.

## Usage

```js
import { useIdle } from 'solidjs-use'

const { idle, lastActive } = useIdle(5 * 60 * 1000) // 5 min

console.log(idle()) // true or false
```
