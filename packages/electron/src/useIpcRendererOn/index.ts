import { onCleanup } from 'solid-js'
import type { IpcRenderer } from 'electron'
import type { IpcRendererListener } from '../_types'

/**
 * Listens to channel, when a new message arrives listener would be called with listener(event, args...).
 * [ipcRenderer.removeListener](https://www.electronjs.org/docs/api/ipc-renderer#ipcrendererremovelistenerchannel-listener) automatically on unmounted.
 *
 * You need to provide `ipcRenderer` to this function.
 *
 * @see https://solidjs-use.github.io/solidjs-use/electron/useIpcRendererOn
 * @see https://www.electronjs.org/docs/api/ipc-renderer#ipcrendereronchannel-listener
 */
export function useIpcRendererOn(ipcRenderer: IpcRenderer, channel: string, listener: IpcRendererListener): IpcRenderer

/**
 * Listens to channel, when a new message arrives listener would be called with listener(event, args...).
 * [ipcRenderer.removeListener](https://www.electronjs.org/docs/api/ipc-renderer#ipcrendererremovelistenerchannel-listener) automatically on unmounted.
 *
 * `ipcRenderer` will be automatically gotten.
 *
 * @see https://solidjs-use.github.io/solidjs-use/electron/useIpcRendererOn
 * @see https://www.electronjs.org/docs/api/ipc-renderer#ipcrendereronchannel-listener
 */
export function useIpcRendererOn(channel: string, listener: IpcRendererListener): IpcRenderer

export function useIpcRendererOn(...args: any[]): IpcRenderer {
  let ipcRenderer: IpcRenderer | undefined
  let channel: string
  let listener: IpcRendererListener

  if (typeof args[0] === 'string') {
    ;[channel, listener] = args
    ipcRenderer = window.require ? window.require('electron').ipcRenderer : undefined
  } else {
    ;[ipcRenderer, channel, listener] = args
  }

  if (!ipcRenderer) throw new Error('please provide IpcRenderer module or enable nodeIntegration')

  onCleanup(() => {
    ipcRenderer!.removeListener(channel, listener)
  })

  return ipcRenderer.on(channel, listener)
}
