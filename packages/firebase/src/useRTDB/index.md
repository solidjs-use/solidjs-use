---
category: '@Firebase'
---

# useRTDB

Reactive [Firebase Realtime Database](https://firebase.google.com/docs/database) binding. Making it straightforward to **always keep your local data in sync** with remotes databases.

## Usage

```js
import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { useRTDB } from '@solidjs-use/firebase/useRTDB'

const app = initializeApp({
  /* config */
})
const db = getDatabase(app)

// in setup()
const todos = useRTDB(db.ref('todos'))
```

You can reuse the db reference by passing `autoDispose: false`

```ts
const todos = useRTDB(db.ref('todos'), { autoDispose: false })
```

or use `createGlobalState` from the core package

```js
// store.js
import { useRTDB } from '@solidjs-use/firebase/useRTDB'

export const useTodos = createRoot(() => useRTDB(db.ref('todos')))
```

```js
// app.js
import { useTodos } from './store'

const todos = useTodos()
```
