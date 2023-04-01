import { createSignal, getOwner, onMount } from 'solid-js'

/**
 * Mounted state in Accessor.
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
