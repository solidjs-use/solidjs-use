import { createSignal } from 'solid-js'
import { useEventListener } from '../useEventListener'
import { defaultDocument } from '../_configurable'
import type { Accessor } from 'solid-js'
import type { WindowEventName } from '../useEventListener'
import type { ConfigurableDocument } from '../_configurable'

export type KeyModifier =
  | 'Alt'
  | 'AltGraph'
  | 'CapsLock'
  | 'Control'
  | 'Fn'
  | 'FnLock'
  | 'Meta'
  | 'NumLock'
  | 'ScrollLock'
  | 'Shift'
  | 'Symbol'
  | 'SymbolLock'

const defaultEvents: WindowEventName[] = ['mousedown', 'mouseup', 'keydown', 'keyup']

export interface UseModifierOptions<Initial> extends ConfigurableDocument {
  /**
   * Event names that will prompt update to modifier states
   *
   * @default ['mousedown', 'mouseup', 'keydown', 'keyup']
   */
  events?: WindowEventName[]

  /**
   * Initial value of the returned Accessor
   *
   * @default null
   */
  initial?: Initial
}

export type UseKeyModifierReturn<Initial> = Accessor<Initial extends boolean ? boolean : boolean | null>

/**
 * Reactive [Modifier State](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/getModifierState).
 *
 * @see https://solidjs-use.github.io/solidjs-use/core/useKeyModifier
 */
export function useKeyModifier<Initial extends boolean | null>(
  modifier: KeyModifier,
  options: UseModifierOptions<Initial> = {}
): UseKeyModifierReturn<Initial> {
  const { events = defaultEvents, document = defaultDocument, initial = null } = options

  const [state, setState] = createSignal<boolean>(initial!)

  if (document) {
    events.forEach(listenerEvent => {
      useEventListener(document, listenerEvent, (evt: KeyboardEvent | MouseEvent) => {
        if (typeof evt.getModifierState === 'function') setState(evt.getModifierState(modifier))
      })
    })
  }

  return state
}
