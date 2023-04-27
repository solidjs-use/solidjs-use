/* this implementation is original ported from https://github.com/logaretm/vue-use-web by Abdelrahman Awad */

import { tryOnCleanup, toValue } from '@solidjs-use/shared'
import { createMemo, createSignal } from 'solid-js'
import { useEventListener } from '../useEventListener'
import { useSupported } from '../useSupported'
import { defaultDocument } from '../_configurable'
import type { MaybeElementAccessor } from '@solidjs-use/shared'
import type { ConfigurableDocument } from '../_configurable'

export interface UseFullscreenOptions extends ConfigurableDocument {
  /**
   * Automatically exit fullscreen when component is unmounted
   *
   * @default false
   */
  autoExit?: boolean
}

const eventHandlers = [
  'fullscreenchange',
  'webkitfullscreenchange',
  'webkitendfullscreen',
  'mozfullscreenchange',
  'MSFullscreenChange'
] as any as Array<'fullscreenchange'>

/**
 * Reactive Fullscreen API.
 *
 * @see https://solidjs-use.github.io/solidjs-use/core/useFullscreen
 */
export function useFullscreen(target?: MaybeElementAccessor, options: UseFullscreenOptions = {}) {
  const { document = defaultDocument, autoExit = false } = options

  const targetAccessor = createMemo(() => toValue(target) ?? document?.querySelector('html'))
  const [isFullscreen, setIsFullscreen] = createSignal(false)

  const requestMethod = createMemo<'requestFullscreen' | undefined>(() => {
    return [
      'requestFullscreen',
      'webkitRequestFullscreen',
      'webkitEnterFullscreen',
      'webkitEnterFullScreen',
      'webkitRequestFullScreen',
      'mozRequestFullScreen',
      'msRequestFullscreen'
    ].find(m => (document && m in document) || (targetAccessor() && m in targetAccessor()!)) as any
  })

  const exitMethod = createMemo<'exitFullscreen' | undefined>(() => {
    return [
      'exitFullscreen',
      'webkitExitFullscreen',
      'webkitExitFullScreen',
      'webkitCancelFullScreen',
      'mozCancelFullScreen',
      'msExitFullscreen'
    ].find(m => (document && m in document) || (targetAccessor() && m in targetAccessor()!)) as any
  })

  const fullscreenEnabled = createMemo<'fullscreenEnabled' | undefined>(() => {
    return [
      'fullScreen',
      'webkitIsFullScreen',
      'webkitDisplayingFullscreen',
      'mozFullScreen',
      'msFullscreenElement'
    ].find(m => (document && m in document) || (targetAccessor() && m in targetAccessor()!)) as any
  })

  const fullscreenElementMethod = [
    'fullscreenElement',
    'webkitFullscreenElement',
    'mozFullScreenElement',
    'msFullscreenElement'
  ].find(m => document && m in document) as 'fullscreenElement' | undefined

  const isSupported = useSupported(
    () =>
      targetAccessor() &&
      document &&
      requestMethod() !== undefined &&
      exitMethod() !== undefined &&
      fullscreenEnabled() !== undefined
  )

  const isCurrentElementFullScreen = (): boolean => {
    if (fullscreenElementMethod) return document?.[fullscreenElementMethod] === targetAccessor()
    return false
  }

  const isElementFullScreen = (): boolean => {
    const fullscreenEnabledValue = fullscreenEnabled()
    if (fullscreenEnabledValue) {
      if (document?.[fullscreenEnabledValue] != null) {
        return document[fullscreenEnabledValue]
      }

      const target = targetAccessor()
      // @ts-expect-error - Fallback for WebKit and iOS Safari browsers
      if (target?.[fullscreenEnabledValue] != null) {
        // @ts-expect-error - Fallback for WebKit and iOS Safari browsers
        return Boolean(target[fullscreenEnabledValue])
      }
    }
    return false
  }

  async function exit() {
    if (!isSupported()) return
    const exitMethodValue = exitMethod()
    if (exitMethodValue) {
      if (document?.[exitMethodValue] != null) {
        await document[exitMethodValue]()
      } else {
        const target = targetAccessor()
        // @ts-expect-error - Fallback for Safari iOS
        if (target?.[exitMethodValue] != null)
          // @ts-expect-error - Fallback for Safari iOS
          await target[exitMethodValue]()
      }
    }

    setIsFullscreen(false)
  }

  async function enter() {
    if (!isSupported()) return

    if (isElementFullScreen()) await exit()

    const target = targetAccessor()
    const requestMethodValue = requestMethod()
    if (requestMethodValue && target?.[requestMethodValue] != null) {
      await target[requestMethodValue]()
      setIsFullscreen(true)
    }
  }

  async function toggle() {
    await (isFullscreen() ? exit() : enter())
  }

  const handlerCallback = () => {
    const isElementFullScreenValue = isElementFullScreen()
    if (!isElementFullScreenValue || (isElementFullScreenValue && isCurrentElementFullScreen()))
      setIsFullscreen(isElementFullScreenValue)
  }

  useEventListener(document, eventHandlers, handlerCallback, false)
  useEventListener(() => toValue(targetAccessor), eventHandlers, handlerCallback, false)

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
