import { watch } from 'solidjs-use'
import { isAccessor } from 'solidjs-use/solid-to-vue'
import { from as fromRxjs, fromEvent as fromEventRx, Observable } from 'rxjs'
import { filter, mergeMap } from 'rxjs/operators'
import type { MaybeAccessor } from 'solidjs-use'
import type { ObservableInput } from 'rxjs'
import type { Accessor, OnOptions } from 'solid-js/types/reactive/signal'

export function from<T>(value: ObservableInput<T> | Accessor<T>, onOptions?: OnOptions): Observable<T> {
  if (isAccessor<T>(value)) {
    return new Observable(subscriber => {
      const watchStopHandle = watch(value, val => subscriber.next(val), onOptions)

      return () => {
        watchStopHandle()
      }
    })
  }
  return fromRxjs(value)
}

export function fromEvent<T extends HTMLElement>(value: MaybeAccessor<T>, event: string): Observable<Event> {
  if (isAccessor<T>(value)) {
    return from(value).pipe(
      filter(value => value instanceof HTMLElement),
      mergeMap(value => fromEventRx(value, event))
    )
  }
  return fromEventRx(value, event)
}
