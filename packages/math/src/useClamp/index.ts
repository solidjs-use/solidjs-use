import { clamp, toValue } from 'solidjs-use'
import { getSetterValue, isAccessor, toSignal } from 'solidjs-use/solid-to-vue'
import { createMemo } from 'solid-js'
import type { Setter, Signal, Accessor } from 'solid-js'
import type { MaybeAccessor, MaybeSignal } from 'solidjs-use'

export function useClamp(
  value: Accessor<number>,
  min: MaybeAccessor<number>,
  max: MaybeAccessor<number>
): Accessor<number>

export function useClamp(
  value: number | Signal<number>,
  min: MaybeAccessor<number>,
  max: MaybeAccessor<number>
): Signal<number>

/**
 * Reactively clamp a value between two other values.
 *
 * @see https://solidjs-use.github.io/solidjs-use/math/useClamp
 */
export function useClamp(value: MaybeSignal<number>, min: MaybeAccessor<number>, max: MaybeAccessor<number>) {
  if (isAccessor(value)) {
    return createMemo(() => clamp(toValue(value), toValue(min), toValue(max)))
  }

  const [_value, _setValue] = toSignal<number>(value)

  const getValue = createMemo(() => {
    return clamp(_value(), toValue(min), toValue(max))
  })

  const setValue = (value => {
    const res = clamp(getSetterValue(value, _value()), toValue(min), toValue(max))
    _setValue(res)
    return res
  }) as Setter<number>

  return [getValue, setValue]
}
