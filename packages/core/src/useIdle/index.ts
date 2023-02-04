import { createFilterWrapper, throttleFilter, timestamp } from '@solidjs-use/shared'
import { createSignal } from 'solid-js'
import { useEventListener } from '../useEventListener'
import { defaultWindow } from '../_configurable'
import type { Accessor } from 'solid-js'
import type { ConfigurableEventFilter } from '@solidjs-use/shared'
import type { WindowEventName } from '../useEventListener'
import type { ConfigurableWindow } from '../_configurable'

const defaultEvents: WindowEventName[] = ['mousemove', 'mousedown', 'resize', 'keydown', 'touchstart', 'wheel']
const oneMinute = 60_000

export interface UseIdleOptions extends ConfigurableWindow, ConfigurableEventFilter {
  /**
   * Event names that listen to for detected user activity
   *
   * @default ['mousemove', 'mousedown', 'resize', 'keydown', 'touchstart', 'wheel']
   */
  events?: WindowEventName[]
  /**
   * Listen for document visibility change
   *
   * @default true
   */
  listenForVisibilityChange?: boolean
  /**
   * Initial state of the Accessor idle
   *
   * @default false
   */
  initialState?: boolean
}

export interface UseIdleReturn {
  idle: Accessor<boolean>
  lastActive: Accessor<number>
}

/**
 * Tracks whether the user is being inactive.
 *
 * @param timeout default to 1 minute
 * @param options IdleOptions
 */
export function useIdle(timeout: number = oneMinute, options: UseIdleOptions = {}): UseIdleReturn {
  const {
    initialState = false,
    listenForVisibilityChange = true,
    events = defaultEvents,
    window = defaultWindow,
    eventFilter = throttleFilter(50)
  } = options
  const [idle, setIdle] = createSignal(initialState)
  const [lastActive, setLastActive] = createSignal(timestamp())

  let timer: any

  const onEvent = createFilterWrapper(eventFilter, () => {
    setIdle(false)
    setLastActive(timestamp())
    clearTimeout(timer)
    timer = setTimeout(() => setIdle(true), timeout)
  })

  if (window) {
    const document = window.document
    for (const event of events) useEventListener(window, event, onEvent, { passive: true })

    if (listenForVisibilityChange) {
      useEventListener(document, 'visibilitychange', () => {
        if (!document.hidden) onEvent()
      })
    }
  }

  timer = setTimeout(() => setIdle(true), timeout)

  return { idle, lastActive }
}
