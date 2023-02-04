# @solidjs-use/integrations

[![NPM version](https://img.shields.io/npm/v/@solidjs-use/integrations?color=a1b858)](https://www.npmjs.com/package/@solidjs-use/integrations)

> This is an add-on of [solidjs-use](https://github.com/solidjs-use/solidjs-use), providing integration wrappers for utility libraries.

## Install

```bash
npm i solidjs-use @solidjs-use/integrations
```

## Functions

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

## Tree-shaking

For better tree-shaking result, import functions from submodules, for example:

```ts
import { useAxios } from '@solidjs-use/integrations/useAxios'

// Don't
import { useAxios } from '@solidjs-use/integrations'
```

## Links

- [solidjs-use](https://solidjs-use.github.io/solidjs-use)
