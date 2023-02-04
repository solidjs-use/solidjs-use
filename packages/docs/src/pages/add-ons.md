# Add-ons

The core package aims to be lightweight and dependence free. While the add-ons are wrapping popular packages into the consistent API style.

## Integrations - [`@solidjs-use/integrations`](https://solidjs-use.github.io/solidjs-use/integrations/README.html)

Integration wrappers for utility libraries

- [`useAsyncValidator`](https://solidjs-use.github.io/solidjs-use/integrations/useAsyncValidator/) — wrapper for [`async-validator`](https://github.com/yiminghe/async-validator)
- [`useAxios`](https://solidjs-use.github.io/solidjs-use/integrations/useAxios/) — wrapper for [`axios`](https://github.com/axios/axios)
- [`useChangeCase`](https://solidjs-use.github.io/solidjs-use/integrations/useChangeCase/) — reactive wrapper for [`change-case`](https://github.com/blakeembrey/change-case)
- [`useCookies`](https://solidjs-use.github.io/solidjs-use/integrations/useCookies/) — wrapper for [`universal-cookie`](https://www.npmjs.com/package/universal-cookie)
- [`useDrauu`](https://solidjs-use.github.io/solidjs-use/integrations/useDrauu/) — reactive instance for [drauu](https://github.com/antfu/drauu)
- [`useFocusTrap`](https://solidjs-use.github.io/solidjs-use/integrations/useFocusTrap/) — reactive wrapper for [`focus-trap`](https://github.com/focus-trap/focus-trap)
- [`useFuse`](https://solidjs-use.github.io/solidjs-use/integrations/useFuse/) — easily implement fuzzy search using a composable with [Fuse.js](https://github.com/krisk/fuse)
- [`useIDBKeyval`](https://solidjs-use.github.io/solidjs-use/integrations/useIDBKeyval/) — wrapper for [`idb-keyval`](https://www.npmjs.com/package/idb-keyval)
- [`useJwt`](https://solidjs-use.github.io/solidjs-use/integrations/useJwt/) — wrapper for [`jwt-decode`](https://github.com/auth0/jwt-decode)
- [`useNProgress`](https://solidjs-use.github.io/solidjs-use/integrations/useNProgress/) — reactive wrapper for [`nprogress`](https://github.com/rstacruz/nprogress)
- [`useQRCode`](https://solidjs-use.github.io/solidjs-use/integrations/useQRCode/) — wrapper for [`qrcode`](https://github.com/soldair/node-qrcode)

## Firebase - [`@solidjs-use/firebase`](https://solidjs-use.github.io/solidjs-use/firebase/README.html)

Enables realtime bindings for Firebase

- [`useAuth`](https://solidjs-use.github.io/solidjs-use/firebase/useAuth/) — reactive [Firebase Auth](https://firebase.google.com/docs/auth) binding
- [`useFirestore`](https://solidjs-use.github.io/solidjs-use/firebase/useFirestore/) — reactive [Firestore](https://firebase.google.com/docs/firestore) binding
- [`useRTDB`](https://solidjs-use.github.io/solidjs-use/firebase/useRTDB/) — reactive [Firebase Realtime Database](https://firebase.google.com/docs/database) binding

## Electron - [`@solidjs-use/electron`](https://solidjs-use.github.io/solidjs-use/electron/README.html)

Electron renderer process modules for VueUse

- [`useIpcRenderer`](https://solidjs-use.github.io/solidjs-use/electron/useIpcRenderer/) — provides [ipcRenderer](https://www.electronjs.org/docs/api/ipc-renderer) and all of its APIs
- [`useIpcRendererInvoke`](https://solidjs-use.github.io/solidjs-use/electron/useIpcRendererInvoke/) — reactive [ipcRenderer.invoke API](https://www.electronjs.org/docs/api/ipc-renderer#ipcrendererinvokechannel-args) result
- [`useIpcRendererOn`](https://solidjs-use.github.io/solidjs-use/electron/useIpcRendererOn/) — use [ipcRenderer.on](https://www.electronjs.org/docs/api/ipc-renderer#ipcrendereronchannel-listener) with ease and [ipcRenderer.removeListener](https://www.electronjs.org/docs/api/ipc-renderer#ipcrendererremovelistenerchannel-listener) automatically on unmounted
- [`useZoomFactor`](https://solidjs-use.github.io/solidjs-use/electron/useZoomFactor/) — reactive [WebFrame](https://www.electronjs.org/docs/api/web-frame#webframe) zoom factor
- [`useZoomLevel`](https://solidjs-use.github.io/solidjs-use/electron/useZoomLevel/) — reactive [WebFrame](https://www.electronjs.org/docs/api/web-frame#webframe) zoom level
