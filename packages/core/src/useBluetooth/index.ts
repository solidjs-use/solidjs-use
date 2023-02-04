import { tryOnCleanup, tryOnMount } from '@solidjs-use/shared'
import { createEffect, createMemo, createSignal, on } from 'solid-js'
import { useSupported } from '../useSupported'
import { defaultNavigator } from '../_configurable'
import type { Accessor } from 'solid-js'
import type { ConfigurableNavigator } from '../_configurable'

export interface UseBluetoothRequestDeviceOptions {
  /**
   *
   * An array of BluetoothScanFilters. This filter consists of an array
   * of BluetoothServiceUUIDs, a name parameter, and a namePrefix parameter.
   *
   */
  filters?: BluetoothLEScanFilter[] | undefined
  /**
   *
   * An array of BluetoothServiceUUIDs.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/BluetoothRemoteGATTService/uuid
   *
   */
  optionalServices?: BluetoothServiceUUID[] | undefined
}

export interface UseBluetoothOptions extends UseBluetoothRequestDeviceOptions, ConfigurableNavigator {
  /**
   *
   * A boolean value indicating that the requesting script can accept all Bluetooth
   * devices. The default is false.
   *
   * !! This may result in a bunch of unrelated devices being shown
   * in the chooser and energy being wasted as there are no filters.
   *
   *
   * Use it with caution.
   *
   * @default false
   *
   */
  acceptAllDevices?: boolean
}

export function useBluetooth(options?: UseBluetoothOptions): UseBluetoothReturn {
  let { acceptAllDevices = false } = options ?? {}

  const { filters = undefined, optionalServices = undefined, navigator = defaultNavigator } = options ?? {}

  const isSupported = useSupported(() => navigator && 'bluetooth' in navigator)

  const [device, setDevice] = createSignal<undefined | BluetoothDevice>(undefined)
  const [error, setError] = createSignal<unknown | null>(null)
  const [server, setServer] = createSignal<undefined | BluetoothRemoteGATTServer>()

  createEffect(
    on(
      device,
      () => {
        connectToBluetoothGATTServer()
      },
      { defer: true }
    )
  )

  async function requestDevice(): Promise<void> {
    // This is the function can only be called if Bluetooth API is supported:
    if (!isSupported()) return

    // Reset any errors we currently have:
    setError(null)

    // If filters specified, we need to ensure we  don't accept all devices:
    if (filters && filters.length > 0) acceptAllDevices = false

    try {
      const deviceVal = await navigator?.bluetooth.requestDevice({
        acceptAllDevices,
        filters,
        optionalServices
      })
      setDevice(deviceVal)
    } catch (err) {
      setError(err)
    }
  }

  const isConnected = createMemo((): boolean => {
    return server()?.connected ?? false
  })

  async function connectToBluetoothGATTServer() {
    // Reset any errors we currently have:
    setError(null)

    const deviceVal = device()
    if (deviceVal?.gatt) {
      // Add callback to gattserverdisconnected event:
      deviceVal?.addEventListener('gattserverdisconnected', () => {})

      try {
        // Connect to the device:
        setServer(await deviceVal.gatt.connect())
      } catch (err) {
        setError(err)
      }
    }
  }

  tryOnMount(() => {
    const deviceVal = device()
    if (deviceVal) deviceVal.gatt?.connect()
  })

  tryOnCleanup(() => {
    const deviceVal = device()
    if (deviceVal) deviceVal.gatt?.disconnect()
  })

  return {
    isSupported,
    isConnected,
    // Device:
    device,
    requestDevice,
    // Server:
    server,
    // Errors:
    error
  }
}

export interface UseBluetoothReturn {
  isSupported: Accessor<boolean>
  isConnected: Accessor<boolean>
  device: Accessor<BluetoothDevice | undefined>
  requestDevice: () => Promise<void>
  server: Accessor<BluetoothRemoteGATTServer | undefined>
  error: Accessor<unknown | null>
}
