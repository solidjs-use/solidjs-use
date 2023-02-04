import { tryOnCleanup } from 'solidjs-use'
import { createSignal } from 'solid-js'
import type { Signal } from 'solid-js'
import type { Observable } from 'rxjs'

export interface UseObservableOptions<I> {
  onError?: (err: any) => void
  /**
   * The value that should be set if the observable has not emitted.
   */
  initialValue?: I | undefined
}

export function useObservable<H, I = undefined>(
  observable: Observable<H>,
  options?: UseObservableOptions<I | undefined>
): Signal<H | I> {
  const value = createSignal<H | I | undefined>(options?.initialValue)
  const subscription = observable.subscribe({
    next: val => {
      return value[1](() => val)
    },
    error: options?.onError
  })
  tryOnCleanup(() => {
    subscription.unsubscribe()
  })
  return value as Signal<H | I>
}
