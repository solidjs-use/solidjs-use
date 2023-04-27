import { noop, promiseTimeout, until } from '@solidjs-use/shared'
import { createSignal, getOwner } from 'solid-js'
import type { Accessor } from 'solid-js'

export interface UseAsyncStateReturnBase<Data, Params extends any[]> {
  state: Accessor<Data>
  isReady: Accessor<boolean>
  isLoading: Accessor<boolean>
  error: Accessor<unknown>
  execute: (delay?: number, ...args: Params) => Promise<Data>
}

export type UseAsyncStateReturn<Data, Params extends any[]> = UseAsyncStateReturnBase<Data, Params> &
  PromiseLike<UseAsyncStateReturnBase<Data, Params>>

export interface UseAsyncStateOptions<T = any> {
  /**
   * Delay for executing the promise. In milliseconds.
   *
   * @default 0
   */
  delay?: number

  /**
   * Execute the promise right after the function is invoked.
   * Will apply the delay if any.
   *
   * When set to false, you will need to execute it manually.
   *
   * @default true
   */
  immediate?: boolean

  /**
   * Callback when error is caught.
   */
  onError?: (e: unknown) => void

  /**
   * Callback when success is caught.
   */
  onSuccess?: (data: T) => void

  /**
   * Sets the state to initialState before executing the promise.
   *
   * This can be useful when calling the execute function more than once (for
   * example, to refresh data). When set to false, the current state remains
   * unchanged until the promise resolves.
   *
   * @default true
   */
  resetOnExecute?: boolean

  /**
   *
   * An error is thrown when executing the execute function
   *
   * @default false
   */
  throwError?: boolean
}

/**
 * Reactive async state. Will not block your setup function and will trigger changes once
 * the promise is ready.
 *
 * @see https://solidjs-use.github.io/solidjs-use/core/useAsyncState
 */
export function useAsyncState<Data, Params extends any[] = []>(
  promise: Promise<Data> | ((...args: Params) => Promise<Data>),
  initialState: Data,
  options?: UseAsyncStateOptions<Data>
): UseAsyncStateReturn<Data, Params> {
  const {
    immediate = true,
    delay = 0,
    onError = noop,
    onSuccess = noop,
    resetOnExecute = true,
    throwError
  } = options ?? {}

  const [state, setState] = createSignal(initialState)
  const [isReady, setReady] = createSignal(false)
  const [isLoading, setLoading] = createSignal(false)
  const [error, setError] = createSignal<unknown | undefined>(undefined)

  async function execute(delay = 0, ...args: any[]) {
    if (resetOnExecute) setState(() => initialState)
    setError(undefined)
    setReady(false)
    setLoading(true)

    if (delay > 0) await promiseTimeout(delay)

    const _promise = typeof promise === 'function' ? promise(...(args as Params)) : promise

    try {
      const data = await _promise
      setState(() => data)
      setReady(true)
      onSuccess(data)
    } catch (e) {
      setError(e)
      onError(e)
      if (throwError) throw e
    } finally {
      setLoading(false)
    }

    return state()
  }

  if (immediate) execute(delay)

  const shell: UseAsyncStateReturnBase<Data, Params> = {
    state,
    isReady,
    isLoading,
    error,
    execute
  }

  const owner = getOwner()
  function waitUntilIsLoaded() {
    return new Promise<UseAsyncStateReturnBase<Data, Params>>((resolve, reject) => {
      until(isLoading, owner)
        .toBe(false)
        .then(() => resolve(shell))
        .catch(reject)
    })
  }

  return {
    ...shell,
    then(onFulfilled, onRejected) {
      return waitUntilIsLoaded().then(onFulfilled, onRejected)
    }
  }
}
