---
category: '@Integrations'
---

# useIDBKeyval

Wrapper for [`idb-keyval`](https://www.npmjs.com/package/idb-keyval).

## Install

```bash
npm install solidjs-use @solidjs-use/integrations idb-keyval
```

## Usage

```ts
import { useIDBKeyval } from '@solidjs-use/integrations/useIDBKeyval'

// bind object
const { data: storedObject, setData: setStoredObject } = useIDBKeyval('my-idb-keyval-store', {
  hello: 'hi',
  greeting: 'Hello'
})

// update object
setStoredObject(state => ({
  ...state,
  hello: 'hola'
}))

// bind boolean
const { data: flag, setData: setFlag } = useIDBKeyval('my-flag', true) // returns Signal<boolean>

// bind number
const { data: count, setData: setCount } = useIDBKeyval('my-count', 0) // returns Signal<number>

// delete data from idb storage
setStoredObject(null)
```
