import Sortable from 'sortablejs'
import { defaultDocument, tryOnCleanup, tryOnMount, toValue } from 'solidjs-use'
import { nextTick, toSignal } from 'solidjs-use/solid-to-vue'
import type { ConfigurableDocument, MaybeAccessor, MaybeSignal } from 'solidjs-use'
import type { Options } from 'sortablejs'

export interface UseSortableReturn {
  /**
   * start sortable instance
   */
  start: () => void
  /**
   * destroy sortable instance
   */
  stop: () => void

  /**
   * Options getter/setter
   * @param name a Sortable.Options property.
   * @param value a value.
   */
  option<K extends keyof Sortable.Options>(name: K, value: Sortable.Options[K]): void
  option<K extends keyof Sortable.Options>(name: K): Sortable.Options[K]
}

export type UseSortableOptions = Options & ConfigurableDocument

export function useSortable<T>(
  selector: string,
  list: MaybeAccessor<T[]>,
  options?: UseSortableOptions
): UseSortableReturn
export function useSortable<T>(
  el: MaybeAccessor<HTMLElement | null | undefined>,
  list: MaybeAccessor<T[]>,
  options?: UseSortableOptions
): UseSortableReturn

/**
 * Wrapper for sortablejs.
 *
 * @see https://solidjs-use.github.io/solidjs-use/integrations/useSortable
 */
export function useSortable<T>(
  el: MaybeAccessor<HTMLElement | null | undefined> | string,
  list: MaybeSignal<T[]>,
  options: UseSortableOptions = {}
): UseSortableReturn {
  let sortable: Sortable

  const { document = defaultDocument, ...resetOptions } = options

  const defaultOptions: Options = {
    onUpdate: e => {
      moveArrayElement(list, e.oldIndex!, e.newIndex!)
    }
  }

  const start = () => {
    const target = typeof el === 'string' ? document?.querySelector(el) : toValue(el)
    if (!target) return
    sortable = new Sortable(target as HTMLElement, { ...defaultOptions, ...resetOptions })
  }

  const stop = () => sortable?.destroy()

  tryOnMount(start)

  tryOnCleanup(stop)

  const option = <K extends keyof Options>(name: K, value?: Options[K]) => {
    if (value !== undefined) sortable?.option(name, value)
    else return sortable?.option(name)
  }
  return { stop, start, option }
}

export function moveArrayElement<T>(list: MaybeSignal<T[]>, from: number, to: number): void {
  const [arr, setArr] = toSignal(list)
  if (to >= 0 && to < arr().length) {
    let element: T
    setArr(([...array]) => {
      element = array.splice(from, 1)[0]
      return array
    })
    nextTick(() => {
      setArr(([...array]) => {
        array.splice(to, 0, element)
        return array
      })
    })
  }
}
