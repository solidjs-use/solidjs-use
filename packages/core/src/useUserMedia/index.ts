/* this implementation is original ported from https://github.com/logaretm/vue-use-web by Abdelrahman Awad */

import { createEffect, createSignal, on } from 'solid-js'
import { resolveAccessor } from '@solidjs-use/shared'
import { useSupported } from '../useSupported'
import { defaultNavigator } from '../_configurable'
import type { MaybeAccessor } from '@solidjs-use/shared'
import type { AccessorArray } from 'solid-js/types/reactive/signal'
import type { ConfigurableNavigator } from '../_configurable'

export interface UseUserMediaOptions extends ConfigurableNavigator {
  /**
   * If the stream is enabled
   * @default false
   */
  enabled?: MaybeAccessor<boolean>
  /**
   * Recreate stream when the input devices id changed
   *
   * @default true
   */
  autoSwitch?: MaybeAccessor<boolean>
  /**
   * The device id of video input
   *
   * When passing with `undefined` the default device will be used.
   * Pass `false` or "none" to disabled video input
   *
   * @default undefined
   */
  videoDeviceId?: MaybeAccessor<string | undefined | false | 'none'>
  /**
   * The device id of audi input
   *
   * When passing with `undefined` the default device will be used.
   * Pass `false` or "none" to disabled audi input
   *
   * @default undefined
   */
  audioDeviceId?: MaybeAccessor<string | undefined | false | 'none'>
}

/**
 * Reactive `mediaDevices.getUserMedia` streaming
 */
export function useUserMedia(options: UseUserMediaOptions = {}) {
  const [enabled, setEnabled] = createSignal(options.enabled ?? false)
  const [autoSwitch, setAutoSwitch] = createSignal(options.autoSwitch ?? true)
  const videoDeviceId = resolveAccessor(options.videoDeviceId)
  const audioDeviceId = resolveAccessor(options.audioDeviceId)
  const { navigator = defaultNavigator } = options
  const isSupported = useSupported(() => navigator?.mediaDevices?.getUserMedia)

  const [stream, setStream] = createSignal<MediaStream | undefined>()

  function getDeviceOptions(device: string | undefined | false | 'none') {
    if (device === 'none' || device === false) return false
    if (device == null) return true
    return {
      deviceId: device
    }
  }

  async function _start() {
    if (!isSupported() || stream()) return
    const streamValue = await navigator!.mediaDevices.getUserMedia({
      video: getDeviceOptions(videoDeviceId()),
      audio: getDeviceOptions(audioDeviceId())
    })
    setStream(streamValue)
    return streamValue
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

  async function restart() {
    _stop()
    return start()
  }

  createEffect(
    on(enabled, v => {
      if (v) _start()
      else _stop()
    })
  )
  createEffect(
    on([videoDeviceId, audioDeviceId] as AccessorArray<string | false | undefined>, () => {
      if (autoSwitch() && stream()) restart()
    })
  )

  return {
    isSupported,
    stream,
    start,
    stop,
    restart,
    videoDeviceId,
    audioDeviceId,
    enabled,
    setEnabled,
    autoSwitch,
    setAutoSwitch
  }
}

export type UseUserMediaReturn = ReturnType<typeof useUserMedia>
