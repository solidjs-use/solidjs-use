import { isString, noop, tryOnCleanup, unAccessor, watch } from '@solidjs-use/shared'
import { defaultWindow } from '../_configurable'
import type { Arrayable, Fn, MaybeAccessor, MaybeElement } from '@solidjs-use/shared'

interface InferEventTarget<Events> {
  addEventListener: (event: Events, fn?: any, options?: any) => any
  removeEventListener: (event: Events, fn?: any, options?: any) => any
}

export type WindowEventName = keyof WindowEventMap
export type DocumentEventName = keyof DocumentEventMap

export type GeneralEventListener<E = Event> = (evt: E) => void

/**
 * Register using addEventListener on mounted, and removeEventListener automatically on unmounted.
 *
 * Overload 1: Omitted Window target
 */
export function useEventListener<E extends keyof WindowEventMap>(
  event: Arrayable<E>,
  listener: Arrayable<(this: Window, ev: WindowEventMap[E]) => any>,
  options?: boolean | AddEventListenerOptions
): Fn

/**
 * Register using addEventListener on mounted, and removeEventListener automatically on unmounted.
 *
 * Overload 2: Explicitly Window target
 */
export function useEventListener<E extends keyof WindowEventMap>(
  target: Window,
  event: Arrayable<E>,
  listener: Arrayable<(this: Window, ev: WindowEventMap[E]) => any>,
  options?: boolean | AddEventListenerOptions
): Fn

/**
 * Register using addEventListener on mounted, and removeEventListener automatically on unmounted.
 *
 * Overload 3: Explicitly Document target
 */
export function useEventListener<E extends keyof DocumentEventMap>(
  target: DocumentOrShadowRoot,
  event: Arrayable<E>,
  listener: Arrayable<(this: Document, ev: DocumentEventMap[E]) => any>,
  options?: boolean | AddEventListenerOptions
): Fn

/**
 * Register using addEventListener on mounted, and removeEventListener automatically on unmounted.
 *
 * Overload 4: Custom event target with event type infer
 */
export function useEventListener<Names extends string, EventType = Event>(
  target: InferEventTarget<Names>,
  event: Arrayable<Names>,
  listener: Arrayable<GeneralEventListener<EventType>>,
  options?: boolean | AddEventListenerOptions
): Fn

/**
 * Register using addEventListener on mounted, and removeEventListener automatically on unmounted.
 *
 * Overload 5: Custom event target fallback
 */
export function useEventListener<EventType = Event>(
  target: MaybeAccessor<EventTarget | null | undefined>,
  event: Arrayable<string>,
  listener: Arrayable<GeneralEventListener<EventType>>,
  options?: boolean | AddEventListenerOptions
): Fn

export function useEventListener(...args: any[]) {
  let target: MaybeAccessor<EventTarget> | undefined
  let events: Arrayable<string>
  let listeners: Arrayable<Function>
  let options: any

  if (isString(args[0]) || Array.isArray(args[0])) {
    ;[events, listeners, options] = args
    target = defaultWindow
  } else {
    ;[target, events, listeners, options] = args
  }

  if (!target) return noop

  if (!Array.isArray(events)) events = [events]
  if (!Array.isArray(listeners)) listeners = [listeners]

  const cleanups: Function[] = []
  const cleanup = () => {
    cleanups.forEach(fn => fn())
    cleanups.length = 0
  }

  const register = (el: any, event: string, listener: any) => {
    el.addEventListener(event, listener, options)
    return () => el.removeEventListener(event, listener, options)
  }

  const stopWatch = watch(
    () => unAccessor(target as unknown as MaybeElement),
    el => {
      cleanup()
      if (!el) return

      cleanups.push(
        ...(events as string[]).flatMap(event => {
          return (listeners as Function[]).map(listener => register(el, event, listener))
        })
      )
    }
  )

  const stop = () => {
    stopWatch()
    cleanup()
  }

  tryOnCleanup(stop)

  return stop
}
