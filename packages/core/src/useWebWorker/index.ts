/* this implementation is original ported from https://github.com/logaretm/vue-use-web by Abdelrahman Awad */

import { isFunction, isString, tryOnCleanup } from '@solidjs-use/shared'
import { createSignal } from 'solid-js'
import { defaultWindow } from '../_configurable'
import type { Accessor } from 'solid-js'
import type { ConfigurableWindow } from '../_configurable'

export interface UseWebWorkerReturn<Data = any> {
  data: Accessor<Data>
  post: (typeof Worker.prototype)['postMessage']
  terminate: () => void
  worker: Accessor<Worker | undefined>
}

type WorkerFn = (...args: unknown[]) => Worker

/**
 * Simple Web Workers registration and communication.
 */
export function useWebWorker<T = any>(
  url: string,
  workerOptions?: WorkerOptions,
  options?: ConfigurableWindow
): UseWebWorkerReturn<T>

/**
 * Simple Web Workers registration and communication.
 */
export function useWebWorker<T = any>(worker: Worker | WorkerFn): UseWebWorkerReturn<T>

export function useWebWorker<Data = any>(
  arg0: string | WorkerFn | Worker,
  workerOptions?: WorkerOptions,
  options?: ConfigurableWindow
): UseWebWorkerReturn<Data> {
  const { window = defaultWindow } = options ?? {}

  const [data, setData] = createSignal<any>(null)
  const [worker, setWorker] = createSignal<Worker>()

  const post: (typeof Worker.prototype)['postMessage'] = function post(val: any) {
    const workerValue = worker()
    if (!workerValue) return

    workerValue.postMessage(val)
  }

  const terminate: (typeof Worker.prototype)['terminate'] = function terminate() {
    const workerValue = worker()
    if (!workerValue) return

    workerValue.terminate()
  }

  if (window) {
    if (isString(arg0)) setWorker(new Worker(arg0, workerOptions))
    else if (isFunction(arg0)) setWorker((arg0 as any)())
    else setWorker(arg0)

    const workValue = worker()!
    workValue.onmessage = (e: MessageEvent) => {
      setData(e.data)
    }

    tryOnCleanup(() => {
      if (worker()) worker()!.terminate()
    })
  }

  return {
    data,
    post,
    terminate,
    worker
  }
}
