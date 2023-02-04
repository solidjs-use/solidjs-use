/* this implementation is a vue port of https://github.com/alewin/useWorker by Alessio Koci */

import { tryOnCleanup } from '@solidjs-use/shared'
import { createSignal } from 'solid-js'
import { defaultWindow } from '../_configurable'
import createWorkerBlobUrl from './lib/createWorkerBlobUrl'
import type { ConfigurableWindow } from '../_configurable'

export type WebWorkerStatus = 'PENDING' | 'SUCCESS' | 'RUNNING' | 'ERROR' | 'TIMEOUT_EXPIRED'

export interface UseWebWorkerOptions extends ConfigurableWindow {
  /**
   * Number of milliseconds before killing the worker
   *
   * @default undefined
   */
  timeout?: number
  /**
   * An array that contains the external dependencies needed to run the worker
   */
  dependencies?: string[]
}

/**
 * Run expensive function without blocking the UI, using a simple syntax that makes use of Promise.
 */
export const useWebWorkerFn = <T extends (...fnArgs: any[]) => any>(fn: T, options: UseWebWorkerOptions = {}) => {
  const { dependencies = [], timeout, window = defaultWindow } = options

  const [worker, setWorker] = createSignal<(Worker & { _url?: string }) | undefined>()
  const [workerStatus, setWorkerStatus] = createSignal<WebWorkerStatus>('PENDING')
  const [promise, setPromise] = createSignal<{
    reject?: (result: ReturnType<T> | ErrorEvent) => void
    resolve?: (result: ReturnType<T>) => void
  }>({})
  const [timeoutId, setTimeoutId] = createSignal<number>()

  const workerTerminate = (status: WebWorkerStatus = 'PENDING') => {
    const workerVal = worker()
    if (workerVal?._url && window) {
      workerVal.terminate()
      URL.revokeObjectURL(workerVal._url)
      setPromise({})
      setWorker(undefined)
      window.clearTimeout(timeoutId())
      setWorkerStatus(status)
    }
  }

  workerTerminate()

  tryOnCleanup(workerTerminate)

  const generateWorker = () => {
    const blobUrl = createWorkerBlobUrl(fn, dependencies)
    const newWorker: Worker & { _url?: string } = new Worker(blobUrl)
    newWorker._url = blobUrl

    newWorker.onmessage = (e: MessageEvent) => {
      const { resolve = () => {}, reject = () => {} } = promise()
      const [status, result] = e.data as [WebWorkerStatus, ReturnType<T>]

      switch (status) {
        case 'SUCCESS':
          resolve(result)
          workerTerminate(status)
          break
        default:
          reject(result)
          workerTerminate('ERROR')
          break
      }
    }

    newWorker.onerror = (e: ErrorEvent) => {
      const { reject = () => {} } = promise()

      reject(e)
      workerTerminate('ERROR')
    }

    if (timeout) {
      setTimeoutId(setTimeout(() => workerTerminate('TIMEOUT_EXPIRED'), timeout) as any)
    }
    return newWorker
  }

  const callWorker = (...fnArgs: Parameters<T>) =>
    new Promise<ReturnType<T>>((resolve, reject) => {
      setPromise({
        resolve,
        reject
      })
      worker()?.postMessage([[...fnArgs]])

      setWorkerStatus('RUNNING')
    })

  const workerFn = (...fnArgs: Parameters<T>) => {
    if (workerStatus() === 'RUNNING') {
      console.error('[useWebWorkerFn] You can only run one instance of the worker at a time.')
      /* eslint-disable-next-line prefer-promise-reject-errors */
      return Promise.reject()
    }

    setWorker(generateWorker())
    return callWorker(...fnArgs)
  }

  return {
    workerFn,
    workerStatus,
    workerTerminate
  }
}

export type UseWebWorkerFnReturn = ReturnType<typeof useWebWorkerFn>
