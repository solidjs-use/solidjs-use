import { isDef, tryOnCleanup } from 'solidjs-use'
import { isAccessor } from 'solidjs-use/solid-to-vue'
import { onSnapshot } from 'firebase/firestore'
import { createEffect, createMemo, createSignal, on } from 'solid-js'
import type { Signal } from 'solid-js'
import type { MaybeAccessor } from 'solidjs-use'
import type {
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  Query,
  QueryDocumentSnapshot
} from 'firebase/firestore'

export interface UseFirestoreOptions {
  errorHandler?: (err: Error) => void
  autoDispose?: boolean
}

export type FirebaseDocRef<T> = Query<T> | DocumentReference<T>

function getData<T>(docRef: DocumentSnapshot<T> | QueryDocumentSnapshot<T>): T | undefined {
  const data = docRef.data()

  if (data) {
    Object.defineProperty(data, 'id', {
      value: docRef.id.toString(),
      writable: false
    })
  }

  return data
}

function isDocumentReference<T>(docRef: any): docRef is DocumentReference<T> {
  return (docRef.path?.match(/\//g) || []).length % 2 !== 0
}

type Falsy = false | 0 | '' | null | undefined

export function useFirestore<T extends DocumentData>(
  maybeDocAccessor: MaybeAccessor<DocumentReference<T> | Falsy>,
  initialValue: T,
  options?: UseFirestoreOptions
): Signal<T | null>
export function useFirestore<T extends DocumentData>(
  maybeDocAccessor: MaybeAccessor<Query<T> | Falsy>,
  initialValue: T[],
  options?: UseFirestoreOptions
): Signal<T[]>

// nullable initial values
export function useFirestore<T extends DocumentData>(
  maybeDocAccessor: MaybeAccessor<DocumentReference<T> | Falsy>,
  initialValue?: T | undefined | null,
  options?: UseFirestoreOptions
): Signal<T | undefined | null>
export function useFirestore<T extends DocumentData>(
  maybeDocAccessor: MaybeAccessor<Query<T> | Falsy>,
  initialValue?: T[],
  options?: UseFirestoreOptions
): Signal<T[] | undefined>

/**
 * Reactive Firestore binding. Making it straightforward to always keep your
 * local data in sync with remotes databases.
 *
 * @see https://solidjs-use.github.io/solidjs-use/firebase/useFirestore
 */
export function useFirestore<T extends DocumentData>(
  maybeDocAccessor: MaybeAccessor<FirebaseDocRef<T> | Falsy>,
  initialValue: any = undefined,
  options: UseFirestoreOptions = {}
) {
  const { errorHandler = (err: Error) => console.error(err), autoDispose = true } = options

  const accessorOfDocRef = isAccessor(maybeDocAccessor) ? maybeDocAccessor : createMemo(() => maybeDocAccessor)

  let close = () => {}
  const data = createSignal(initialValue) as Signal<T | T[] | null | undefined>
  const [_data, _setData] = data
  createEffect(
    on(accessorOfDocRef, docRef => {
      close()
      if (!accessorOfDocRef()) {
        _setData(initialValue)
      } else if (isDocumentReference<T>(accessorOfDocRef())) {
        close = onSnapshot(
          docRef as DocumentReference<T>,
          snapshot => {
            _setData(() => getData(snapshot) ?? null)
          },
          errorHandler
        )
      } else {
        close = onSnapshot(
          docRef as Query<T>,
          snapshot => {
            _setData(snapshot.docs.map(getData).filter(isDef))
          },
          errorHandler
        )
      }
    })
  )

  if (autoDispose) {
    tryOnCleanup(() => {
      close()
    })
  }

  return data
}
