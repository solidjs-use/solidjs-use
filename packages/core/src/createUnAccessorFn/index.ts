import { unAccessor } from '@solidjs-use/shared'
import type { MaybeAccessor } from '@solidjs-use/shared'

export type unAccessorFn<T> = T extends (...args: infer A) => infer R
  ? (...args: { [K in keyof A]: MaybeAccessor<A[K]> }) => R
  : never

/**
 * Make a plain function accepting Accessor and raw values as arguments.
 * Returns the same value the unconverted function returns, with proper typing.
 */
export const createUnAccessorFn = <T extends Function>(fn: T): unAccessorFn<T> => {
  return function (this: any, ...args: any[]) {
    return fn.apply(
      this,
      args.map(i => unAccessor(i))
    )
  } as unAccessorFn<T>
}
