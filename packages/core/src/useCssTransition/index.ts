import {
  clamp,
  identity as linear,
  isFunction,
  isNumber,
  noop,
  resolveAccessor,
  unAccessor,
  useTimeoutFn
} from '@solidjs-use/shared'
import { createEffect, createMemo, createSignal, on } from 'solid-js'
import { useRafFn } from '../useRafFn'
import type { Accessor } from 'solid-js'
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
export interface UseCssTransitionOptions {
  /**
   * Milliseconds to wait before starting transition
   */
  delay?: MaybeAccessor<number>

  /**
   * Disables the transition
   */
  disabled?: MaybeAccessor<boolean>

  /**
   * Transition duration in milliseconds
   */
  duration?: MaybeAccessor<number>

  /**
   * Callback to execute after transition finishes
   */
  onFinished?: () => void

  /**
   * Callback to execute after transition starts
   */
  onStarted?: () => void

  /**
   * Easing function or cubic bezier points for calculating transition values
   */
  transition?: MaybeAccessor<EasingFunction | CubicBezierPoints>
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
export const TransitionPresets = {
  linear,
  ..._TransitionPresets
} as Record<keyof typeof _TransitionPresets, CubicBezierPoints> & { linear: EasingFunction }

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

// option 1: reactive number
export function useCssTransition(source: Accessor<number>, options?: UseCssTransitionOptions): Accessor<number>

// option 2: static array of possibly reactive numbers
export function useCssTransition<T extends Array<MaybeAccessor<number>>>(
  source: [...T],
  options?: UseCssTransitionOptions
): Accessor<{ [K in keyof T]: number }>

// option 3: reactive array of numbers
export function useCssTransition<T extends Accessor<number[]>>(
  source: T,
  options?: UseCssTransitionOptions
): Accessor<number[]>

/**
 * Transition between values.
 */
export function useCssTransition(
  source: Accessor<number | number[]> | Array<MaybeAccessor<number>>,
  options: UseCssTransitionOptions = {}
): Accessor<any> {
  const {
    delay = 0,
    disabled = false,
    duration = 1000,
    onFinished = noop,
    onStarted = noop,
    transition = linear
  } = options
  // current easing function
  const currentTransition = createMemo<EasingFunction>(() => {
    const t = transition.length ? transition : unAccessor(transition) // maybe Accessor (no length)
    return isFunction(t) ? (t as EasingFunction) : createEasingFunction(t)
  })

  // raw source value
  const sourceValue = createMemo<number | number[]>(() => {
    const s = unAccessor<number | Array<MaybeAccessor<number>>>(source)
    return isNumber(s) ? s : s.map(unAccessor)
  })

  // normalized source vector
  const sourceVector = createMemo<number[]>(() =>
    isNumber(sourceValue()) ? ([sourceValue()] as number[]) : (sourceValue() as number[])
  )

  // transitioned output vector
  const [outputVector, setOutputVector] = createSignal(sourceVector().slice(0))

  // current transition values
  let currentDuration: number
  let diffVector: number[]
  let endAt: number
  let startAt: number
  let startVector: number[]

  // transition loop
  const { resume, pause } = useRafFn(
    () => {
      const now = Date.now()
      const progress = clamp(1 - (endAt - now) / currentDuration, 0, 1)

      setOutputVector(
        startVector.map((val, i) => {
          return val + (diffVector[i] ?? 0) * currentTransition()(progress)
        })
      )
      if (progress >= 1) {
        pause()
        onFinished()
      }
    },
    { immediate: false }
  )

  // start the animation loop when source vector changes
  const start = () => {
    pause()

    currentDuration = unAccessor(duration)
    diffVector = outputVector().map((n, i) => (sourceVector()[i] ?? 0) - (outputVector()[i] ?? 0))
    startVector = outputVector().slice(0)
    startAt = Date.now()
    endAt = startAt + currentDuration

    resume()
    onStarted()
  }

  const timeout = useTimeoutFn(start, delay, { immediate: false })

  createEffect(
    on(
      sourceVector,
      () => {
        if (unAccessor(disabled)) return
        if (unAccessor(delay) <= 0) start()
        else timeout.start()
      },
      { defer: true }
    )
  )

  createEffect(
    on(
      resolveAccessor(disabled),
      v => {
        if (v) {
          setOutputVector(sourceVector().slice(0))
          pause()
        }
      },
      { defer: true }
    )
  )

  return createMemo(() => {
    const targetVector = unAccessor(disabled) ? sourceVector : outputVector
    return isNumber(sourceValue()) ? targetVector()[0] : targetVector()
  })
}
