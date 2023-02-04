import { createSingletonPromise } from '@solidjs-use/shared'
import { createSignal, getOwner, runWithOwner } from 'solid-js'
import { useEventListener } from '../useEventListener'
import { useSupported } from '../useSupported'
import { defaultNavigator } from '../_configurable'
import type { Accessor } from 'solid-js'
import type { ConfigurableNavigator } from '../_configurable'

type DescriptorNamePolyfill =
  | 'accelerometer'
  | 'accessibility-events'
  | 'ambient-light-sensor'
  | 'background-sync'
  | 'camera'
  | 'clipboard-read'
  | 'clipboard-write'
  | 'gyroscope'
  | 'magnetometer'
  | 'microphone'
  | 'notifications'
  | 'payment-handler'
  | 'persistent-storage'
  | 'push'
  | 'speaker'

export type GeneralPermissionDescriptor = PermissionDescriptor | { name: DescriptorNamePolyfill }

export interface UsePermissionOptions<Controls extends boolean> extends ConfigurableNavigator {
  /**
   * Expose more controls
   *
   * @default false
   */
  controls?: Controls
}

export type UsePermissionReturn = Accessor<PermissionState | undefined>
export interface UsePermissionReturnWithControls {
  state: UsePermissionReturn
  isSupported: Accessor<boolean>
  query: () => Promise<PermissionStatus | undefined>
}

/**
 * Reactive Permissions API.
 */
export function usePermission(
  permissionDesc: GeneralPermissionDescriptor | GeneralPermissionDescriptor['name'],
  options?: UsePermissionOptions<false>
): UsePermissionReturn
export function usePermission(
  permissionDesc: GeneralPermissionDescriptor | GeneralPermissionDescriptor['name'],
  options: UsePermissionOptions<true>
): UsePermissionReturnWithControls
export function usePermission(
  permissionDesc: GeneralPermissionDescriptor | GeneralPermissionDescriptor['name'],
  options: UsePermissionOptions<boolean> = {}
): UsePermissionReturn | UsePermissionReturnWithControls {
  const { controls = false, navigator = defaultNavigator } = options

  const isSupported = useSupported(() => navigator && 'permissions' in navigator)
  let permissionStatus: PermissionStatus | undefined

  const desc =
    typeof permissionDesc === 'string'
      ? ({ name: permissionDesc } as PermissionDescriptor)
      : (permissionDesc as PermissionDescriptor)
  const [state, setState] = createSignal<PermissionState | undefined>()

  const onChange = () => {
    if (permissionStatus) setState(permissionStatus.state)
  }

  const owner = getOwner()!
  const query = createSingletonPromise(async () => {
    if (!isSupported()) return
    if (!permissionStatus) {
      try {
        permissionStatus = await navigator!.permissions.query(desc)
        runWithOwner(owner, () => {
          useEventListener(permissionStatus, 'change', onChange)
        })
        onChange()
      } catch {
        setState('prompt')
      }
    }
    return permissionStatus
  })

  query()

  if (controls) {
    return {
      state,
      isSupported,
      query
    }
  }
  return state
}
