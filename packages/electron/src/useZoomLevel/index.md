---
category: '@Electron'
---

# useZoomLevel

Reactive [WebFrame](https://www.electronjs.org/docs/api/web-frame#webframe) zoom level.

## Usage

```ts
import { useZoomLevel } from '@solidjs-use/electron'

// enable nodeIntegration if you don't provide webFrame explicitly
// @see: https://www.electronjs.org/docs/api/webview-tag#nodeintegration
// Ref result will return
const [level, setLevel] = useZoomLevel()
console.log(level()) // print current zoom level
setLevel(2) // change current zoom level
```

Set initial zoom level immediately

```js
import { useZoomLevel } from '@solidjs-use/electron'

const [level, setLevel] = useZoomLevel(2)
```

Pass a `Accessor` and the level will be updated when the source ref changes

```js
import { useZoomLevel } from '@solidjs-use/electron'

const [level, setLevel] = createSignal(1)

useZoomLevel(level) // zoom level will match with the ref

setLevel(2) // zoom level will change
```
