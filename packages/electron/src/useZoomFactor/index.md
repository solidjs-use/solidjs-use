---
category: '@Electron'
---

# useZoomFactor

Reactive [WebFrame](https://www.electronjs.org/docs/api/web-frame#webframe) zoom factor.

## Usage

```ts
import { useZoomFactor } from '@solidjs-use/electron'

// enable nodeIntegration if you don't provide webFrame explicitly
// @see: https://www.electronjs.org/docs/api/webview-tag#nodeintegration
// Ref result will return
const [factor, setFactor] = useZoomFactor()
console.log(factor()) // print current zoom factor
setFactor(2) // change current zoom factor
```

Set initial zoom factor immediately

```js
import { useZoomFactor } from '@solidjs-use/electron'

const [factor, setFactor] = useZoomFactor(2)
```

Pass a `Accessor` and the factor will be updated when the source ref changes

```js
import { useZoomFactor } from '@solidjs-use/electron'

const [factor, setFactor] = createSignal(1)

useZoomFactor(factor) // zoom factor will match with the ref

setFactor(2) // zoom factor will change
```
