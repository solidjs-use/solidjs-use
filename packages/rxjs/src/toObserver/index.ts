import type { NextObserver } from 'rxjs'
import type { Setter } from 'solid-js'

/**
 * Sugar function to convert a `Accessor` into an RxJS Observer.
 *
 * @see https://solidjs-use.github.io/solidjs-use/rxjs/toObserver
 * @see https://rxjs.dev/guide/observer
 */
export function toObserver<T>(setValue: Setter<T>): NextObserver<T> {
  return {
    next: (val: T) => {
      setValue(() => val)
    }
  }
}
