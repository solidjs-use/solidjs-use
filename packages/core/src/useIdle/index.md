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

Programatically resetting:

```js
import { createEffect, on } from 'solid-js'
import { useCounter, useIdle } from 'solidjs-use'

const { inc, count } = useCounter()

const { idle, lastActive, reset } = useIdle(5 * 60 * 1000) // 5 min

createEffect(
  on(idle, idleValue => {
    if (idleValue) {
      inc()
      console.log(`Triggered ${count()} times`)
      reset() // restarts the idle timer. Does not change lastActive value
    }
  })
)
```
