---
category: Sensors
---

# useMouse

Reactive mouse position

## Basic Usage

```js
import { useMouse } from 'solidjs-use'

const { x, y, sourceType } = useMouse()
```

Touch is enabled by default. To only detect mouse changes, set `touch` to `false`.
The `dragover` event is used to track mouse position while dragging.

```js
const { x, y } = useMouse({ touch: false })
```

## Custom Extractor

It's also possible to provide a custom extractor function to get the position from the event.

```js
import { type UseMouseEventExtractor, useMouse, useParentElement } from 'solidjs-use'

const parentEl = useParentElement()

const extractor: UseMouseEventExtractor = event => (event instanceof Touch ? null : [event.offsetX, event.offsetY])

const { x, y, sourceType } = useMouse({ target: parentEl, type: extractor })
```

Touch is enabled by default. To only detect mouse changes, set `touch` to `false`.
The `dragover` event is used to track mouse position while dragging.

```js
const { x, y } = useMouse({ touch: false })
```
