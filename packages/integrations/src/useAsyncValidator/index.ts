import Schema from 'async-validator'
import { createEffect, createMemo, createSignal, getOwner, runWithOwner } from 'solid-js'
import { unAccessor, until } from 'solidjs-use'
import type { Accessor } from 'solid-js'
import type { MaybeAccessor } from 'solidjs-use'
import type { Rules, ValidateError, ValidateOption } from 'async-validator'

export type AsyncValidatorError = Error & {
  errors: ValidateError[]
  fields: Record<string, ValidateError[]>
}

export interface UseAsyncValidatorReturn {
  pass: Accessor<boolean>
  errorInfo: Accessor<AsyncValidatorError | null | undefined>
  isFinished: Accessor<boolean>
  errors: Accessor<AsyncValidatorError['errors'] | undefined>
  errorFields: Accessor<AsyncValidatorError['fields'] | undefined>
}

export interface UseAsyncValidatorOptions {
  /**
   * @see https://github.com/yiminghe/async-validator#options
   */
  validateOption?: ValidateOption
}

/**
 * Wrapper for async-validator.
 *
 * @see https://github.com/yiminghe/async-validator
 */
export function useAsyncValidator(
  value: MaybeAccessor<Record<string, any>>,
  rules: MaybeAccessor<Rules>,
  options: UseAsyncValidatorOptions = {}
): UseAsyncValidatorReturn & PromiseLike<UseAsyncValidatorReturn> {
  const [errorInfo, setErrorInfo] = createSignal<AsyncValidatorError | null>()
  const [isFinished, setIsFinish] = createSignal(false)
  const [pass, setPass] = createSignal(false)
  const errors = createMemo(() => errorInfo()?.errors ?? [])
  const errorFields = createMemo(() => errorInfo()?.fields ?? {})

  const { validateOption = {} } = options

  createEffect(async () => {
    setIsFinish(false)
    setPass(false)
    const validator = new Schema(unAccessor(rules))
    try {
      await validator.validate(unAccessor(value), validateOption)
      setPass(true)
      setErrorInfo(null)
    } catch (err) {
      setErrorInfo(err as AsyncValidatorError)
    } finally {
      setIsFinish(true)
    }
  })

  const shell = {
    pass,
    isFinished,
    errorInfo,
    errors,
    errorFields
  }

  const owner = getOwner()!
  function waitUntilFinished() {
    return new Promise<UseAsyncValidatorReturn>((resolve, reject) => {
      runWithOwner(owner, () => {
        until(isFinished)
          .toBe(true)
          .then(() => resolve(shell))
          .catch(error => reject(error))
      })
    })
  }

  return {
    ...shell,
    then(onFulfilled, onRejected) {
      return waitUntilFinished().then(onFulfilled, onRejected)
    }
  }
}
