import { unAccessor } from 'solidjs-use'
import { createMemo, type Accessor } from 'solid-js'
import type { MaybeAccessor } from 'solidjs-use'

export type ProjectorFunction<F, T> = (input: F, from: readonly [F, F], to: readonly [T, T]) => T

export type UseProjection<F, T> = (input: MaybeAccessor<F>) => Accessor<T>

/**
 * Generic version of `createProjection`.
 *
 * @see https://solidjs-use.github.io/solidjs-use/math/createGenericProjection
 */
export function createGenericProjection<F = number, T = number>(
  fromDomain: MaybeAccessor<readonly [F, F]>,
  toDomain: MaybeAccessor<readonly [T, T]>,
  projector: ProjectorFunction<F, T>
): UseProjection<F, T> {
  return (input: MaybeAccessor<F>) => {
    return createMemo(() => projector(unAccessor(input), unAccessor(fromDomain), unAccessor(toDomain)))
  }
}
