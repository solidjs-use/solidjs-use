import { unAccessor } from '@solidjs-use/shared'
import { useSupported } from '../useSupported'
import { defaultNavigator } from '../_configurable'
import type { MaybeAccessor } from '@solidjs-use/shared'
import type { ConfigurableNavigator } from '../_configurable'

export interface UseShareOptions {
  title?: string
  files?: File[]
  text?: string
  url?: string
}

interface NavigatorWithShare {
  share?: (data: UseShareOptions) => Promise<void>
  canShare?: (data: UseShareOptions) => boolean
}

/**
 * Reactive Web Share API.
 *
 * @see https://solidjs-use.github.io/solidjs-use/core/useShare
 */
export function useShare(shareOptions: MaybeAccessor<UseShareOptions> = {}, options: ConfigurableNavigator = {}) {
  const { navigator = defaultNavigator } = options

  const _navigator = navigator as NavigatorWithShare
  const isSupported = useSupported(() => _navigator && 'canShare' in _navigator)

  const share = async (overrideOptions: MaybeAccessor<UseShareOptions> = {}) => {
    if (isSupported()) {
      const data = {
        ...unAccessor(shareOptions),
        ...unAccessor(overrideOptions)
      }
      let granted = true

      if (data.files && _navigator.canShare) granted = _navigator.canShare({ files: data.files })

      if (granted) return _navigator.share!(data)
    }
  }

  return {
    isSupported,
    share
  }
}

export type UseShareReturn = ReturnType<typeof useShare>
