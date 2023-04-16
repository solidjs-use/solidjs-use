import Schema from 'async-validator'
import { createEffect, createMemo, createSignal, getOwner, on, runWithOwner } from 'solid-js'
import { toAccessor, toValue, until } from 'solidjs-use'
import type { Accessor } from 'solid-js'
import type { MaybeAccessor } from 'solidjs-use'
import type { Rules, ValidateError, ValidateOption } from 'async-validator'

// @ts-expect-error Schema.default is exist in ssr mode
const AsyncValidatorSchema = Schema.default || Schema

export type AsyncValidatorError = Error & {
  errors: ValidateError[]
  fields: Record<string, ValidateError[]>
}

export interface UseAsyncValidatorExecuteReturn {
  pass: boolean
  errors: AsyncValidatorError['errors'] | undefined
  errorInfo: AsyncValidatorError | null
  errorFields: AsyncValidatorError['fields'] | undefined
}

export interface UseAsyncValidatorReturn {
  pass: Accessor<boolean>
  errorInfo: Accessor<AsyncValidatorError | null | undefined>
  isFinished: Accessor<boolean>
  errors: Accessor<AsyncValidatorError['errors'] | undefined>
  errorFields: Accessor<AsyncValidatorError['fields'] | undefined>
  execute: () => Promise<UseAsyncValidatorExecuteReturn>
}

export interface UseAsyncValidatorOptions {
  /**
   * @see https://github.com/yiminghe/async-validator#options
   */
  validateOption?: ValidateOption
  /**
   * The validation will be triggered right away for the first time.
   * Only works when `manual` is not set to true.
   *
   * @default true
   */
  immediate?: boolean
  /**
   * If set to true, the validation will not be triggered automatically.
   */
  manual?: boolean
}

/**
 * Wrapper for async-validator.
 *
 * @see https://solidjs-use.github.io/solidjs-use/integrations/useAsyncValidator
 * @see https://github.com/yiminghe/async-validator
 */
export function useAsyncValidator(
  value: MaybeAccessor<Record<string, any>>,
  rules: MaybeAccessor<Rules>,
  options: UseAsyncValidatorOptions = {}
): UseAsyncValidatorReturn & PromiseLike<UseAsyncValidatorReturn> {
  const { validateOption = {}, immediate = true, manual = false } = options

  const valueAccessor = toAccessor(value)

  const [errorInfo, setErrorInfo] = createSignal<AsyncValidatorError | null>(null)
  const [isFinished, setIsFinish] = createSignal(true)
  const [pass, setPass] = createSignal(!immediate || manual)
  const errors = createMemo(() => errorInfo()?.errors ?? [])
  const errorFields = createMemo(() => errorInfo()?.fields ?? {})
  const validator = createMemo(() => new AsyncValidatorSchema(toValue(rules)))

  const execute = async (): Promise<UseAsyncValidatorExecuteReturn> => {
    setIsFinish(false)
    setPass(false)

    try {
      await validator().validate(valueAccessor(), validateOption)
      setPass(true)
      setErrorInfo(null)
    } catch (err) {
      setErrorInfo(err as AsyncValidatorError)
    } finally {
      setIsFinish(true)
    }

    return {
      pass: pass(),
      errorInfo: errorInfo(),
      errors: errors(),
      errorFields: errorFields()
    }
  }

  if (!manual) {
    createEffect(on([valueAccessor, validator], () => execute(), { defer: !immediate as true }))
  }

  const shell = {
    isFinished,
    pass,
    errorInfo,
    errors,
    errorFields,
    execute
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
