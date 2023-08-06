import { tryOnCleanup } from "solidjs-use"
import { onValue } from "firebase/database"
import { createSignal } from "solid-js"
import type { Signal } from "solid-js"
import type { DatabaseReference, DataSnapshot } from "firebase/database"

export interface UseRTDBOptions {
  errorHandler?: (err: Error) => void
  autoDispose?: boolean
}

/**
 * Reactive Firebase Realtime Database binding.
 *
 * @see https://solidjs-use.github.io/solidjs-use/firebase/useRTDB
 */
export function useRTDB<T = any>(docRef: DatabaseReference, options: UseRTDBOptions = {}) {
  const { errorHandler = (err: Error) => console.error(err), autoDispose = true } = options
  const data = createSignal(undefined) as Signal<T | undefined>

  function update(snapshot: DataSnapshot) {
    data[1](snapshot.val())
  }

  const off = onValue(docRef, update, errorHandler)

  if (autoDispose) tryOnCleanup(() => off())

  return data
}
