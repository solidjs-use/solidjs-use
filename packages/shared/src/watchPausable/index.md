---
category: Watch
alias: pausableWatch
---

# watchPausable

Pausable watch

## Usage

Use as normal the `watch`, but return extra `pause()` and `resume()` functions to control.

```ts
import { watchPausable, nextTick } from 'solidjs-use'

const [source, setSource] = createSignal('foo')

const { stop, pause, resume } = watchPausable(source, v => console.log(`Changed to ${v}!`))

setSource('bar')
await nextTick() // Changed to bar!

pause()

setSource('foobar')
await nextTick() // (nothing happened)

resume()

setSource('hello')
await nextTick() // Changed to hello!
```
