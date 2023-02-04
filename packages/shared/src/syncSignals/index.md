---
category: Reactivity
related: syncSignal
---

# syncSignals

Keep target signal(s) in sync with a source signal

## Usage

```ts
import { syncSignals } from 'solidjs-use'

const [source, setSource] = createSignal('hello')
const [target, setTarget] = createSignal('target')

const stop = syncSignals(source, setTarget)

console.log(target()) // hello

setSource('foo')

console.log(target()) // foo
```
