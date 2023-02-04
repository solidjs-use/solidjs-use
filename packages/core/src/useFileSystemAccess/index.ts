import { resolveAccessor, unAccessor } from '@solidjs-use/shared'
import { createEffect, createMemo, createSignal, on } from 'solid-js'
import { useSupported } from '../useSupported'
import { defaultWindow } from '../_configurable'
import type { Accessor, Setter } from 'solid-js'
import type { Awaitable, MaybeAccessor } from '@solidjs-use/shared'
import type { ConfigurableWindow } from '../_configurable'

/**
 * window.showOpenFilePicker parameters
 * @see https://developer.mozilla.org/en-US/docs/Web/API/window/showOpenFilePicker#parameters
 */
export interface FileSystemAccessShowOpenFileOptions {
  multiple?: boolean
  types?: Array<{
    description?: string
    accept: Record<string, string[]>
  }>
  excludeAcceptAllOption?: boolean
}

/**
 * window.showSaveFilePicker parameters
 * @see https://developer.mozilla.org/en-US/docs/Web/API/window/showSaveFilePicker#parameters
 */
export interface FileSystemAccessShowSaveFileOptions {
  suggestedName?: string
  types?: Array<{
    description?: string
    accept: Record<string, string[]>
  }>
  excludeAcceptAllOption?: boolean
}

/**
 * FileHandle
 * @see https://developer.mozilla.org/en-US/docs/Web/API/FileSystemFileHandle
 */
export interface FileSystemFileHandle {
  getFile: () => Promise<File>
  createWritable: () => FileSystemWritableFileStream
}

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/API/FileSystemWritableFileStream
 */
interface FileSystemWritableFileStream extends WritableStream {
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/FileSystemWritableFileStream/write
   */
  write: FileSystemWritableFileStreamWrite
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/FileSystemWritableFileStream/seek
   */
  seek: (position: number) => Promise<void>
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/FileSystemWritableFileStream/truncate
   */
  truncate: (size: number) => Promise<void>
}

/**
 * FileStream.write
 * @see https://developer.mozilla.org/en-US/docs/Web/API/FileSystemWritableFileStream/write
 */
interface FileSystemWritableFileStreamWrite {
  (data: string | BufferSource | Blob): Promise<void>
  (options: { type: 'write'; position: number; data: string | BufferSource | Blob }): Promise<void>
  (options: { type: 'seek'; position: number }): Promise<void>
  (options: { type: 'truncate'; size: number }): Promise<void>
}

/**
 * FileStream.write
 * @see https://developer.mozilla.org/en-US/docs/Web/API/FileSystemWritableFileStream/write
 */
export type FileSystemAccessWindow = Window & {
  showSaveFilePicker: (options: FileSystemAccessShowSaveFileOptions) => Promise<FileSystemFileHandle>
  showOpenFilePicker: (options: FileSystemAccessShowOpenFileOptions) => Promise<FileSystemFileHandle[]>
}

export type UseFileSystemAccessCommonOptions = Pick<
  FileSystemAccessShowOpenFileOptions,
  'types' | 'excludeAcceptAllOption'
>
export type UseFileSystemAccessShowSaveFileOptions = Pick<FileSystemAccessShowSaveFileOptions, 'suggestedName'>

export type UseFileSystemAccessOptions = ConfigurableWindow &
  UseFileSystemAccessCommonOptions & {
    /**
     * file data type
     */
    dataType?: MaybeAccessor<'Text' | 'ArrayBuffer' | 'Blob'>
  }

/**
 * Create and read and write local files.
 */
export function useFileSystemAccess(
  options: UseFileSystemAccessOptions & { dataType: 'Text' }
): UseFileSystemAccessReturn
export function useFileSystemAccess(
  options: UseFileSystemAccessOptions & { dataType: 'ArrayBuffer' }
): UseFileSystemAccessReturn<ArrayBuffer>
export function useFileSystemAccess(
  options: UseFileSystemAccessOptions & { dataType: 'Blob' }
): UseFileSystemAccessReturn<Blob>
export function useFileSystemAccess(
  options: UseFileSystemAccessOptions
): UseFileSystemAccessReturn<string | ArrayBuffer | Blob>
export function useFileSystemAccess(
  options: UseFileSystemAccessOptions = {}
): UseFileSystemAccessReturn<string | ArrayBuffer | Blob> {
  const { window: _window = defaultWindow, dataType = 'Text' } = options
  const window = _window as FileSystemAccessWindow
  const isSupported = useSupported(() => window && 'showSaveFilePicker' in window && 'showOpenFilePicker' in window)

  const [fileHandle, setFileHandle] = createSignal<FileSystemFileHandle>()
  const [data, setData] = createSignal<string | ArrayBuffer | Blob | undefined>()

  const [file, setFile] = createSignal<File | undefined>()
  const fileName = createMemo(() => file()?.name ?? '')
  const fileMIME = createMemo(() => file()?.type ?? '')
  const fileSize = createMemo(() => file()?.size ?? 0)
  const fileLastModified = createMemo(() => file()?.lastModified ?? 0)

  async function open(_options: UseFileSystemAccessCommonOptions = {}) {
    if (!isSupported()) return
    const [handle] = await window.showOpenFilePicker({ ...unAccessor(options), ..._options })
    setFileHandle(handle)
    await updateFile()
    await updateData()
  }

  async function create(_options: UseFileSystemAccessShowSaveFileOptions = {}) {
    if (!isSupported()) return
    const fileHandleValue = await window.showSaveFilePicker({
      ...unAccessor(options),
      ..._options
    })
    setFileHandle(fileHandleValue)
    setData(undefined)
    await updateFile()
    await updateData()
  }

  async function save(_options: UseFileSystemAccessShowSaveFileOptions = {}) {
    if (!isSupported()) return

    const fileHandleValue = fileHandle()
    if (!fileHandleValue)
      // save as
      return saveAs(_options)

    if (data()) {
      // eslint-disable-next-line @typescript-eslint/await-thenable
      const writableStream = await fileHandleValue.createWritable()
      await writableStream.write(data()!)
      await writableStream.close()
    }
    await updateFile()
  }

  async function saveAs(_options: UseFileSystemAccessShowSaveFileOptions = {}) {
    if (!isSupported()) return

    const fileHandleValue = await window.showSaveFilePicker({
      ...unAccessor(options),
      ..._options
    })
    setFileHandle(fileHandleValue)

    if (data()) {
      // eslint-disable-next-line @typescript-eslint/await-thenable
      const writableStream = await fileHandleValue.createWritable()
      await writableStream.write(data()!)
      await writableStream.close()
    }

    await updateFile()
  }

  async function updateFile() {
    const f = await fileHandle()?.getFile()
    setFile(() => f)
  }

  async function updateData() {
    if (unAccessor(dataType) === 'Text') setData(await file()?.text())
    if (unAccessor(dataType) === 'ArrayBuffer') setData(await file()?.arrayBuffer())
    if (unAccessor(dataType) === 'Blob') {
      setData(() => file())
    }
  }

  createEffect(on(resolveAccessor(dataType), updateData, { defer: true }))

  return {
    isSupported,
    data,
    setData,
    file,
    setFile,
    fileName,
    fileMIME,
    fileSize,
    fileLastModified,
    open,
    create,
    save,
    saveAs,
    updateData
  }
}

export interface UseFileSystemAccessReturn<T = string> {
  isSupported: Accessor<boolean>
  data: Accessor<T | undefined>
  setData: Setter<string | ArrayBuffer | Blob | undefined>
  file: Accessor<File | undefined>
  setFile: Setter<File | undefined>
  fileName: Accessor<string>
  fileMIME: Accessor<string>
  fileSize: Accessor<number>
  fileLastModified: Accessor<number>
  open: (_options?: UseFileSystemAccessCommonOptions) => Awaitable<void>
  create: (_options?: UseFileSystemAccessShowSaveFileOptions) => Awaitable<void>
  save: (_options?: UseFileSystemAccessShowSaveFileOptions) => Awaitable<void>
  saveAs: (_options?: UseFileSystemAccessShowSaveFileOptions) => Awaitable<void>
  updateData: () => Awaitable<void>
}
