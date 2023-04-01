import { createSignal, getOwner, onMount } from 'solid-js'

/**
 * Mounted state in Accessor.
 *
 * @see https://solidjs-use.github.io/solidjs-use/core/useMounted
 */
export function useMounted() {
  const [isMounted, setIsMounted] = createSignal(false)

  if (getOwner()) {
    onMount(() => {
      setIsMounted(true)
    })
  }

  return isMounted
}
