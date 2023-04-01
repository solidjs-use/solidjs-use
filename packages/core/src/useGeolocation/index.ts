/* this implementation is original ported from https://github.com/logaretm/vue-use-web by Abdelrahman Awad */

import { tryOnCleanup } from '@solidjs-use/shared'
import { createSignal } from 'solid-js'
import { useSupported } from '../useSupported'
import { defaultNavigator } from '../_configurable'
import type { ConfigurableNavigator } from '../_configurable'

export interface UseGeolocationOptions extends Partial<PositionOptions>, ConfigurableNavigator {
  immediate?: boolean
}

/**
 * Reactive Geolocation API.
 *
 * @see https://solidjs-use.github.io/solidjs-use/core/useGeolocation
 */
export function useGeolocation(options: UseGeolocationOptions = {}) {
  const {
    enableHighAccuracy = true,
    maximumAge = 30000,
    timeout = 27000,
    navigator = defaultNavigator,
    immediate = true
  } = options

  const isSupported = useSupported(() => navigator && 'geolocation' in navigator)

  const [locatedAt, setLocatedAt] = createSignal<number | null>(null)
  const [error, setError] = createSignal<GeolocationPositionError | null>(null)
  const [coords, setCoords] = createSignal<GeolocationPosition['coords']>({
    accuracy: 0,
    latitude: Infinity,
    longitude: Infinity,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    speed: null
  })

  function updatePosition(position: GeolocationPosition) {
    setLocatedAt(position.timestamp)
    setCoords(position.coords)
    setError(null)
  }

  let watcher: number

  function resume() {
    if (isSupported()) {
      watcher = navigator!.geolocation.watchPosition(updatePosition, err => setError(err), {
        enableHighAccuracy,
        maximumAge,
        timeout
      })
    }
  }
  if (immediate) resume()

  function pause() {
    if (watcher && navigator) navigator.geolocation.clearWatch(watcher)
  }

  tryOnCleanup(() => {
    pause()
  })

  return {
    isSupported,
    coords,
    locatedAt,
    error,
    resume,
    pause
  }
}

export type UseGeolocationReturn = ReturnType<typeof useGeolocation>
