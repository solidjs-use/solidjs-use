import { createSignal, onMount } from 'solid-js'

/**
 * Mounted state in Accessor.
 */
export function useMounted() {
  const [isMounted, setIsMounted] = createSignal(false)

  onMount(() => {
    setIsMounted(true)
  })

  return isMounted
}
