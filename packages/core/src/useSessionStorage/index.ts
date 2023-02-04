import { useStorage } from '../useStorage'
import { defaultWindow } from '../_configurable'
import type { MaybeAccessor, RemovableSignal } from '@solidjs-use/shared'
import type { Accessor } from 'solid-js'
import type { UseStorageOptions } from '../useStorage'

export function useSessionStorage(
  key: string,
  initialValue: Accessor<string>,
  options?: UseStorageOptions<string>
): Accessor<string>
export function useSessionStorage(
  key: string,
  initialValue: string,
  options?: UseStorageOptions<string>
): RemovableSignal<string>
export function useSessionStorage(
  key: string,
  initialValue: Accessor<boolean>,
  options?: UseStorageOptions<boolean>
): Accessor<boolean>
export function useSessionStorage(
  key: string,
  initialValue: boolean,
  options?: UseStorageOptions<boolean>
): RemovableSignal<boolean>
export function useSessionStorage(
  key: string,
  initialValue: Accessor<number>,
  options?: UseStorageOptions<number>
): Accessor<number>
export function useSessionStorage(
  key: string,
  initialValue: number,
  options?: UseStorageOptions<number>
): RemovableSignal<number>
export function useSessionStorage<T>(
  key: string,
  initialValue: Accessor<T>,
  options?: UseStorageOptions<T>
): Accessor<T>
export function useSessionStorage<T>(key: string, initialValue: T, options?: UseStorageOptions<T>): RemovableSignal<T>
export function useSessionStorage<T = unknown>(
  key: string,
  initialValue: Accessor<null>,
  options?: UseStorageOptions<T>
): Accessor<T>
export function useSessionStorage<T = unknown>(
  key: string,
  initialValue: null,
  options?: UseStorageOptions<T>
): RemovableSignal<T>

/**
 * Reactive SessionStorage.
 */
export function useSessionStorage<T extends string | number | boolean | object | null>(
  key: string,
  initialValue: MaybeAccessor<T>,
  options: UseStorageOptions<T> = {}
): any {
  const { window = defaultWindow } = options
  return useStorage(key, initialValue as any, window?.sessionStorage, options)
}
