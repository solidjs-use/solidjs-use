import { isSignal, toSignal } from '@solidjs-use/solid-to-vue'
import { createEffect, createMemo } from 'solid-js'
import { unAccessor } from '../unAccessor'
import type { Accessor } from 'solid-js'
import type { MaybeSignal } from '../utils'

export type UseSortedCompareFn<T = any> = (a: T, b: T) => number

export type UseSortedFn<T = any> = (arr: T[], compareFn: UseSortedCompareFn<T>) => T[]

export interface UseSortedOptions<T = any> {
  /**
   * sort algorithm
   */
  sortFn?: UseSortedFn<T>
  /**
   * compare function
   */
  compareFn?: UseSortedCompareFn<T>
  /**
   * change the value of the source array
   * @default false
   */
  dirty?: boolean
}

const defaultSortFn: UseSortedFn = <T>(source: T[], compareFn: UseSortedCompareFn<T>): T[] => source.sort(compareFn)
const defaultCompare: UseSortedCompareFn<number> = (a, b) => a - b

export function useSorted<T = any>(source: MaybeSignal<T[]>, compareFn?: UseSortedCompareFn<T>): Accessor<T[]>
export function useSorted<T = any>(source: MaybeSignal<T[]>, options?: UseSortedOptions<T>): Accessor<T[]>
export function useSorted<T = any>(
  source: MaybeSignal<T[]>,
  compareFn?: UseSortedCompareFn<T>,
  options?: Omit<UseSortedOptions<T>, 'compareFn'>
): Accessor<T[]>
/**
 * reactive sort array
 */
export function useSorted(...args: any[]) {
  const [source, setSource] = toSignal(args[0])
  let compareFn: UseSortedCompareFn = defaultCompare
  let options: UseSortedOptions = {}
  if (args.length === 2) {
    if (typeof args[1] === 'object') {
      options = args[1]
      compareFn = options.compareFn ?? defaultCompare
    } else {
      compareFn = args[1] ?? defaultCompare
    }
  } else if (args.length > 2) {
    compareFn = args[1] ?? defaultCompare
    options = args[2] ?? {}
  }

  const { dirty = false, sortFn = defaultSortFn } = options

  if (!dirty) return createMemo(() => sortFn([...unAccessor(source)], compareFn))

  // dirty
  createEffect(() => {
    const result = sortFn(unAccessor(source), compareFn)
    if (isSignal(args[0])) setSource(result)
    else source().splice(0, source().length, ...result)
  })

  return source
}
