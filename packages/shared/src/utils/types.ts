import type { Accessor } from 'solid-js'
import type { AccessorArray, Setter, Signal } from 'solid-js/types/reactive/signal'

/**
 * Any function
 */
export type Fn = () => void

/**
 * Any function
 */
export type AnyFn = (...args: any[]) => any

/**
 * Maybe it's a signal, or a plain value
 *
 * ```ts
 * type MaybeSignal<T> = T | Signal<T>
 * ```
 */
export type MaybeSignal<T> = MaybeAccessor<T> | Signal<T>

/**
 * Maybe it's a accessor, or a plain value
 */
export type MaybeAccessor<T> = T | Accessor<T>

export type MaybeElement = HTMLElement | SVGElement | undefined | null
export type MaybeElementAccessor<T extends MaybeElement = MaybeElement> = MaybeAccessor<T>

export type Arrayable<T> = T[] | T

/**
 * Infers the element type of an array
 */
export type ElementOf<T> = T extends Array<infer E> ? E : never

// export type ShallowUnwrapRef<T> = T extends Ref<infer P> ? P : T

export type Awaitable<T> = Promise<T> | T

export type ArgumentsType<T> = T extends (...args: infer U) => any ? U : never

export type PromisifyFn<T extends AnyFn> = (...args: ArgumentsType<T>) => Promise<ReturnType<T>>

export interface Pausable {
  /**
   * A Accessor indicate whether a pausable instance is active
   */
  isActive: Accessor<boolean>

  /**
   * Temporary pause the effect from executing
   */
  pause: Fn

  /**
   * Resume the effects
   */
  resume: Fn
}

export interface Stoppable {
  /**
   * A Accessor indicate whether a stoppable instance is executing
   */
  isPending: Accessor<boolean>

  /**
   * Stop the effect from executing
   */
  stop: Fn

  /**
   * Start the effects
   */
  start: Fn
}

/**
 * A Signal that allow to set null or undefined
 */
export type RemovableSignal<T> = [Accessor<T>, Setter<T | undefined | null>]

export type EffectOnDeps<S = any> = AccessorArray<S> | Accessor<S>

// Internal Types
export type MapSources<T> = {
  [K in keyof T]: T[K] extends EffectOnDeps<infer V> ? V : never
}
export type MapOldSources<T> = {
  [K in keyof T]: T[K] extends EffectOnDeps<infer V> ? V | undefined : never
}
