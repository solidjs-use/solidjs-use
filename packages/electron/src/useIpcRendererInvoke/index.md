---
category: '@Electron'
---

# useIpcRendererInvoke

Reactive [ipcRenderer.invoke API](https://www.electronjs.org/docs/api/ipc-renderer#ipcrendererinvokechannel-args) result. Make asynchronous operations look synchronous.

## Usage

```ts
import { useIpcRendererInvoke } from '@solidjs-use/electron'

// enable nodeIntegration if you don't provide ipcRenderer explicitly
// @see: https://www.electronjs.org/docs/api/webview-tag#nodeintegration
// Signal result will return
const result = useIpcRendererInvoke<string>('custom-channel', 'some data')
const msg = createMemo(() => result()?.msg)
```
