import { isClient, toValue } from '@solidjs-use/shared'
import { isAccessor } from '@solidjs-use/shared/solid-to-vue'
import { createEffect, createSignal, on } from 'solid-js'
import { getDefaultSerialization } from './serialization'
import type { Accessor } from 'solid-js'
import type { MaybeAccessor } from '@solidjs-use/shared'

export interface ToDataURLOptions {
  /**
   * MIME type
   */
  type?: string | undefined
  /**
   * Image quality of jpeg or webp
   */
  quality?: any
}

export interface UseBase64ObjectOptions<T> {
  serializer: (v: T) => string
}

export interface UseBase64Return {
  base64: Accessor<string>
  promise: Accessor<Promise<string>>
  execute: () => Promise<string>
}

export function useBase64(target: MaybeAccessor<string>): UseBase64Return
export function useBase64(target: MaybeAccessor<Blob>): UseBase64Return
export function useBase64(target: MaybeAccessor<ArrayBuffer>): UseBase64Return
export function useBase64(target: MaybeAccessor<HTMLCanvasElement>, options?: ToDataURLOptions): UseBase64Return
export function useBase64(target: MaybeAccessor<HTMLImageElement>, options?: ToDataURLOptions): UseBase64Return
export function useBase64<T extends Record<string, unknown>>(
  target: MaybeAccessor<T>,
  options?: UseBase64ObjectOptions<T>
): UseBase64Return
export function useBase64<T extends Map<string, unknown>>(
  target: MaybeAccessor<T>,
  options?: UseBase64ObjectOptions<T>
): UseBase64Return
export function useBase64<T extends Set<unknown>>(
  target: MaybeAccessor<T>,
  options?: UseBase64ObjectOptions<T>
): UseBase64Return
/**
 * Reactive base64 transforming. Supports plain text, buffer, files, canvas, objects, maps, sets and images.
 *
 * @see https://solidjs-use.github.io/solidjs-use/core/useBase64
 */
export function useBase64<T>(target: MaybeAccessor<T[]>, options?: UseBase64ObjectOptions<T[]>): UseBase64Return
export function useBase64(target: any, options?: any) {
  const [base64, setBase64] = createSignal('')
  const [promise, setPromise] = createSignal<Promise<string>>()

  function execute() {
    if (!isClient) return

    const promiseVal = new Promise<string>((resolve, reject) => {
      try {
        const _target = toValue(target)
        if (_target == null) {
          resolve('')
        } else if (typeof _target === 'string') {
          resolve(blobToBase64(new Blob([_target], { type: 'text/plain' })))
        } else if (_target instanceof Blob) {
          resolve(blobToBase64(_target))
        } else if (_target instanceof ArrayBuffer) {
          resolve(window.btoa(String.fromCharCode(...new Uint8Array(_target))))
        } else if (_target instanceof HTMLCanvasElement) {
          resolve(_target.toDataURL(options?.type, options?.quality))
        } else if (_target instanceof HTMLImageElement) {
          const img = _target.cloneNode(false) as HTMLImageElement
          img.crossOrigin = 'Anonymous'
          imgLoaded(img)
            .then(() => {
              const canvas = document.createElement('canvas')
              const ctx = canvas.getContext('2d')!
              canvas.width = img.width
              canvas.height = img.height
              ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
              resolve(canvas.toDataURL(options?.type, options?.quality))
            })
            .catch(reject)
        } else if (typeof _target === 'object') {
          const _serializeFn = options?.serializer ?? getDefaultSerialization(_target)

          const serialized = _serializeFn(_target)

          return resolve(blobToBase64(new Blob([serialized], { type: 'application/json' })))
        } else {
          reject(new Error('target is unsupported types'))
        }
      } catch (error) {
        reject(error)
      }
    })
    setPromise(() => promiseVal)
    promiseVal.then(res => setBase64(res))
    return promiseVal
  }

  if (isAccessor(target)) {
    createEffect(on(target, execute))
  } else {
    execute()
  }

  return {
    base64,
    promise,
    execute
  }
}

function imgLoaded(img: HTMLImageElement) {
  return new Promise<void>((resolve, reject) => {
    if (!img.complete) {
      img.onload = () => {
        resolve()
      }
      img.onerror = reject
    } else {
      resolve()
    }
  })
}

function blobToBase64(blob: Blob) {
  return new Promise<string>((resolve, reject) => {
    const fr = new FileReader()
    fr.onload = e => {
      resolve(e.target!.result as string)
    }
    fr.onerror = reject
    fr.readAsDataURL(blob)
  })
}
