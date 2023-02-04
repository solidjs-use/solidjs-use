import { createSignal } from 'solid-js'
import { tryOnCleanup } from '../tryOnCleanup'
import { type UseTimeoutFnOptions, useTimeoutFn } from '../useTimeoutFn'
import type { Awaitable, MaybeAccessor, Pausable } from '../utils'

export function useTimeoutPoll(
  fn: () => Awaitable<void>,
  interval: MaybeAccessor<number>,
  timeoutPollOptions?: UseTimeoutFnOptions
): Pausable {
  const { start } = useTimeoutFn(loop, interval)

  const [isActive, setIsActive] = createSignal(false)

  async function loop() {
    if (!isActive()) return

    await fn()
    start()
  }

  function resume() {
    if (!isActive()) {
      setIsActive(true)
      loop()
    }
  }

  function pause() {
    setIsActive(false)
  }

  if (timeoutPollOptions?.immediate) resume()

  tryOnCleanup(pause)

  return {
    isActive,
    pause,
    resume
  }
}
