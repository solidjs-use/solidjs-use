/* this implementation is original ported from https://github.com/logaretm/vue-use-web by Abdelrahman Awad */

import { bypassFilter, createFilterWrapper } from '@solidjs-use/shared'
import { createSignal } from 'solid-js'
import { useEventListener } from '../useEventListener'
import { defaultWindow } from '../_configurable'
import type { ConfigurableEventFilter } from '@solidjs-use/shared'
import type { ConfigurableWindow } from '../_configurable'

export interface DeviceMotionOptions extends ConfigurableWindow, ConfigurableEventFilter {}

/**
 * Reactive DeviceMotionEvent.
 *
 * @see https://solidjs-use.github.io/solidjs-use/core/useDeviceMotion
 */
export function useDeviceMotion(options: DeviceMotionOptions = {}) {
  const { window = defaultWindow, eventFilter = bypassFilter } = options

  const [acceleration, setAcceleration] = createSignal<DeviceMotionEvent['acceleration']>({ x: null, y: null, z: null })
  const [rotationRate, setRotationRate] = createSignal<DeviceMotionEvent['rotationRate']>({
    alpha: null,
    beta: null,
    gamma: null
  })
  const [interval, setInterval] = createSignal(0)
  const [accelerationIncludingGravity, setAccelerationIncludingGravity] = createSignal<
    DeviceMotionEvent['accelerationIncludingGravity']
  >({
    x: null,
    y: null,
    z: null
  })

  if (window) {
    const onDeviceMotion = createFilterWrapper(eventFilter, (event: DeviceMotionEvent) => {
      setAcceleration(event.acceleration)
      setRotationRate(event.rotationRate)
      setInterval(event.interval)
      setAccelerationIncludingGravity(event.accelerationIncludingGravity)
    })

    useEventListener(window, 'devicemotion', onDeviceMotion)
  }

  return {
    acceleration,
    accelerationIncludingGravity,
    rotationRate,
    interval
  }
}

export type UseDeviceMotionReturn = ReturnType<typeof useDeviceMotion>
