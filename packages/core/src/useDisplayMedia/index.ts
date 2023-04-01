import { toSignal } from '@solidjs-use/shared/solid-to-vue'
import { createEffect, createSignal, on } from 'solid-js'
import { useSupported } from '../useSupported'
import { defaultNavigator } from '../_configurable'
import type { ConfigurableNavigator } from '../_configurable'
import type { MaybeSignal } from '@solidjs-use/shared'

export interface UseDisplayMediaOptions extends ConfigurableNavigator {
  /**
   * If the stream is enabled
   * @default false
   */
  enabled?: MaybeSignal<boolean>

  /**
   * If the stream video media constraints
   */
  video?: boolean | MediaTrackConstraints | undefined
  /**
   * If the stream audio media constraints
   */
  audio?: boolean | MediaTrackConstraints | undefined
}

/**
 * Reactive `mediaDevices.getDisplayMedia` streaming.
 *
 * @see https://solidjs-use.github.io/solidjs-use/core/useDisplayMedia
 */
export function useDisplayMedia(options: UseDisplayMediaOptions = {}) {
  const [enabled, setEnabled] = toSignal(options.enabled ?? false)
  const video = options.video
  const audio = options.audio
  const { navigator = defaultNavigator } = options
  const isSupported = useSupported(() => navigator?.mediaDevices?.getDisplayMedia)

  // eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error
  // @ts-ignore Type mismatch in different version of TS
  const constraint: MediaStreamConstraints = { audio, video }

  const [stream, setStream] = createSignal<MediaStream | undefined>()

  async function _start() {
    if (!isSupported() || stream()) return
    const streamVal = await navigator!.mediaDevices.getDisplayMedia(constraint)
    setStream(streamVal)
    return streamVal
  }

  async function _stop() {
    stream()
      ?.getTracks()
      .forEach(t => t.stop())
    setStream(undefined)
  }

  function stop() {
    _stop()
    setEnabled(false)
  }

  async function start() {
    await _start()
    if (stream()) setEnabled(true)
    return stream()
  }

  createEffect(
    on(enabled, v => {
      if (v) _start()
      else _stop()
    })
  )

  return {
    isSupported,
    stream,
    start,
    stop,
    enabled,
    setEnabled
  }
}

export type UseDisplayMediaReturn = ReturnType<typeof useDisplayMedia>
