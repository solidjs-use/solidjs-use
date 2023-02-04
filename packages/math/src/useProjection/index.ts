import { createProjection } from '../createProjection'
import type { MaybeAccessor } from 'solidjs-use'
import type { ProjectorFunction } from '../createGenericProjection'

/**
 * Reactive numeric projection from one domain to another.
 */
export function useProjection(
  input: MaybeAccessor<number>,
  fromDomain: MaybeAccessor<readonly [number, number]>,
  toDomain: MaybeAccessor<readonly [number, number]>,
  projector?: ProjectorFunction<number, number>
) {
  return createProjection(fromDomain, toDomain, projector)(input)
}
