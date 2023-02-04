import { createEffect } from 'solid-js'

type CleanupFn = () => void

type OnCleanup = (cleanupFn: CleanupFn) => void

export function watchEffect(callback: (onCleanup: OnCleanup) => void) {
  let preCleanupFn: CleanupFn = () => {}
  const onCleanup: OnCleanup = (cleanupFn: CleanupFn) => {
    preCleanupFn()
    preCleanupFn = cleanupFn
  }

  createEffect<any>(() => {
    callback(onCleanup)
  })
}
