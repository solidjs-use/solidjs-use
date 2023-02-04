import { unAccessor } from 'solidjs-use'
import type { MaybeAccessor } from 'solidjs-use'

export type MaybeAccessorArgs<T> = Array<MaybeAccessor<T>> | [MaybeAccessor<Array<MaybeAccessor<T>>>]

export function unAccessorArgsFlat<T>(args: MaybeAccessorArgs<T>): T[] {
  return args.flatMap((i: any) => {
    const v = unAccessor(i)
    if (Array.isArray(v)) return v.map(i => unAccessor(i))
    return [v]
  })
}
