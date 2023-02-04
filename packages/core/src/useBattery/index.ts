import { createSignal, getOwner, runWithOwner } from 'solid-js'
import { useEventListener } from '../useEventListener'
import { useSupported } from '../useSupported'
import { defaultNavigator } from '../_configurable'
import type { ConfigurableNavigator } from '../_configurable'

export interface BatteryManager extends EventTarget {
  charging: boolean
  chargingTime: number
  dischargingTime: number
  level: number
}

type NavigatorWithBattery = Navigator & {
  getBattery: () => Promise<BatteryManager>
}

/**
 * Reactive Battery Status API.
 */
export function useBattery({ navigator = defaultNavigator }: ConfigurableNavigator = {}) {
  const events = ['chargingchange', 'chargingtimechange', 'dischargingtimechange', 'levelchange']

  const isSupported = useSupported(() => navigator && 'getBattery' in navigator)

  const [charging, setCharging] = createSignal(false)
  const [chargingTime, setChargingTime] = createSignal(0)
  const [dischargingTime, setDischargingTime] = createSignal(0)
  const [level, setLevel] = createSignal(1)

  let battery: BatteryManager | null

  function updateBatteryInfo(this: BatteryManager) {
    setCharging(this.charging)
    setChargingTime(this.chargingTime || 0)
    setDischargingTime(this.dischargingTime || 0)
    setLevel(this.level)
  }

  const owner = getOwner()!
  if (isSupported()) {
    ;(navigator as NavigatorWithBattery).getBattery().then(_battery => {
      battery = _battery
      updateBatteryInfo.call(battery)
      for (const event of events) {
        runWithOwner(owner, () => {
          useEventListener(battery, event, updateBatteryInfo, { passive: true })
        })
      }
    })
  }

  return {
    isSupported,
    charging,
    chargingTime,
    dischargingTime,
    level
  }
}

export type UseBatteryReturn = ReturnType<typeof useBattery>
