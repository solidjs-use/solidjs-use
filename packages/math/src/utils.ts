import { toValue } from 'solidjs-use'
import type { MaybeAccessor } from 'solidjs-use'

export type MaybeAccessorArgs<T> = Array<MaybeAccessor<T>> | [MaybeAccessor<Array<MaybeAccessor<T>>>]

export function toValueArgsFlat<T>(args: MaybeAccessorArgs<T>): T[] {
  return args.flatMap((i: any) => {
    const v = toValue(i)
    if (Array.isArray(v)) return v.map(i => toValue(i))
    return [v]
  })
}
