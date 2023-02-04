---
category: Utilities
related: reactify
---

# createUnAccessorFn

Make a plain function accepting Accessor and raw values as arguments.
Returns the same value the unconverted function returns, with proper typing.

## Usage

```ts
import { createSignal } from 'solid-js'
import { createUnAccessorFn } from 'solidjs-use'

const [url, setUrl] = createSignal('https://httpbin.org/post')
const [data, setData] = createSignal({ foo: 'bar' })

const post = (url, data) => fetch(url, { data })
const unAccessorPost = createUnAccessorFn(post)

post(url, data) /* ❌ Will throw an error because the arguments are Accessor */
unAccessorPost(url, data) /* ✔️ Will Work because the arguments will be auto unAccessor */
```
