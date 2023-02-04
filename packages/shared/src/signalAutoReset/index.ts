import { createSignal } from 'solid-js'
import { tryOnCleanup } from '../tryOnCleanup'
import { unAccessor } from '../unAccessor'
import type { Setter, Signal } from 'solid-js'
import type { MaybeAccessor } from '../utils'

/**
 * Create a Signal which will be reset to the default value after some time.
 *
 * @param defaultValue The value which will be set.
 * @param afterMs      A zero-or-greater delay in milliseconds.
 */
export function signalAutoReset<T>(defaultValue: T, afterMs: MaybeAccessor<number> = 10000): Signal<T> {
  const [value, setVal] = createSignal<T>(defaultValue)
  let timer: any
  const resetAfter = () =>
    setTimeout(() => {
      setVal(() => defaultValue)
    }, unAccessor(afterMs))

  tryOnCleanup(() => {
    clearTimeout(timer)
  })

  const setNewVal: Setter<T> = ((newValue: T) => {
    setVal(newValue as any)
    clearTimeout(timer)
    timer = resetAfter()
  }) as Setter<T>
  return [value, setNewVal]
}

// alias
export { signalAutoReset as autoResetSignal }
