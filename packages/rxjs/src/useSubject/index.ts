import { tryOnCleanup } from 'solidjs-use'
import { BehaviorSubject } from 'rxjs'
import { createEffect, createSignal, on } from 'solid-js'
import type { Signal } from 'solid-js'
import type { Subject } from 'rxjs'
import type { UseObservableOptions } from '../useObservable'

export type UseSubjectOptions<I = undefined> = Omit<UseObservableOptions<I>, 'initialValue'>

/**
 * Bind an RxJS Subject to a `Signal` and propagate value changes both ways.
 *
 * @see https://rxjs.dev/guide/subject
 * @see https://solidjs-use.github.io/solidjs-use/rxjs/from
 */
export function useSubject<H>(subject: BehaviorSubject<H>, options?: UseSubjectOptions): Signal<H>
export function useSubject<H>(subject: Subject<H>, options?: UseSubjectOptions): Signal<H | undefined>
export function useSubject<H>(subject: Subject<H>, options?: UseSubjectOptions) {
  const value = createSignal(
    subject instanceof BehaviorSubject ? subject.value : undefined
  ) as typeof subject extends BehaviorSubject<H> ? Signal<H> : Signal<H | undefined>

  const [_val, _setVal] = value
  const subscription = subject.subscribe({
    next(val) {
      _setVal(() => val)
    },
    error: options?.onError
  })

  createEffect(
    on(
      _val,
      nextValue => {
        subject.next(nextValue)
      },
      { defer: true }
    )
  )

  tryOnCleanup(() => {
    subscription.unsubscribe()
  })

  return value
}
