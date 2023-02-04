/* this implementation is original ported from https://github.com/logaretm/vue-use-web by Abdelrahman Awad */

import { createMemo, createSignal } from 'solid-js'
import { useEventListener } from '../useEventListener'
import { usePermission } from '../usePermission'
import { useSupported } from '../useSupported'
import { defaultNavigator } from '../_configurable'
import type { Accessor } from 'solid-js'
import type { ConfigurableNavigator } from '../_configurable'

export interface UseDevicesListOptions extends ConfigurableNavigator {
  onUpdated?: (devices: MediaDeviceInfo[]) => void
  /**
   * Request for permissions immediately if it's not granted,
   * otherwise label and deviceIds could be empty
   *
   * @default false
   */
  requestPermissions?: boolean
  /**
   * Request for types of media permissions
   *
   * @default { audio: true, video: true }
   */
  constraints?: MediaStreamConstraints
}

export interface UseDevicesListReturn {
  /**
   * All devices
   */
  devices: Accessor<MediaDeviceInfo[]>
  videoInputs: Accessor<MediaDeviceInfo[]>
  audioInputs: Accessor<MediaDeviceInfo[]>
  audioOutputs: Accessor<MediaDeviceInfo[]>
  permissionGranted: Accessor<boolean>
  ensurePermissions: () => Promise<boolean>
  isSupported: Accessor<boolean>
}

/**
 * Reactive `enumerateDevices` listing available input/output devices
 */
export function useDevicesList(options: UseDevicesListOptions = {}): UseDevicesListReturn {
  const {
    navigator = defaultNavigator,
    requestPermissions = false,
    constraints = { audio: true, video: true },
    onUpdated
  } = options

  const [devices, setDevices] = createSignal<MediaDeviceInfo[]>([])
  const [permissionGranted, setPermissionGranted] = createSignal<boolean>(false)
  const videoInputs = createMemo(() => devices().filter(i => i.kind === 'videoinput'))
  const audioInputs = createMemo(() => devices().filter(i => i.kind === 'audioinput'))
  const audioOutputs = createMemo(() => devices().filter(i => i.kind === 'audiooutput'))
  const isSupported = useSupported(() => navigator?.mediaDevices?.enumerateDevices)

  async function update() {
    if (!isSupported()) return

    const devicesValue = await navigator!.mediaDevices.enumerateDevices()
    setDevices(devicesValue)
    onUpdated?.(devicesValue)
  }

  async function ensurePermissions() {
    if (!isSupported()) return false

    if (permissionGranted()) return true

    const { state, query } = usePermission('camera', { controls: true })
    await query()
    if (state() !== 'granted') {
      const stream = await navigator!.mediaDevices.getUserMedia(constraints)
      stream.getTracks().forEach(t => t.stop())
      update()
      setPermissionGranted(true)
    } else {
      setPermissionGranted(true)
    }

    return permissionGranted()
  }

  if (isSupported()) {
    if (requestPermissions) ensurePermissions()

    useEventListener(navigator!.mediaDevices, 'devicechange', update)
    update()
  }

  return {
    devices,
    ensurePermissions,
    permissionGranted,
    videoInputs,
    audioInputs,
    audioOutputs,
    isSupported
  }
}
