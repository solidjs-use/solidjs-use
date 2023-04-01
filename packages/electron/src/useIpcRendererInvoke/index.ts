import { createSignal } from 'solid-js'
import type { Accessor } from 'solid-js'
import type { IpcRenderer } from 'electron'

/**
 * Returns Promise<any> - Resolves with the response from the main process.
 *
 * Send a message to the main process via channel and expect a result ~~asynchronously~~. As composition-api, it makes asynchronous operations look like synchronous.
 *
 * You need to provide `ipcRenderer` to this function.
 *
 * @see https://solidjs-use.github.io/solidjs-use/electron/useIpcRendererInvoke
 * @see https://www.electronjs.org/docs/api/ipc-renderer#ipcrendererinvokechannel-args
 */
export function useIpcRendererInvoke<T>(ipcRenderer: IpcRenderer, channel: string, ...args: any[]): Accessor<T | null>

/**
 * Returns Promise<any> - Resolves with the response from the main process.
 *
 * Send a message to the main process via channel and expect a result ~~asynchronously~~. As composition-api, it makes asynchronous operations look like synchronous.
 *
 * `ipcRenderer` will be automatically gotten.
 *
 * @see https://solidjs-use.github.io/solidjs-use/electron/useIpcRendererInvoke
 * @see https://www.electronjs.org/docs/api/ipc-renderer#ipcrendererinvokechannel-args
 */
export function useIpcRendererInvoke<T>(channel: string, ...args: any[]): Accessor<T | null>

export function useIpcRendererInvoke<T>(...args: any[]): Accessor<T | null> {
  let ipcRenderer: IpcRenderer | undefined
  let channel: string
  let invokeArgs: any[]

  if (typeof args[0] === 'string') {
    ;[channel, ...invokeArgs] = args
    ipcRenderer = window.require ? window.require('electron').ipcRenderer : undefined
  } else {
    ;[ipcRenderer, channel, ...invokeArgs] = args
  }

  if (!ipcRenderer) throw new Error('please provide IpcRenderer module or enable nodeIntegration')

  const [result, setResult] = createSignal<T | null>(null)

  ipcRenderer.invoke(channel, ...invokeArgs).then(response => {
    setResult(response)
  })

  return result
}
