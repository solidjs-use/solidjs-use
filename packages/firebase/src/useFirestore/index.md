---
category: '@Firebase'
---

# useFirestore

Reactive [Firestore](https://firebase.google.com/docs/firestore) binding. Making it straightforward to **always keep your local data in sync** with remotes databases.

## Usage

```js {9,12,17,22}
import { createMemo, createSignal } from 'solid-js'
import { initializeApp } from 'firebase/app'
import { collection, doc, getFirestore, limit, orderBy, query } from 'firebase/firestore'
import { useFirestore } from '@solidjs-use/firebase/useFirestore'

const app = initializeApp({ projectId: 'MY PROJECT ID' })
const db = getFirestore(app)

const todos = useFirestore(collection(db, 'todos'))

// or for doc reference
const user = useFirestore(doc(db, 'users', 'my-user-id'))

// you can also use signal value for reactive query
const [postsLimit, setPostsLimit] = createSignal(10)
const postsQuery = createMemo(() => query(collection(db, 'posts'), orderBy('createdAt', 'desc'), limit(postsLimit())))
const posts = useFirestore(postsQuery)

// you can use the boolean value to tell a query when it is ready to run
// when it gets falsy value, return the initial value
const [userId] = createSignal('')
const userQuery = createMemo(() => userId() && doc(db, 'users', userId()))
const userData = useFirestore(userQuery, null)
```

## Share across instances

You can reuse the db reference by passing `autoDispose: false`

```ts
const todos = useFirestore(collection(db, 'todos'), undefined, { autoDispose: false })
```

or use `createGlobalState` from the core package

```js
// store.js
import { createRoot } from 'solid-js'
import { useFirestore } from '@solidjs-use/firebase/useFirestore'

export const useTodos = createRoot(() => useFirestore(collection(db, 'todos')))
```

```js
// app.js
import { useTodos } from './store'

const todos = useTodos()
```
