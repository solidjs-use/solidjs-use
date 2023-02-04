import type { NextObserver } from 'rxjs'
import type { Setter } from 'solid-js'

export function toObserver<T>(setValue: Setter<T>): NextObserver<T> {
  return {
    next: (val: T) => {
      setValue(() => val)
    }
  }
}
