# @solidjs-use/electron

[![NPM version](https://img.shields.io/npm/v/@solidjs-use/electron?color=a1b858)](https://www.npmjs.com/package/@solidjs-use/electron)

> This is an add-on of [solidjs-use](https://github.com/solidjs-use/solidjs-use), enables electron renderer process API as Composition API.

## Install

```bash
npm i solidjs-use @solidjs-use/electron electron
```

## Functions

`@solidjs-use/electron` provides the following functions

- [`useIpcRenderer`](https://solidjs-use.github.io/solidjs-use/electron/useIpcRenderer/) — provides [ipcRenderer](https://www.electronjs.org/docs/api/ipc-renderer) and all of its APIs
- [`useIpcRendererInvoke`](https://solidjs-use.github.io/solidjs-use/electron/useIpcRendererInvoke/) — reactive [ipcRenderer.invoke API](https://www.electronjs.org/docs/api/ipc-renderer#ipcrendererinvokechannel-args) result
- [`useIpcRendererOn`](https://solidjs-use.github.io/solidjs-use/electron/useIpcRendererOn/) — use [ipcRenderer.on](https://www.electronjs.org/docs/api/ipc-renderer#ipcrendereronchannel-listener) with ease and [ipcRenderer.removeListener](https://www.electronjs.org/docs/api/ipc-renderer#ipcrendererremovelistenerchannel-listener) automatically on unmounted
- [`useZoomFactor`](https://solidjs-use.github.io/solidjs-use/electron/useZoomFactor/) — reactive [WebFrame](https://www.electronjs.org/docs/api/web-frame#webframe) zoom factor
- [`useZoomLevel`](https://solidjs-use.github.io/solidjs-use/electron/useZoomLevel/) — reactive [WebFrame](https://www.electronjs.org/docs/api/web-frame#webframe) zoom level

## Links

- [solidjs-use](https://solidjs-use.github.io/solidjs-use)
