---
category: '@Firebase'
---

# useAuth

Reactive [Firebase Auth](https://firebase.google.com/docs/auth) binding. It provides a reactive `user` and `isAuthenticated` so you
can easily react to changes in the users' authentication status.

## Usage

```tsx
import { Show } from 'solid-js'
import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { useAuth } from '@solidjs-use/firebase/useAuth'

const Demo = () => {
  const app = initializeApp({
    /* config */
  })
  const auth = getAuth(app)
  const { isAuthenticated, user } = useAuth(auth)

  const signIn = () => signInWithPopup(auth, new GoogleAuthProvider())

  return (
    <Show
      when={isAuthenticated()}
      fallback={
        <div>
          <button onClick={signIn}>Sign In with Google</button>
        </div>
      }
    >
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </Show>
  )
}
```
