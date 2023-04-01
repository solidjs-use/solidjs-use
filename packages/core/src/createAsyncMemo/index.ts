import { isFunction, noop, type Fn } from '@solidjs-use/shared'
import { createSignal } from 'solid-js'
import { watchEffect } from '@solidjs-use/solid-to-vue/watch'
import type { Accessor, Setter } from 'solid-js'

/**
 * Handle overlapping async evaluations.
 *
 * @param cancelCallback The provided callback is invoked when a re-evaluation of the computed value is triggered before the previous one finished
 */
export type AsyncComputedOnCancel = (cancelCallback: Fn) => void

export interface AsyncComputedOptions {
  /**
   * Ref passed to receive the updated of async evaluation
   */
  setEvaluating?: Setter<boolean>

  /**
   * Callback when error is caught.
   */
  onError?: (e: unknown) => void
}

/**
 * Create an asynchronous computed dependency.
 *
 * @see https://solidjs-use.github.io/solidjs-use/core/createAsyncMemo
 * @param evaluationCallback     The promise-returning callback which generates the computed value
 * @param initialState           The initial state, used until the first evaluation finishes
 * @param optionsOrSignal           Additional options or a Signal passed to receive the updates of the async evaluation
 */
export function createAsyncMemo<T>(
  evaluationCallback: (onCancel: AsyncComputedOnCancel) => T | Promise<T>,
  initialState?: T,
  optionsOrSetter?: Setter<boolean> | AsyncComputedOptions
): Accessor<T> {
  let options: AsyncComputedOptions

  if (isFunction(optionsOrSetter)) {
    options = {
      setEvaluating: optionsOrSetter
    }
  } else {
    options = optionsOrSetter ?? {}
  }

  const { setEvaluating = undefined, onError = noop } = options

  const [current, setCurrent] = createSignal<T>(initialState as T)
  let counter = 0
  watchEffect(async onInvalidate => {
    counter++
    const counterAtBeginning = counter
    let hasFinished = false

    if (setEvaluating) {
      setEvaluating(true)
    }

    try {
      const result = await evaluationCallback(cancelCallback => {
        onInvalidate(() => {
          if (setEvaluating) {
            setEvaluating(false)
          }

          if (!hasFinished) cancelCallback()
        })
      })

      if (counterAtBeginning === counter) setCurrent(() => result)
    } catch (e) {
      onError(e)
    } finally {
      if (setEvaluating && counterAtBeginning === counter) setEvaluating(false)

      hasFinished = true
    }
  })

  return current
}

// alias
export { createAsyncMemo as asyncMemo }
