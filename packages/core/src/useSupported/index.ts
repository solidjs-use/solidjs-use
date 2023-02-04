import { tryOnMount } from '@solidjs-use/shared'
import { createSignal } from 'solid-js'
import type { Accessor } from 'solid-js'

export function useSupported(callback: () => unknown, sync = false): Accessor<boolean> {
  const [isSupported, setIsSupport] = createSignal<boolean>(Boolean(callback()))

  const update = () => setIsSupport(Boolean(callback()))

  tryOnMount(update, sync)
  return isSupported
}
