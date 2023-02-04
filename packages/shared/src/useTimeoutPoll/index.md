---
category: Utilities
---

# useTimeoutPoll

Use timeout to poll something. It's will trigger callback after last task is done.

## Usage

```js
import { createSignal } from 'solid-js'
import { useTimeoutPoll } from 'solidjs-use'

const [count, setCount] = createSignal(0)

const fetchData = async () => {
  await promiseTimeout(1000)
  setCount(count => count + 1)
}

// Only trigger after last fetch is done
const { isActive, pause, resume } = useTimeoutPoll(fetchData, 1000)
```
