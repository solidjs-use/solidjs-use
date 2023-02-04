import { pausableWatch, unAccessor } from '@solidjs-use/shared'
import { isAccessor, isFunction, nextTick, toSignal } from '@solidjs-use/shared/solid-to-vue'
import { getSSRHandler } from '../ssr-handlers'
import { useEventListener } from '../useEventListener'
import { defaultWindow } from '../_configurable'
import { guessSerializerType } from './guess'
import type { ConfigurableWindow } from '../_configurable'
import type { StorageLike } from '../ssr-handlers'
import type { Awaitable, ConfigurableEventFilter, MaybeAccessor, RemovableSignal } from '@solidjs-use/shared'
import type { Accessor } from 'solid-js'

export interface Serializer<T> {
  read: (raw: string) => T
  write: (value: T) => string
}

export interface SerializerAsync<T> {
  read: (raw: string) => Awaitable<T>
  write: (value: T) => Awaitable<string>
}

export const StorageSerializers: Record<
  'boolean' | 'object' | 'number' | 'any' | 'string' | 'map' | 'set' | 'date',
  Serializer<any>
> = {
  boolean: {
    read: (v: any) => v === 'true',
    write: (v: any) => String(v)
  },
  object: {
    read: (v: any) => JSON.parse(v),
    write: (v: any) => JSON.stringify(v)
  },
  number: {
    read: (v: any) => Number.parseFloat(v),
    write: (v: any) => String(v)
  },
  any: {
    read: (v: any) => v,
    write: (v: any) => String(v)
  },
  string: {
    read: (v: any) => v,
    write: (v: any) => String(v)
  },
  map: {
    read: (v: any) => new Map(JSON.parse(v)),
    write: (v: any) => JSON.stringify(Array.from((v as Map<any, any>).entries()))
  },
  set: {
    read: (v: any) => new Set(JSON.parse(v)),
    write: (v: any) => JSON.stringify(Array.from(v as Set<any>))
  },
  date: {
    read: (v: any) => new Date(v),
    write: (v: any) => v.toISOString()
  }
}

export interface UseStorageOptions<T> extends ConfigurableEventFilter, ConfigurableWindow {
  /**
   * Watch for deep changes
   *
   * @default true
   */
  deep?: boolean

  /**
   * Listen to storage changes, useful for multiple tabs application
   *
   * @default true
   */
  listenToStorageChanges?: boolean

  /**
   * Write the default value to the storage when it does not exist
   *
   * @default true
   */
  writeDefaults?: boolean

  /**
   * Merge the default value with the value read from the storage.
   *
   * When setting it to true, it will perform a **shallow merge** for objects.
   * You can pass a function to perform custom merge (e.g. deep merge), for example:
   *
   * @default false
   */
  mergeDefaults?: boolean | ((storageValue: T, defaults: T) => T)

  /**
   * Custom data serialization
   */
  serializer?: Serializer<T>

  /**
   * On error callback
   *
   * Default log error to `console.error`
   */
  onError?: (error: unknown) => void
}

export function useStorage(
  key: string,
  defaults: Accessor<string>,
  storage?: StorageLike,
  options?: UseStorageOptions<string>
): Accessor<string>
export function useStorage(
  key: string,
  defaults: string,
  storage?: StorageLike,
  options?: UseStorageOptions<string>
): RemovableSignal<string>
export function useStorage(
  key: string,
  defaults: Accessor<boolean>,
  storage?: StorageLike,
  options?: UseStorageOptions<boolean>
): Accessor<boolean>
export function useStorage(
  key: string,
  defaults: boolean,
  storage?: StorageLike,
  options?: UseStorageOptions<boolean>
): RemovableSignal<boolean>
export function useStorage(
  key: string,
  defaults: Accessor<number>,
  storage?: StorageLike,
  options?: UseStorageOptions<number>
): Accessor<number>
export function useStorage(
  key: string,
  defaults: number,
  storage?: StorageLike,
  options?: UseStorageOptions<number>
): RemovableSignal<number>
export function useStorage<T>(
  key: string,
  defaults: Accessor<T>,
  storage?: StorageLike,
  options?: UseStorageOptions<T>
): Accessor<T>
export function useStorage<T>(
  key: string,
  defaults: T,
  storage?: StorageLike,
  options?: UseStorageOptions<T>
): RemovableSignal<T>
export function useStorage<T = unknown>(
  key: string,
  defaults: Accessor<null>,
  storage?: StorageLike,
  options?: UseStorageOptions<T>
): Accessor<T>
export function useStorage<T = unknown>(
  key: string,
  defaults: null,
  storage?: StorageLike,
  options?: UseStorageOptions<T>
): RemovableSignal<T>

/**
 * Reactive LocalStorage/SessionStorage.
 */
export function useStorage<T extends string | number | boolean | object | null>(
  key: string,
  defaults: MaybeAccessor<T>,
  storage: StorageLike | undefined,
  options: UseStorageOptions<T> = {}
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

  const [data, setData] = toSignal(defaults)

  if (!storage) {
    try {
      storage = getSSRHandler('getDefaultStorage', () => defaultWindow?.localStorage)()
    } catch (e) {
      onError(e)
    }
  }

  if (!storage) return isAccessor(defaults) ? data : [data, setData]

  const rawInit: T = unAccessor(defaults)
  const type = guessSerializerType<T>(rawInit)
  const serializer = options.serializer ?? StorageSerializers[type]

  const { pause: pauseWatch, resume: resumeWatch } = pausableWatch(data, () => write(data()), {
    eventFilter,
    defer: false
  })

  if (window && listenToStorageChanges) useEventListener(window, 'storage', update)

  update()

  return isAccessor(defaults) ? data : [data, setData]

  function write(v: unknown) {
    try {
      if (v == null) {
        storage!.removeItem(key)
      } else {
        const serialized = serializer.write(v as any)
        const oldValue = storage!.getItem(key)
        if (oldValue !== serialized) {
          storage!.setItem(key, serialized)

          // send custom event to communicate within same page
          if (window) {
            window?.dispatchEvent(
              new StorageEvent('storage', {
                key,
                oldValue,
                newValue: serialized,
                storageArea: storage as any
              })
            )
          }
        }
      }
    } catch (e) {
      onError(e)
    }
  }

  function read(event?: StorageEvent) {
    const rawValue = event ? event.newValue : storage!.getItem(key)

    if (rawValue == null) {
      if (writeDefaults && rawInit !== null) storage!.setItem(key, serializer.write(rawInit))
      return rawInit
    } else if (!event && mergeDefaults) {
      const value = serializer.read(rawValue)
      if (isFunction(mergeDefaults)) return mergeDefaults(value, rawInit)
      else if (type === 'object' && !Array.isArray(value)) return { ...(rawInit as any), ...value }
      return value
    } else if (typeof rawValue !== 'string') {
      return rawValue
    }
    return serializer.read(rawValue)
  }

  function update(event?: StorageEvent) {
    if (event && event.storageArea !== storage) return

    if (event && event.key == null) {
      setData(() => rawInit)
      return
    }

    if (event && event.key !== key) return

    pauseWatch()
    try {
      setData(read(event))
    } catch (e) {
      onError(e)
    } finally {
      // use nextTick to avoid infinite loop
      if (event) nextTick(resumeWatch)
      else resumeWatch()
    }
  }
}
