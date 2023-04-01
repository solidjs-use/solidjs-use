/* this implementation is original ported from https://github.com/logaretm/vue-use-web by Abdelrahman Awad */

import { createSignal } from 'solid-js'
import { useEventListener } from '../useEventListener'
import { useSupported } from '../useSupported'
import { defaultWindow } from '../_configurable'
import type { Accessor } from 'solid-js'
import type { ConfigurableWindow } from '../_configurable'

export type NetworkType = 'bluetooth' | 'cellular' | 'ethernet' | 'none' | 'wifi' | 'wimax' | 'other' | 'unknown'

export type NetworkEffectiveType = 'slow-2g' | '2g' | '3g' | '4g' | undefined

export interface NetworkState {
  isSupported: Accessor<boolean>
  /**
   * If the user is currently connected.
   */
  isOnline: Accessor<boolean>
  /**
   * The time since the user was last connected.
   */
  offlineAt: Accessor<number | undefined>
  /**
   * At this time, if the user is offline and reconnects
   */
  onlineAt: Accessor<number | undefined>
  /**
   * The download speed in Mbps.
   */
  downlink: Accessor<number | undefined>
  /**
   * The max reachable download speed in Mbps.
   */
  downlinkMax: Accessor<number | undefined>
  /**
   * The detected effective speed type.
   */
  effectiveType: Accessor<NetworkEffectiveType | undefined>
  /**
   * The estimated effective round-trip time of the current connection.
   */
  rtt: Accessor<number | undefined>
  /**
   * If the user activated data saver mode.
   */
  saveData: Accessor<boolean | undefined>
  /**
   * The detected connection/network type.
   */
  type: Accessor<NetworkType>
}

/**
 * Reactive Network status.
 *
 * @see https://solidjs-use.github.io/solidjs-use/core/useNetwork
 */
export function useNetwork(options: ConfigurableWindow = {}): Readonly<NetworkState> {
  const { window = defaultWindow } = options
  const navigator = window?.navigator
  const isSupported = useSupported(() => navigator && 'connection' in navigator)

  const [isOnline, setIsOnline] = createSignal(true)
  const [saveData, setSaveData] = createSignal(false)
  const [offlineAt, setOfflineAt] = createSignal<number | undefined>(undefined)
  const [onlineAt, setOnlineAt] = createSignal<number | undefined>(undefined)
  const [downlink, setDownlink] = createSignal<number | undefined>(undefined)
  const [downlinkMax, setDownlinkMax] = createSignal<number | undefined>(undefined)
  const [rtt, setRtt] = createSignal<number | undefined>(undefined)
  const [effectiveType, setEffectiveType] = createSignal<NetworkEffectiveType>(undefined)
  const [type, setType] = createSignal<NetworkType>('unknown')

  const connection = isSupported() && (navigator as any).connection

  function updateNetworkInformation() {
    if (!navigator) return

    setIsOnline(navigator.onLine)
    setOfflineAt(isOnline() ? undefined : Date.now())
    setOnlineAt(isOnline() ? Date.now() : undefined)

    if (connection) {
      setDownlink(connection.downlink)
      setDownlinkMax(connection.downlinkMax)
      setEffectiveType(connection.effectiveType)
      setRtt(connection.rtt)
      setSaveData(connection.saveData)
      setType(connection.type)
    }
  }

  if (window) {
    useEventListener(window, 'offline', () => {
      setIsOnline(false)
      setOfflineAt(Date.now())
    })

    useEventListener(window, 'online', () => {
      setIsOnline(true)
      setOnlineAt(Date.now())
    })
  }

  if (connection) useEventListener(connection, 'change', updateNetworkInformation, false)

  updateNetworkInformation()

  return {
    isSupported,
    isOnline,
    saveData,
    offlineAt,
    onlineAt,
    downlink,
    downlinkMax,
    effectiveType,
    rtt,
    type
  }
}

export type UseNetworkReturn = ReturnType<typeof useNetwork>
