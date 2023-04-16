import { isAccessor } from '@solidjs-use/solid-to-vue'
import { getOwner, runWithOwner } from 'solid-js'
import { toValue } from '../toValue'
import { promiseTimeout } from '../utils'
import { watch } from '../watch'
import type { EffectOnDeps, ElementOf, MaybeAccessor } from '../utils'
import type { Owner } from 'solid-js'

export interface UntilToMatchOptions {
  /**
   * Milliseconds timeout for promise to resolve/reject if the when condition does not meet.
   * 0 for never timed out
   *
   * @default 0
   */
  timeout?: number

  /**
   * Reject the promise when timeout
   *
   * @default false
   */
  throwOnTimeout?: boolean
}

export interface UntilBaseInstance<T, Not extends boolean = false> {
  // eslint-disable-next-line @typescript-eslint/method-signature-style
  toMatch<U extends T = T>(
    condition: (v: T) => v is U,
    options?: UntilToMatchOptions
  ): Not extends true ? Promise<Exclude<T, U>> : Promise<U>
  // eslint-disable-next-line @typescript-eslint/method-signature-style
  toMatch(condition: (v: T) => boolean, options?: UntilToMatchOptions): Promise<T>
  changed: (options?: UntilToMatchOptions) => Promise<T>
  changedTimes: (n?: number, options?: UntilToMatchOptions) => Promise<T>
}

type Falsy = false | void | null | undefined | 0 | 0n | ''

export interface UntilValueInstance<T, Not extends boolean = false> extends UntilBaseInstance<T, Not> {
  readonly not: UntilValueInstance<T, Not extends true ? false : true>

  toBe: <P = T>(value: MaybeAccessor<P>, options?: UntilToMatchOptions) => Not extends true ? Promise<T> : Promise<P>
  toBeTruthy: (options?: UntilToMatchOptions) => Not extends true ? Promise<T & Falsy> : Promise<Exclude<T, Falsy>>
  toBeNull: (options?: UntilToMatchOptions) => Not extends true ? Promise<Exclude<T, null>> : Promise<null>
  toBeUndefined: (
    options?: UntilToMatchOptions
  ) => Not extends true ? Promise<Exclude<T, undefined>> : Promise<undefined>
  toBeNaN: (options?: UntilToMatchOptions) => Promise<T>
}

export interface UntilArrayInstance<T> extends UntilBaseInstance<T> {
  readonly not: UntilArrayInstance<T>

  toContains: (value: MaybeAccessor<ElementOf<T>>, options?: UntilToMatchOptions) => Promise<T>
}

function createUntil<T>(r: any, isNot = false, selfOwner?: Owner | null) {
  const owner = selfOwner ?? getOwner()

  function toMatch(condition: (v: any) => boolean, { timeout, throwOnTimeout }: UntilToMatchOptions = {}): Promise<T> {
    let stop: Function | null = null
    const watcher = new Promise<T>(resolve => {
      runWithOwner(owner!, () => {
        stop = watch(r, (v: T) => {
          if (condition(v) !== isNot) {
            stop?.()
            resolve(v)
          }
        })
      })
    })

    const promises = [watcher]
    if (timeout != null) {
      promises.push(
        promiseTimeout(timeout, throwOnTimeout)
          .then(() => toValue(r))
          .finally(() => stop?.())
      )
    }

    return Promise.race(promises)
  }

  function toBe<P>(value: MaybeAccessor<P | T>, options?: UntilToMatchOptions) {
    if (!isAccessor(value)) return toMatch(v => v === value, options)

    const { timeout, throwOnTimeout } = options ?? {}
    let stop: Function | null = null
    const watcher = new Promise<T>(resolve => {
      runWithOwner(owner!, () => {
        stop = watch([r, value], ([v1, v2]: [T, any]) => {
          if (isNot !== (v1 === v2)) {
            stop?.()
            resolve(v1)
          }
        })
      })
    })

    const promises = [watcher]
    if (timeout != null) {
      promises.push(
        promiseTimeout(timeout, throwOnTimeout)
          .then(() => toValue(r))
          .finally(() => {
            stop?.()
            return toValue(r)
          })
      )
    }

    return Promise.race(promises)
  }

  function toBeTruthy(options?: UntilToMatchOptions) {
    return toMatch(v => Boolean(v), options)
  }

  function toBeNull(options?: UntilToMatchOptions) {
    return toBe<null>(null, options)
  }

  function toBeUndefined(options?: UntilToMatchOptions) {
    return toBe<undefined>(undefined, options)
  }

  function toBeNaN(options?: UntilToMatchOptions) {
    return toMatch(Number.isNaN, options)
  }

  function toContains(value: any, options?: UntilToMatchOptions) {
    return toMatch(v => {
      const array = Array.from(v)
      return array.includes(value) || array.includes(toValue(value))
    }, options)
  }

  function changed(options?: UntilToMatchOptions) {
    return changedTimes(1, options)
  }

  function changedTimes(n = 1, options?: UntilToMatchOptions) {
    let count = -1 // skip the immediate check
    return toMatch(() => {
      count += 1
      return count >= n
    }, options)
  }

  if (Array.isArray(toValue(r))) {
    const instance: UntilArrayInstance<T> = {
      toMatch,
      toContains,
      changed,
      changedTimes,
      get not() {
        return createUntil(r, !isNot, owner) as UntilArrayInstance<T>
      }
    }
    return instance
  }
  const instance: UntilValueInstance<T, boolean> = {
    toMatch,
    toBe,
    toBeTruthy: toBeTruthy as any,
    toBeNull: toBeNull as any,
    toBeNaN,
    toBeUndefined: toBeUndefined as any,
    changed,
    changedTimes,
    get not() {
      return createUntil(r, !isNot, owner) as UntilValueInstance<T, boolean>
    }
  }

  return instance
}

/**
 * Promised one-time watch for changes
 *
 * @see https://solidjs-use.github.io/solidjs-use/shared/toValue
 * @example
 * ```
 * const { count } = useCounter()
 *
 * await until(count).toMatch(v => v > 7)
 *
 * alert('Counter is now larger than 7!')
 * ```
 */
export function until<T extends unknown[]>(
  r: EffectOnDeps<T> | MaybeAccessor<T>,
  owner?: Owner | null
): UntilArrayInstance<T>
export function until<T>(r: EffectOnDeps<T> | MaybeAccessor<T>, owner?: Owner | null): UntilValueInstance<T>
export function until<T>(r: any, owner?: Owner | null): UntilValueInstance<T> | UntilArrayInstance<T> {
  return createUntil(r, false, owner)
}
