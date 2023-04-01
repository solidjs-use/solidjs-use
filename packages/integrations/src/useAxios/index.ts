import axios, { AxiosError } from 'axios'
import { createSignal, getOwner, runWithOwner } from 'solid-js'
import { isString, until } from 'solidjs-use'
import type { Accessor } from 'solid-js'
import type { AxiosInstance, AxiosResponse, CancelTokenSource, AxiosRequestConfig } from 'axios'

export interface UseAxiosReturn<T, R = AxiosResponse<T>, _D = any> {
  /**
   * Axios Response
   */
  response: Accessor<R | undefined>

  /**
   * Axios response data
   */
  data: Accessor<T | undefined>

  /**
   * Indicates if the request has finished
   */
  isFinished: Accessor<boolean>

  /**
   * Indicates if the request is currently loading
   */
  isLoading: Accessor<boolean>

  /**
   * Indicates if the request was canceled
   */
  isAborted: Accessor<boolean>

  /**
   * Any errors that may have occurred
   */
  error: Accessor<unknown | undefined>

  /**
   * Aborts the current request
   */
  abort: (message?: string | undefined) => void

  /**
   * isFinished alias
   * @deprecated use `isFinished` instead
   */
  finished: Accessor<boolean>

  /**
   * isLoading alias
   * @deprecated use `isLoading` instead
   */
  loading: Accessor<boolean>

  /**
   * isAborted alias
   * @deprecated use `isAborted` instead
   */
  aborted: Accessor<boolean>

  /**
   * abort alias
   */
  cancel: (message?: string | undefined) => void

  /**
   * isAborted alias
   * @deprecated use `isCanceled` instead
   */
  canceled: Accessor<boolean>

  /**
   * isAborted alias
   */
  isCanceled: Accessor<boolean>
}
export interface StrictUseAxiosReturn<T, R, D> extends UseAxiosReturn<T, R> {
  /**
   * Manually call the axios request
   */
  execute: (
    url?: string | AxiosRequestConfig<D>,
    config?: AxiosRequestConfig<D>
  ) => PromiseLike<StrictUseAxiosReturn<T, R, D>>
}
export interface EasyUseAxiosReturn<T, R, D> extends UseAxiosReturn<T, R> {
  /**
   * Manually call the axios request
   */
  execute: (url: string, config?: AxiosRequestConfig<D>) => PromiseLike<EasyUseAxiosReturn<T, R, D>>
}
export interface UseAxiosOptions<T = any> {
  /**
   * Will automatically run axios request when `useAxios` is used
   *
   */
  immediate?: boolean
  /**
   * Use shallowRef.
   *
   * @default true
   */
  shallow?: boolean

  /**
   * Callback when error is caught.
   */
  onError?: (e: unknown) => void

  /**
   * Callback when success is caught.
   */
  onSuccess?: (data: T) => void
  /**
   * Callback when request is finished.
   */
  onFinish?: () => void
}
type OverallUseAxiosReturn<T, R, D> = StrictUseAxiosReturn<T, R, D> | EasyUseAxiosReturn<T, R, D>

export function useAxios<T = any, R = AxiosResponse<T>, D = any>(
  url: string,
  config?: AxiosRequestConfig<D>,
  options?: UseAxiosOptions<T>
): StrictUseAxiosReturn<T, R, D> & PromiseLike<StrictUseAxiosReturn<T, R, D>>
export function useAxios<T = any, R = AxiosResponse<T>, D = any>(
  url: string,
  instance?: AxiosInstance,
  options?: UseAxiosOptions<T>
): StrictUseAxiosReturn<T, R, D> & PromiseLike<StrictUseAxiosReturn<T, R, D>>
export function useAxios<T = any, R = AxiosResponse<T>, D = any>(
  url: string,
  config: AxiosRequestConfig<D>,
  instance: AxiosInstance,
  options?: UseAxiosOptions<T>
): StrictUseAxiosReturn<T, R, D> & PromiseLike<StrictUseAxiosReturn<T, R, D>>
export function useAxios<T = any, R = AxiosResponse<T>, D = any>(
  config?: AxiosRequestConfig<D>
): EasyUseAxiosReturn<T, R, D> & PromiseLike<EasyUseAxiosReturn<T, R, D>>
export function useAxios<T = any, R = AxiosResponse<T>, D = any>(
  instance?: AxiosInstance
): EasyUseAxiosReturn<T, R, D> & PromiseLike<EasyUseAxiosReturn<T, R, D>>
export function useAxios<T = any, R = AxiosResponse<T>, D = any>(
  config?: AxiosRequestConfig<D>,
  instance?: AxiosInstance
): EasyUseAxiosReturn<T, R, D> & PromiseLike<EasyUseAxiosReturn<T, R, D>>

/**
 * Wrapper for axios.
 */
export function useAxios<T = any, R = AxiosResponse<T>, D = any>(
  ...args: any[]
): OverallUseAxiosReturn<T, R, D> & PromiseLike<OverallUseAxiosReturn<T, R, D>> {
  const url: string | undefined = typeof args[0] === 'string' ? args[0] : undefined
  const argsPlaceholder = isString(url) ? 1 : 0
  let defaultConfig: AxiosRequestConfig<D> = {}
  let instance: AxiosInstance = axios
  let options: UseAxiosOptions<T> = { immediate: !!argsPlaceholder, shallow: true }

  const isAxiosInstance = (val: any) => !!val?.request

  if (args.length > 0 + argsPlaceholder) {
    /**
     * Unable to use `instanceof` here because of (https://github.com/axios/axios/issues/737)
     * so instead we are checking if there is a `request` on the object to see if it is an
     * axios instance
     */
    if (isAxiosInstance(args[0 + argsPlaceholder])) instance = args[0 + argsPlaceholder]
    else defaultConfig = args[0 + argsPlaceholder]
  }

  if (args.length > 1 + argsPlaceholder) {
    if (isAxiosInstance(args[1 + argsPlaceholder])) instance = args[1 + argsPlaceholder]
  }
  if (
    (args.length === 2 + argsPlaceholder && !isAxiosInstance(args[1 + argsPlaceholder])) ||
    args.length === 3 + argsPlaceholder
  )
    options = args[args.length - 1]

  const [response, setResponse] = createSignal<AxiosResponse<T>>()
  const [data, setData] = createSignal<T>()
  const [isFinished, setIsFinish] = createSignal(false)
  const [isLoading, setIsLoading] = createSignal(false)
  const [isAborted, setIsAborted] = createSignal(false)
  const [error, setError] = createSignal<unknown>()

  const cancelTokenSource = axios.CancelToken.source
  let cancelToken: CancelTokenSource = cancelTokenSource()

  const abort = (message?: string) => {
    if (isFinished() || !isLoading()) return

    cancelToken.cancel(message)
    cancelToken = cancelTokenSource()
    setIsAborted(true)
    setIsLoading(false)
    setIsFinish(false)
  }
  const loading = (loading: boolean) => {
    setIsLoading(loading)
    setIsFinish(!loading)
  }
  const owner = getOwner()!
  const waitUntilFinished = () =>
    new Promise<OverallUseAxiosReturn<T, R, D>>((resolve, reject) => {
      runWithOwner(owner, () => {
        until(isFinished)
          .toBe(true)
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          .then(() => resolve(result))
          .catch(reject)
      })
    })
  const then: PromiseLike<OverallUseAxiosReturn<T, R, D>>['then'] = (onFulfilled, onRejected) =>
    waitUntilFinished().then(onFulfilled, onRejected)
  const execute: OverallUseAxiosReturn<T, R, D>['execute'] = (
    executeUrl: string | AxiosRequestConfig<D> | undefined = url,
    config: AxiosRequestConfig<D> = {}
  ) => {
    setError(undefined)
    const _url = typeof executeUrl === 'string' ? executeUrl : url ?? ''

    if (_url === undefined) {
      const error = new AxiosError<T>(AxiosError.ERR_INVALID_URL)
      setError(() => error)
      setIsFinish(true)
      return { then }
    }

    abort()
    loading(true)
    instance(_url, {
      ...defaultConfig,
      ...(typeof executeUrl === 'object' ? executeUrl : config),
      cancelToken: cancelToken.token
    })
      .then((r: any) => {
        setResponse(r)
        const result = r.data
        setData(result)
        options.onSuccess?.(result)
      })
      .catch((e: any) => {
        setError(e)
        options.onError?.(e)
      })
      .finally(() => {
        options.onFinish?.()
        loading(false)
      })
    return { then }
  }
  if (options.immediate && url) (execute as StrictUseAxiosReturn<T, R, D>['execute'])()

  const result = {
    response,
    data,
    error,
    finished: isFinished,
    loading,
    isFinished,
    isLoading,
    cancel: abort,
    isAborted,
    canceled: isAborted,
    aborted: isAborted,
    isCanceled: isAborted,
    abort,
    execute
  } as OverallUseAxiosReturn<T, R, D>

  return {
    ...result,
    then
  }
}
