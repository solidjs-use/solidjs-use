/* this implementation is original ported from https://github.com/logaretm/vue-use-web by Abdelrahman Awad */

import { createEffect, createSignal, on } from 'solid-js'
import { resolveAccessor } from '@solidjs-use/shared'
import { toSignal } from '@solidjs-use/shared/solid-to-vue'
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
   * Recreate stream when deviceIds or constraints changed
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
   * @deprecated in favor of constraints
   */
  videoDeviceId?: MaybeAccessor<string | undefined | false | 'none'>
  /**
   * The device id of audi input
   *
   * When passing with `undefined` the default device will be used.
   * Pass `false` or "none" to disabled audi input
   *
   * @default undefined
   * @deprecated in favor of constraints
   */
  audioDeviceId?: MaybeAccessor<string | undefined | false | 'none'>
  /**
   * MediaStreamConstraints to be applied to the requested MediaStream
   * If provided, the constraints will override videoDeviceId and audioDeviceId
   *
   * @default {}
   */
  constraints?: MaybeAccessor<MediaStreamConstraints>
}

/**
 * Reactive `mediaDevices.getUserMedia` streaming
 *
 * @see https://solidjs-use.github.io/solidjs-use/core/useUserMedia
 */
export function useUserMedia(options: UseUserMediaOptions = {}) {
  const [enabled, setEnabled] = createSignal(options.enabled ?? false)
  const [autoSwitch, setAutoSwitch] = createSignal(options.autoSwitch ?? true)
  const videoDeviceId = resolveAccessor(options.videoDeviceId)
  const audioDeviceId = resolveAccessor(options.audioDeviceId)
  const [constraints, setConstraints] = toSignal(options.constraints)
  const { navigator = defaultNavigator } = options
  const isSupported = useSupported(() => navigator?.mediaDevices?.getUserMedia)

  const [stream, setStream] = createSignal<MediaStream | undefined>()

  function getDeviceOptions(type: 'video' | 'audio') {
    const constraintsValue = constraints()
    const videoDeviceIdValue = videoDeviceId()
    const audioDeviceIdValue = audioDeviceId()
    switch (type) {
      case 'video': {
        if (constraintsValue) return constraintsValue.video ?? false
        if (videoDeviceIdValue === 'none' || videoDeviceIdValue === false) return false
        if (videoDeviceIdValue == null) return true
        return { deviceId: videoDeviceIdValue }
      }
      case 'audio': {
        if (constraintsValue) return constraintsValue.audio ?? false
        if (audioDeviceIdValue === 'none' || audioDeviceIdValue === false) return false
        if (audioDeviceIdValue == null) return true
        return { deviceId: audioDeviceIdValue }
      }
    }
  }

  async function _start() {
    if (!isSupported() || stream()) return
    const streamValue = await navigator!.mediaDevices.getUserMedia({
      video: getDeviceOptions('video'),
      audio: getDeviceOptions('audio')
    })
    setStream(streamValue)
    return streamValue
  }

  function _stop() {
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
    on([videoDeviceId, audioDeviceId, constraints] as AccessorArray<string | false | undefined>, () => {
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
    constraints,
    setConstraints,
    enabled,
    setEnabled,
    autoSwitch,
    setAutoSwitch
  }
}

export type UseUserMediaReturn = ReturnType<typeof useUserMedia>
