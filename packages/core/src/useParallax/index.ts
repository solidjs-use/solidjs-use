import { createMemo } from 'solid-js'
import { useDeviceOrientation } from '../useDeviceOrientation'
import { useMouseInElement } from '../useMouseInElement'
import { defaultWindow } from '../_configurable'
import type { Accessor } from 'solid-js'
import type { ConfigurableWindow } from '../_configurable'
import type { MaybeElementAccessor } from '@solidjs-use/shared'

export interface UseParallaxOptions extends ConfigurableWindow {
  deviceOrientationTiltAdjust?: (i: number) => number
  deviceOrientationRollAdjust?: (i: number) => number
  mouseTiltAdjust?: (i: number) => number
  mouseRollAdjust?: (i: number) => number
}

export interface UseParallaxReturn {
  /**
   * Roll value. Scaled to `-0.5 ~ 0.5`
   */
  roll: Accessor<number>
  /**
   * Tilt value. Scaled to `-0.5 ~ 0.5`
   */
  tilt: Accessor<number>
  /**
   * Sensor source, can be `mouse` or `deviceOrientation`
   */
  source: Accessor<'deviceOrientation' | 'mouse'>
}

/**
 * Create parallax effect easily. It uses `useDeviceOrientation` and fallback to `useMouse`
 * if orientation is not supported.
 *
 * @param target
 * @param options
 */
export function useParallax(target: MaybeElementAccessor, options: UseParallaxOptions = {}): UseParallaxReturn {
  const {
    deviceOrientationTiltAdjust = i => i,
    deviceOrientationRollAdjust = i => i,
    mouseTiltAdjust = i => i,
    mouseRollAdjust = i => i,
    window = defaultWindow
  } = options

  const orientation = useDeviceOrientation({ window })
  const {
    elementX: x,
    elementY: y,
    elementWidth: width,
    elementHeight: height
  } = useMouseInElement(target, { handleOutside: false, window })

  const source = createMemo(() => {
    if (
      orientation.isSupported() &&
      ((orientation.alpha() != null && orientation.alpha() !== 0) ||
        (orientation.gamma() != null && orientation.gamma() !== 0))
    )
      return 'deviceOrientation'
    return 'mouse'
  })

  const roll = createMemo(() => {
    if (source() === 'deviceOrientation') {
      const value = -orientation.beta / 90
      return deviceOrientationRollAdjust(value)
    }
    const value = -(y() - height() / 2) / height()
    return mouseRollAdjust(value)
  })

  const tilt = createMemo(() => {
    if (source() === 'deviceOrientation') {
      const value = orientation.gamma()! / 90
      return deviceOrientationTiltAdjust(value)
    }
    const value = (x() - width() / 2) / width()
    return mouseTiltAdjust(value)
  })

  return { roll, tilt, source }
}
