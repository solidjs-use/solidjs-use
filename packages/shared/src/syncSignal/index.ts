import { watch } from '../watch'
import type { WatchStopHandle } from '../watch'
import type { Signal } from 'solid-js'

export interface SyncSignalOptions<L, R = L> {
  /**
   * Sync values immediately
   */
  defer?: boolean

  /**
   * Direction of syncing. Value will be redefined if you define syncConvertors
   *
   * @default 'both'
   */
  direction?: 'ltr' | 'rtl' | 'both'

  /**
   * Custom transform function
   */
  transform?: {
    ltr?: (left: L) => R
    rtl?: (right: R) => L
  }
}

/**
 * Two-way signal synchronization.
 *
 * @see https://solidjs-use.github.io/solidjs-use/shared/syncSignal
 */
export function syncSignal<L, R = L>(
  [left, setLeft]: Signal<L>,
  [right, setRight]: Signal<R>,
  options: SyncSignalOptions<L, R> = {}
) {
  const { defer, direction = 'both', transform = {} } = options

  let watchLeft: WatchStopHandle
  let watchRight: WatchStopHandle

  const transformLTR = transform.ltr ?? (v => v)
  const transformRTL = transform.rtl ?? (v => v)

  if (direction === 'both' || direction === 'ltr') {
    watchLeft = watch(
      left,
      newValue => {
        setRight(() => transformLTR(newValue) as R)
      },
      { defer }
    )
  }

  if (direction === 'both' || direction === 'rtl') {
    watchRight = watch(
      right,
      newValue => {
        setLeft(() => transformRTL(newValue) as L)
      },
      { defer }
    )
  }

  return () => {
    watchLeft?.()
    watchRight?.()
  }
}
