import { toSignal, writableComputed } from 'solidjs-use/solid-to-vue'
import nprogress from 'nprogress'
import { createEffect } from 'solid-js'
import { isClient, tryOnCleanup } from 'solidjs-use'
import type { MaybeAccessor } from 'solidjs-use'
import type { NProgressOptions } from 'nprogress'

export type UseNProgressOptions = Partial<NProgressOptions>

/**
 * Reactive progress bar.
 *
 * @see https://solidjs-use.github.io/solidjs-use/integrations/useNProgress
 */
export function useNProgress(
  currentProgress: MaybeAccessor<number | null | undefined> = null,
  options?: UseNProgressOptions
) {
  const [progress, setProgress] = toSignal(currentProgress)

  const [isLoading, setLoading] = writableComputed({
    set: load => (load ? nprogress.start() : nprogress.done()),
    get: () => typeof progress() === 'number' && progress()! < 1
  })

  if (options) nprogress.configure(options)

  const _setProgress = nprogress.set
  nprogress.set = (n: number) => {
    setProgress(n)
    return _setProgress.call(nprogress, n)
  }

  createEffect(() => {
    if (typeof progress() === 'number' && isClient) _setProgress.call(nprogress, progress()!)
  })

  tryOnCleanup(nprogress.remove)

  return {
    isLoading,
    setLoading,
    progress,
    setProgress,
    start: nprogress.start,
    done: nprogress.done,
    remove: () => {
      setProgress(null)
      nprogress.remove()
    }
  }
}

export type UseNProgressReturn = ReturnType<typeof useNProgress>
