import { createEventHook, tryOnMount } from '@solidjs-use/shared'
import { createMemo, createSignal } from 'solid-js'
import { useEventListener } from '../useEventListener'
import { useRafFn } from '../useRafFn'
import { useSupported } from '../useSupported'
import { defaultNavigator } from '../_configurable'
import type { Accessor } from 'solid-js'
import type { ConfigurableNavigator, ConfigurableWindow } from '../_configurable'

export interface UseGamepadOptions extends ConfigurableWindow, ConfigurableNavigator {}

/**
 * Maps a standard standard gamepad to an Xbox 360 Controller.
 */
export function mapGamepadToXbox360Controller(gamepad: Accessor<Gamepad | undefined>) {
  return createMemo(() => {
    const gamepadVal = gamepad()
    if (gamepadVal) {
      return {
        buttons: {
          a: gamepadVal.buttons[0],
          b: gamepadVal.buttons[1],
          x: gamepadVal.buttons[2],
          y: gamepadVal.buttons[3]
        },
        bumper: {
          left: gamepadVal.buttons[4],
          right: gamepadVal.buttons[5]
        },
        triggers: {
          left: gamepadVal.buttons[6],
          right: gamepadVal.buttons[7]
        },
        stick: {
          left: {
            horizontal: gamepadVal.axes[0],
            vertical: gamepadVal.axes[1],
            button: gamepadVal.buttons[10]
          },
          right: {
            horizontal: gamepadVal.axes[2],
            vertical: gamepadVal.axes[3],
            button: gamepadVal.buttons[11]
          }
        },
        dpad: {
          up: gamepadVal.buttons[12],
          down: gamepadVal.buttons[13],
          left: gamepadVal.buttons[14],
          right: gamepadVal.buttons[15]
        },
        back: gamepadVal.buttons[8],
        start: gamepadVal.buttons[9]
      }
    }

    return null
  })
}

export function useGamepad(options: UseGamepadOptions = {}) {
  const { navigator = defaultNavigator } = options
  const isSupported = useSupported(() => navigator && 'getGamepads' in navigator)
  const [gamepads, setGamepads] = createSignal<Gamepad[]>([])

  const onConnectedHook = createEventHook<number>()
  const onDisconnectedHook = createEventHook<number>()

  const stateFromGamepad = (gamepad: Gamepad) => {
    const hapticActuators: any[] = []
    const vibrationActuator: any = 'vibrationActuator' in gamepad ? (gamepad as any).vibrationActuator : null

    if (vibrationActuator) hapticActuators.push(vibrationActuator)

    if (gamepad.hapticActuators) hapticActuators.push(...gamepad.hapticActuators)

    return {
      id: gamepad.id,
      hapticActuators,
      index: gamepad.index,
      mapping: gamepad.mapping,
      connected: gamepad.connected,
      timestamp: gamepad.timestamp,
      axes: gamepad.axes.map(axes => axes),
      buttons: gamepad.buttons.map(button => ({
        pressed: button.pressed,
        touched: button.touched,
        value: button.value
      }))
    }
  }

  const updateGamepadState = () => {
    const _gamepads = navigator?.getGamepads() ?? []

    for (let i = 0; i < _gamepads.length; ++i) {
      const gamepad = _gamepads[i]
      if (gamepad) {
        const index = gamepads().findIndex(({ index }) => index === gamepad.index)

        if (index > -1) gamepads()[index] = stateFromGamepad(gamepad)
      }
    }
  }

  const { isActive, pause, resume } = useRafFn(updateGamepadState)

  const onGamepadConnected = (gamepad: Gamepad) => {
    if (!gamepads().some(({ index }) => index === gamepad.index)) {
      setGamepads(gamepads => [...gamepads, stateFromGamepad(gamepad)])
      onConnectedHook.trigger(gamepad.index)
    }

    resume()
  }

  const onGamepadDisconnected = (gamepad: Gamepad) => {
    setGamepads(gamepads().filter(x => x.index !== gamepad.index))
    onDisconnectedHook.trigger(gamepad.index)
  }

  useEventListener('gamepadconnected', e => onGamepadConnected(e.gamepad))
  useEventListener('gamepaddisconnected', e => onGamepadDisconnected(e.gamepad))

  tryOnMount(() => {
    const _gamepads = navigator?.getGamepads() ?? []

    if (_gamepads) {
      for (let i = 0; i < _gamepads.length; ++i) {
        const gamepad = _gamepads[i]

        if (gamepad) onGamepadConnected(gamepad)
      }
    }
  })

  pause()

  return {
    isSupported,
    onConnected: onConnectedHook.on,
    onDisconnected: onDisconnectedHook.on,
    gamepads,
    pause,
    resume,
    isActive
  }
}

export type UseGamepadReturn = ReturnType<typeof useGamepad>
