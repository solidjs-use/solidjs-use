import { tryOnCleanup } from 'solidjs-use'
import { onValue } from 'firebase/database'
import { createSignal } from 'solid-js'
import type { Signal } from 'solid-js'
import type { DatabaseReference, DataSnapshot } from 'firebase/database'

export interface UseRTDBOptions {
  autoDispose?: boolean
}

/**
 * Reactive Firebase Realtime Database binding.
 */
export function useRTDB<T = any>(docRef: DatabaseReference, options: UseRTDBOptions = {}) {
  const { autoDispose = true } = options
  const data = createSignal(undefined) as Signal<T | undefined>

  function update(snapshot: DataSnapshot) {
    data[1](snapshot.val())
  }

  const off = onValue(docRef, update)

  if (autoDispose) tryOnCleanup(() => off())

  return data
}
