import { createMemo } from 'solid-js'
import { useMounted } from '../useMounted'
import type { Accessor } from 'solid-js'

export function useSupported(callback: () => unknown): Accessor<boolean> {
  const isMounted = useMounted()

  return createMemo(() => {
    // to trigger the signal
    // eslint-disable-next-line no-unused-expressions
    isMounted()
    return Boolean(callback())
  })
}
