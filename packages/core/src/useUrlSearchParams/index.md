---
category: Browser
---

# useUrlSearchParams

Reactive [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)

## Usage

```js
import { useUrlSearchParams } from 'solidjs-use'

const params = useUrlSearchParams('history')

console.log(params.foo) // 'bar'

params.foo = 'bar'
params['solidjs-use'] = 'awesome'
// url updated to `?foo=bar&solidjs-use=awesome`
```

### Hash Mode

When using with hash mode route, specify the `mode` to `hash`

```js
import { useUrlSearchParams } from 'solidjs-use'

const params = useUrlSearchParams('hash')

params.foo = 'bar'
params['solidjs-use'] = 'awesome'
// url updated to `#/your/route?foo=bar&solidjs-use=awesome`
```

### Hash Params

When using with history mode route, but want to use hash as params, specify the `mode` to `hash-params`

```js
import { useUrlSearchParams } from 'solidjs-use'

const params = useUrlSearchParams('hash-params')

params.foo = 'bar'
params['solidjs-use'] = 'awesome'
// url updated to `/your/route#foo=bar&solidjs-use=awesome`
```
