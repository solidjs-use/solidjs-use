import { createMemo } from 'solid-js'
import type { Accessor } from 'solid-js'

/**
 * Change mutable object to Accessors.
 *
 * @see https://solidjs-use.github.io/solidjs-use/shared/toAccessors
 */
export function toAccessors<T extends object = {}>(props: T, defaultProps?: T): Record<keyof T, Accessor<T[keyof T]>> {
  const obj: any = {}
  ;(Object.keys(props) as Array<keyof T>).forEach(key => {
    obj[key] = createMemo(() => props[key] ?? defaultProps?.[key])
  })
  return obj
}
