import { createMemo, createSignal } from 'solid-js'
import type { Accessor, Setter } from 'solid-js'
import type { Auth, User } from 'firebase/auth'

export interface UseFirebaseAuthReturn {
  isAuthenticated: Accessor<boolean>
  user: Accessor<User | null>
  setUser: Setter<User | null>
}

/**
 * Reactive Firebase Auth binding.
 *
 * @see https://solidjs-use.github.io/solidjs-use/firebase/useAuth
 */
export function useAuth(auth: Auth): UseFirebaseAuthReturn {
  const [user, setUser] = createSignal<User | null>(auth.currentUser)
  const isAuthenticated = createMemo(() => !!user())

  auth.onIdTokenChanged(authUser => setUser(authUser))

  return {
    isAuthenticated,
    user,
    setUser
  }
}
