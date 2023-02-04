import { createSignal } from 'solid-js'
import { useEventListener } from '../useEventListener'
import { defaultDocument } from '../_configurable'
import type { Accessor } from 'solid-js'
import type { ConfigurableDocument } from '../_configurable'

/**
 * Reactively track `document.visibilityState`.
 */
export function useDocumentVisibility({
  document = defaultDocument
}: ConfigurableDocument = {}): Accessor<DocumentVisibilityState> {
  if (!document) {
    const [visibility] = createSignal('visible' as const)
    return visibility
  }

  const [visibility, setVisibility] = createSignal(document.visibilityState)

  useEventListener(document, 'visibilitychange', () => {
    setVisibility(document.visibilityState)
  })

  return visibility
}
