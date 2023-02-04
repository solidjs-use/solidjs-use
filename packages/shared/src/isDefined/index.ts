import { unAccessor } from '../unAccessor'
import type { Accessor } from 'solid-js'

export function isDefined<T>(v: Accessor<T>): v is Accessor<Exclude<T, null | undefined>>
export function isDefined<T>(v: T): v is Exclude<T, null | undefined>
export function isDefined<T>(v: Accessor<T>): boolean {
  return unAccessor(v) != null
}
