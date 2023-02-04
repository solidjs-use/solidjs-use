import { createMemo, createSignal } from 'solid-js'
import { useEventListener } from '../useEventListener'
import { defaultWindow } from '../_configurable'
import type { ConfigurableWindow } from '../_configurable'

function getRangesFromSelection(selection: Selection) {
  const rangeCount = selection.rangeCount ?? 0
  const ranges = new Array(rangeCount)
  for (let i = 0; i < rangeCount; i++) {
    const range = selection.getRangeAt(i)
    ranges[i] = range
  }
  return ranges
}

/**
 * Reactively track user text selection based on [`Window.getSelection`](https://developer.mozilla.org/en-US/docs/Web/API/Window/getSelection).
 */
export function useTextSelection(options: ConfigurableWindow = {}) {
  const { window = defaultWindow } = options

  const [selection, setSelection] = createSignal<Selection | null>(null)
  const text = createMemo(() => selection()?.toString() ?? '')
  const ranges = createMemo<Range[]>(() => (selection() ? getRangesFromSelection(selection()!) : []))
  const rects = createMemo(() => ranges().map(range => range.getBoundingClientRect()))
  function onSelectionChange() {
    setSelection(null) // trigger computed update
    if (window) setSelection(window.getSelection())
  }
  if (window) useEventListener(window.document, 'selectionchange', onSelectionChange)

  return {
    text,
    rects,
    ranges,
    selection
  }
}

export type UseTextSelectionReturn = ReturnType<typeof useTextSelection>
