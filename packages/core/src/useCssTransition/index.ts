import { identity as linear, promiseTimeout, toAccessor, tryOnCleanup, toValue } from '@solidjs-use/shared'
import { createEffect, createMemo, createSignal, on } from 'solid-js'
import type { Accessor, Signal } from 'solid-js'
import type { MaybeAccessor } from '@solidjs-use/shared'

/**
 * Cubic bezier points
 */
export type CubicBezierPoints = [number, number, number, number]

/**
 * Easing function
 */
export type EasingFunction = (n: number) => number

/**
 * Transition options
 */
export interface CssTransitionOptions {
  /**
   * Manually abort a transition
   */
  abort?: () => any

  /**
   * Transition duration in milliseconds
   */
  duration?: MaybeAccessor<number>

  /**
   * Easing function or cubic bezier points for calculating transition values
   */
  transition?: MaybeAccessor<CubicBezierPoints> | (() => EasingFunction)
}

/**
 * Transition options
 */
export interface UseCssTransitionOptions extends CssTransitionOptions {
  /**
   * Milliseconds to wait before starting transition
   */
  delay?: MaybeAccessor<number>

  /**
   * Disables the transition
   */
  disabled?: MaybeAccessor<boolean>

  /**
   * Callback to execute after transition finishes
   */
  onFinished?: () => void

  /**
   * Callback to execute after transition starts
   */
  onStarted?: () => void
}

const _TransitionPresets = {
  easeInSine: [0.12, 0, 0.39, 0],
  easeOutSine: [0.61, 1, 0.88, 1],
  easeInOutSine: [0.37, 0, 0.63, 1],
  easeInQuad: [0.11, 0, 0.5, 0],
  easeOutQuad: [0.5, 1, 0.89, 1],
  easeInOutQuad: [0.45, 0, 0.55, 1],
  easeInCubic: [0.32, 0, 0.67, 0],
  easeOutCubic: [0.33, 1, 0.68, 1],
  easeInOutCubic: [0.65, 0, 0.35, 1],
  easeInQuart: [0.5, 0, 0.75, 0],
  easeOutQuart: [0.25, 1, 0.5, 1],
  easeInOutQuart: [0.76, 0, 0.24, 1],
  easeInQuint: [0.64, 0, 0.78, 0],
  easeOutQuint: [0.22, 1, 0.36, 1],
  easeInOutQuint: [0.83, 0, 0.17, 1],
  easeInExpo: [0.7, 0, 0.84, 0],
  easeOutExpo: [0.16, 1, 0.3, 1],
  easeInOutExpo: [0.87, 0, 0.13, 1],
  easeInCirc: [0.55, 0, 1, 0.45],
  easeOutCirc: [0, 0.55, 0.45, 1],
  easeInOutCirc: [0.85, 0, 0.15, 1],
  easeInBack: [0.36, 0, 0.66, -0.56],
  easeOutBack: [0.34, 1.56, 0.64, 1],
  easeInOutBack: [0.68, -0.6, 0.32, 1.6]
} as const

/**
 * Common transitions
 *
 * @see https://easings.net
 */
export const TransitionPresets = /*#__PURE__*/ Object.assign({}, { linear }, _TransitionPresets) as Record<
  keyof typeof _TransitionPresets,
  CubicBezierPoints
> & { linear: EasingFunction }
/**
 * Create an easing function from cubic bezier points.
 */
function createEasingFunction([p0, p1, p2, p3]: CubicBezierPoints): EasingFunction {
  const a = (a1: number, a2: number) => 1 - 3 * a2 + 3 * a1
  const b = (a1: number, a2: number) => 3 * a2 - 6 * a1
  const c = (a1: number) => 3 * a1

  const calcBezier = (t: number, a1: number, a2: number) => ((a(a1, a2) * t + b(a1, a2)) * t + c(a1)) * t

  const getSlope = (t: number, a1: number, a2: number) => 3 * a(a1, a2) * t * t + 2 * b(a1, a2) * t + c(a1)

  const getTforX = (x: number) => {
    let aGuessT = x

    for (let i = 0; i < 4; ++i) {
      const currentSlope = getSlope(aGuessT, p0, p2)
      if (currentSlope === 0) return aGuessT
      const currentX = calcBezier(aGuessT, p0, p2) - x
      aGuessT -= currentX / currentSlope
    }

    return aGuessT
  }

  return (x: number) => (p0 === p1 && p2 === p3 ? x : calcBezier(getTforX(x), p1, p3))
}

const lerp = (a: number, b: number, alpha: number) => a + alpha * (b - a)

const toVec = (t: number | number[] | undefined) => (typeof t === 'number' ? [t] : t) ?? []

/**
 * Transition from one value to another.
 *
 * @param source
 * @param from
 * @param to
 * @param options
 */
export function executeTransition<T extends number | number[]>(
  [source, setSource]: Signal<T>,
  from: MaybeAccessor<T>,
  to: MaybeAccessor<T>,
  options: CssTransitionOptions = {}
): PromiseLike<void> {
  const fromVal = toValue(from)
  const toVal = toValue(to)
  const v1 = toVec(fromVal)
  const v2 = toVec(toVal)
  const duration = toValue(options.duration) ?? 1000
  const startedAt = Date.now()
  const endAt = Date.now() + duration
  const trans = toValue<CubicBezierPoints | EasingFunction | undefined>(options.transition) ?? linear

  const ease = typeof trans === 'function' ? trans : createEasingFunction(trans)

  return new Promise<void>(resolve => {
    setSource(() => fromVal)

    const tick = () => {
      if (options.abort?.()) {
        resolve()

        return
      }

      const now = Date.now()
      const alpha = ease((now - startedAt) / duration)
      const arr = toVec(source()).map((_n, i) => lerp(v1[i], v2[i], alpha))

      if (Array.isArray(source())) setSource(() => arr.map((_n, i) => lerp(v1[i] ?? 0, v2[i] ?? 0, alpha)) as T)
      else if (typeof source() === 'number') setSource(() => arr[0] as T)

      if (now < endAt) {
        requestAnimationFrame(tick)
      } else {
        setSource(() => toVal)

        resolve()
      }
    }

    tick()
  })
}

// option 1: reactive number
export function useCssTransition(source: MaybeAccessor<number>, options?: UseCssTransitionOptions): Accessor<number>

// option 2: static array of possibly reactive numbers
export function useCssTransition<T extends Array<MaybeAccessor<number>>>(
  source: [...T],
  options?: UseCssTransitionOptions
): Accessor<{ [K in keyof T]: number }>

// option 3: reactive array of numbers
export function useCssTransition<T extends MaybeAccessor<number[]>>(
  source: T,
  options?: UseCssTransitionOptions
): Accessor<number[]>

/**
 * Follow value with a transition.
 *
 * @see https://solidjs-use.github.io/solidjs-use/core/useCssTransition
 */
export function useCssTransition(
  source: MaybeAccessor<number | number[]> | Array<MaybeAccessor<number>>,
  options: UseCssTransitionOptions = {}
): Accessor<any> {
  let currentId = 0

  const sourceVal = () => {
    const v = toValue<number | Array<MaybeAccessor<number>>>(source)

    return typeof v === 'number' ? v : v.map(toValue)
  }

  const [output, setOutput] = createSignal(sourceVal())

  createEffect(
    on(
      () => sourceVal(),
      async to => {
        if (toValue(options.disabled)) return

        const id = ++currentId

        if (options.delay) await promiseTimeout(toValue(options.delay))

        if (id !== currentId) return

        const toVal = Array.isArray(to) ? to.map(toValue) : toValue(to)

        options.onStarted?.()

        await executeTransition([output, setOutput], output(), toVal, {
          ...options,
          abort: () => id !== currentId || options.abort?.()
        })

        options.onFinished?.()
      }
    )
  )

  createEffect(
    on(toAccessor(options.disabled), disabled => {
      if (disabled) {
        currentId++

        setOutput(sourceVal())
      }
    })
  )

  tryOnCleanup(() => {
    currentId++
  })

  return createMemo(() => (toValue(options.disabled) ? sourceVal() : output()))
}
