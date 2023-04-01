import { objectPick, toAccessors } from '@solidjs-use/shared'
import { createMutable } from 'solid-js/store'
import { createSignal } from 'solid-js'
import { useEventListener } from '../useEventListener'
import { defaultWindow } from '../_configurable'
import type { PointerType, Position } from '../types'
import type { ConfigurableWindow } from '../_configurable'
import type { MaybeAccessor } from '@solidjs-use/shared'

export interface UsePointerState extends Position {
  pressure: number
  pointerId: number
  tiltX: number
  tiltY: number
  width: number
  height: number
  twist: number
  pointerType: PointerType | null
}

export interface UsePointerOptions extends ConfigurableWindow {
  /**
   * Pointer types that listen to.
   *
   * @default ['mouse', 'touch', 'pen']
   */
  pointerTypes?: PointerType[]

  /**
   * Initial values
   */
  initialValue?: MaybeAccessor<Partial<UsePointerState>>

  /**
   * @default window
   */
  target?: MaybeAccessor<EventTarget | null | undefined> | Document | Window
}

const defaultState: UsePointerState = /* #__PURE__ */ {
  x: 0,
  y: 0,
  pointerId: 0,
  pressure: 0,
  tiltX: 0,
  tiltY: 0,
  width: 0,
  height: 0,
  twist: 0,
  pointerType: null
}
const keys = /* #__PURE__ */ Object.keys(defaultState) as Array<keyof UsePointerState>

/**
 * Reactive pointer state.
 *
 * @see https://solidjs-use.github.io/solidjs-use/core/usePointer
 */
export function usePointer(options: UsePointerOptions = {}) {
  const { target = defaultWindow } = options

  const [isInside, setInside] = createSignal(false)
  const state = createMutable(options.initialValue ?? {}) as UsePointerState
  Object.assign(state, defaultState)

  const handler = (event: PointerEvent) => {
    setInside(true)
    if (options.pointerTypes && !options.pointerTypes.includes(event.pointerType as PointerType)) return

    Object.assign(state, objectPick(event, keys, false))
  }

  if (target) {
    useEventListener(target, 'pointerdown', handler, { passive: true })
    useEventListener(target, 'pointermove', handler, { passive: true })
    useEventListener(target, 'pointerleave', () => setInside(false), { passive: true })
  }

  return {
    ...toAccessors(state),
    isInside
  }
}

export type UsePointerReturn = ReturnType<typeof usePointer>
