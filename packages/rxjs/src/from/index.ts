import { watch } from 'solidjs-use'
import { isAccessor } from 'solidjs-use/solid-to-vue'
import { Observable, fromEvent as fromEventRx, from as fromRxjs } from 'rxjs'
import type { ObservableInput, Subscription } from 'rxjs'
import type { MaybeAccessor } from 'solidjs-use'
import type { Accessor, OnOptions } from 'solid-js/types/reactive/signal'

/**
 * Wrappers around RxJS's from().
 *
 * @see https://solidjs-use.github.io/solidjs-use/rxjs/from
 */
export function from<T>(value: ObservableInput<T> | Accessor<T>, onOptions?: OnOptions): Observable<T> {
  if (isAccessor<T>(value)) {
    return new Observable(subscriber => watch(value, val => subscriber.next(val), onOptions))
  }
  return fromRxjs(value)
}

/**
 * Wrappers around RxJS's fromEvent().
 *
 * @see https://solidjs-use.github.io/solidjs-use/rxjs/from
 */
export function fromEvent<T extends HTMLElement>(value: MaybeAccessor<T>, event: string): Observable<Event> {
  if (isAccessor<T>(value)) {
    return new Observable(subscriber => {
      let innerSub: Subscription | undefined
      return watch(
        value,
        element => {
          innerSub?.unsubscribe()
          if (element instanceof HTMLElement) {
            innerSub = fromEventRx(element, event).subscribe(subscriber)
            subscriber.add(innerSub)
          }
        },
        { defer: false }
      )
    })
  }
  return fromEventRx(value, event)
}
