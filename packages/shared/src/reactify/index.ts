import { createMemo } from 'solid-js'
import { unAccessor } from '../unAccessor'
import type { Accessor } from 'solid-js'
import type { MaybeAccessor } from '../utils'

export type Reactified<T> = T extends (...args: infer A) => infer R
  ? (...args: { [K in keyof A]: MaybeAccessor<A[K]> }) => Accessor<R>
  : never

/**
 * Converts plain function into a reactive function.
 * The converted function accepts Signals as it's arguments
 * and returns a ComputedRef, with proper typing.
 *
 * @see https://solidjs-use.github.io/solidjs-use/shared/reactify
 * @param fn - Source function
 */
export function reactify<T extends Function>(fn: T): Reactified<T> {
  return function (this: any, ...args: any[]) {
    return createMemo(() =>
      fn.apply(
        this,
        args.map(i => unAccessor(i))
      )
    )
  } as any
}

// alias
export { reactify as createReactiveFn }
