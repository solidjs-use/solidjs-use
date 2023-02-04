---
category: Animation
---

# useTimestamp

Reactive current timestamp

## Usage

```js
import { useTimestamp } from 'solidjs-use'

const [timestamp, setTimestamp] = useTimestamp({ offset: 0 })
```

```js
const { timestamp, pause, resume } = useTimestamp({ controls: true })
```
