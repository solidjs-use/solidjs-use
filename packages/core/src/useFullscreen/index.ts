/* this implementation is original ported from https://github.com/logaretm/vue-use-web by Abdelrahman Awad */

import { tryOnCleanup, unAccessor } from '@solidjs-use/shared'
import { createSignal } from 'solid-js'
import { useEventListener } from '../useEventListener'
import { useSupported } from '../useSupported'
import { defaultDocument } from '../_configurable'
import type { MaybeElementAccessor } from '@solidjs-use/shared'
import type { ConfigurableDocument } from '../_configurable'

type FunctionMap = [
  'requestFullscreen',
  'exitFullscreen',
  'fullscreenElement',
  'fullscreenEnabled',
  'fullscreenchange',
  'fullscreenerror'
]

// from: https://github.com/sindresorhus/screenfull.js/blob/master/src/screenfull.js
const functionsMap: FunctionMap[] = [
  [
    'requestFullscreen',
    'exitFullscreen',
    'fullscreenElement',
    'fullscreenEnabled',
    'fullscreenchange',
    'fullscreenerror'
  ],
  // New WebKit
  [
    'webkitRequestFullscreen',
    'webkitExitFullscreen',
    'webkitFullscreenElement',
    'webkitFullscreenEnabled',
    'webkitfullscreenchange',
    'webkitfullscreenerror'
  ],
  // Old WebKit
  [
    'webkitRequestFullScreen',
    'webkitCancelFullScreen',
    'webkitCurrentFullScreenElement',
    'webkitCancelFullScreen',
    'webkitfullscreenchange',
    'webkitfullscreenerror'
  ],
  [
    'mozRequestFullScreen',
    'mozCancelFullScreen',
    'mozFullScreenElement',
    'mozFullScreenEnabled',
    'mozfullscreenchange',
    'mozfullscreenerror'
  ],
  [
    'msRequestFullscreen',
    'msExitFullscreen',
    'msFullscreenElement',
    'msFullscreenEnabled',
    'MSFullscreenChange',
    'MSFullscreenError'
  ]
] as any

export interface UseFullscreenOptions extends ConfigurableDocument {
  /**
   * Automatically exit fullscreen when component is unmounted
   *
   * @default false
   */
  autoExit?: boolean
}

/**
 * Reactive Fullscreen API.
 */
export function useFullscreen(target?: MaybeElementAccessor, options: UseFullscreenOptions = {}) {
  const { document = defaultDocument, autoExit = false } = options
  const targetRef = target ?? document?.querySelector('html')
  const [isFullscreen, setIsFullscreen] = createSignal(false)
  let map: FunctionMap = functionsMap[0]

  const isSupported = useSupported(() => {
    if (!document) {
      return false
    }
    for (const m of functionsMap) {
      if (m[1] in document) {
        map = m
        return true
      }
    }

    return false
  })

  const [REQUEST, EXIT, ELEMENT, , EVENT] = map

  async function exit() {
    if (!isSupported()) return
    if (document?.[ELEMENT]) await document[EXIT]()

    setIsFullscreen(false)
  }

  async function enter() {
    if (!isSupported()) return

    await exit()

    const target = unAccessor(targetRef)
    if (target) {
      await target[REQUEST]()
      setIsFullscreen(true)
    }
  }

  async function toggle() {
    if (isFullscreen()) await exit()
    else await enter()
  }

  if (document) {
    useEventListener(
      document,
      EVENT,
      () => {
        setIsFullscreen(!!document?.[ELEMENT])
      },
      false
    )
  }

  if (autoExit) tryOnCleanup(exit)

  return {
    isSupported,
    isFullscreen,
    enter,
    exit,
    toggle
  }
}

export type UseFullscreenReturn = ReturnType<typeof useFullscreen>
