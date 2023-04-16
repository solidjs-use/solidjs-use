import { toValue, watchWithFilter } from '@solidjs-use/shared'
import { toSignal } from '@solidjs-use/shared/solid-to-vue'
import { getSSRHandler } from '../ssr-handlers'
import { useEventListener } from '../useEventListener'
import { StorageSerializers } from '../useStorage'
import { guessSerializerType } from '../useStorage/guess'
import { defaultWindow } from '../_configurable'
import type { Accessor } from 'solid-js'
import type { SerializerAsync, UseStorageOptions } from '../useStorage'
import type { StorageLikeAsync } from '../ssr-handlers'
import type { MaybeAccessor, RemovableSignal } from '@solidjs-use/shared'

export interface UseStorageAsyncOptions<T> extends Omit<UseStorageOptions<T>, 'serializer'> {
  /**
   * Custom data serialization
   */
  serializer?: SerializerAsync<T>
}

export function useStorageAsync(
  key: string,
  initialValue: Accessor<string>,
  storage?: StorageLikeAsync,
  options?: UseStorageAsyncOptions<string>
): Accessor<string>
export function useStorageAsync(
  key: string,
  initialValue: string,
  storage?: StorageLikeAsync,
  options?: UseStorageAsyncOptions<string>
): RemovableSignal<string>
export function useStorageAsync(
  key: string,
  initialValue: Accessor<boolean>,
  storage?: StorageLikeAsync,
  options?: UseStorageAsyncOptions<boolean>
): Accessor<boolean>
export function useStorageAsync(
  key: string,
  initialValue: boolean,
  storage?: StorageLikeAsync,
  options?: UseStorageAsyncOptions<boolean>
): RemovableSignal<boolean>
export function useStorageAsync(
  key: string,
  initialValue: Accessor<number>,
  storage?: StorageLikeAsync,
  options?: UseStorageAsyncOptions<number>
): Accessor<number>
export function useStorageAsync(
  key: string,
  initialValue: number,
  storage?: StorageLikeAsync,
  options?: UseStorageAsyncOptions<number>
): RemovableSignal<number>
export function useStorageAsync<T>(
  key: string,
  initialValue: Accessor<T>,
  storage?: StorageLikeAsync,
  options?: UseStorageAsyncOptions<T>
): Accessor<T>
export function useStorageAsync<T>(
  key: string,
  initialValue: T,
  storage?: StorageLikeAsync,
  options?: UseStorageAsyncOptions<T>
): RemovableSignal<T>
export function useStorageAsync<T = unknown>(
  key: string,
  initialValue: Accessor<null>,
  storage?: StorageLikeAsync,
  options?: UseStorageAsyncOptions<T>
): Accessor<T>
export function useStorageAsync<T = unknown>(
  key: string,
  initialValue: null,
  storage?: StorageLikeAsync,
  options?: UseStorageAsyncOptions<T>
): RemovableSignal<T>

/**
 * Reactive Storage in with async support.
 *
 * @see https://solidjs-use.github.io/solidjs-use/core/useStorageAsync
 */
export function useStorageAsync<T extends string | number | boolean | object | null>(
  key: string,
  initialValue: MaybeAccessor<T>,
  storage: StorageLikeAsync | undefined,
  options: UseStorageAsyncOptions<T> = {}
): any {
  const {
    listenToStorageChanges = true,
    writeDefaults = true,
    mergeDefaults = false,
    window = defaultWindow,
    eventFilter,
    onError = e => {
      console.error(e)
    }
  } = options

  const rawInit: T = toValue(initialValue)
  const type = guessSerializerType<T>(rawInit)

  const [data, setData] = toSignal(initialValue)
  const serializer = options.serializer ?? StorageSerializers[type]

  if (!storage) {
    try {
      storage = getSSRHandler('getDefaultStorage', () => defaultWindow?.localStorage)()
    } catch (e) {
      onError(e)
    }
  }

  async function read(event?: StorageEvent) {
    if (!storage || (event && event.key !== key)) return

    try {
      const rawValue = event ? event.newValue : await storage.getItem(key)
      if (rawValue == null) {
        setData(() => rawInit)
        if (writeDefaults && rawInit !== null) await storage.setItem(key, await serializer.write(rawInit))
      } else if (mergeDefaults) {
        const value = await serializer.read(rawValue)
        if (typeof mergeDefaults === 'function') {
          setData(() => mergeDefaults(value, rawInit))
        } else if (type === 'object' && !Array.isArray(value)) {
          setData({ ...(rawInit as any), ...value })
        } else {
          setData(value)
        }
      } else {
        setData(await serializer.read(rawValue))
      }
    } catch (e) {
      onError(e)
    }
  }

  read()

  if (window && listenToStorageChanges) useEventListener(window, 'storage', e => Promise.resolve().then(() => read(e)))

  if (storage) {
    watchWithFilter(
      data,
      async () => {
        try {
          const dataVal = data()
          if (dataVal == null) await storage!.removeItem(key)
          else await storage!.setItem(key, await serializer.write(dataVal))
        } catch (e) {
          onError(e)
        }
      },
      { eventFilter, defer: false }
    )
  }

  return data
}
