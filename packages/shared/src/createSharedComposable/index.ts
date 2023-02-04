import { createRoot } from 'solid-js'
import { tryOnCleanup } from '../tryOnCleanup'

/**
 * Make a composable function usable with multiple SolidJS component instances.
 */
export function createSharedComposable<Fn extends (...args: any[]) => any>(composable: Fn): Fn {
  let subscribers = 0
  let state: ReturnType<Fn> | undefined
  let disposer: () => void | undefined

  const dispose = () => {
    subscribers -= 1
    if (disposer && subscribers <= 0) {
      disposer()
      state = undefined
    }
  }

  return <Fn>((...args) => {
    subscribers += 1
    if (!state) {
      createRoot(_disposer => {
        disposer = _disposer
        state = composable(...args)
      })
    }
    tryOnCleanup(dispose)
    return state
  })
}
