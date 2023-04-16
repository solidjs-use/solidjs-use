import { isAccessor, toSignal, writableComputed } from 'solidjs-use/solid-to-vue'
import { createMemo } from 'solid-js'
import { toValue } from 'solidjs-use'
import * as changeCase from './changeCase'
import type { MaybeAccessor } from 'solidjs-use'
import type { Accessor } from 'solid-js'
import type { WritableComputedReturn } from 'solidjs-use/solid-to-vue'
import type { Options } from 'change-case'

export type ChangeCaseType = keyof typeof changeCase

export function useChangeCase(
  input: string,
  type: ChangeCaseType,
  options?: Options | undefined
): WritableComputedReturn<string>
export function useChangeCase(
  input: MaybeAccessor<string>,
  type: ChangeCaseType,
  options?: Options | undefined
): Accessor<string>
/**
 * Reactive wrapper for `change-case`.
 *
 * @see https://solidjs-use.github.io/solidjs-use/integrations/useChangeCase
 */
export function useChangeCase(input: any, type: ChangeCaseType, options?: Options | undefined) {
  if (isAccessor<string>(input)) return createMemo(() => changeCase[type](toValue(input), options))

  const [text, setText] = toSignal(input)
  return writableComputed<string>({
    get() {
      return changeCase[type](text(), options)
    },
    set(value) {
      setText(value)
    }
  })
}
