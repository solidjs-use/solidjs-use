import { isFunction, timestamp } from '@solidjs-use/shared'
import { isSignal, toSignal } from '@solidjs-use/shared/solid-to-vue'
import { createMemo, createSignal } from 'solid-js'
import { cloneFnJSON } from '../useCloned'
import type { Accessor, Setter, Signal } from 'solid-js'
import type { CloneFn } from '../useCloned'

export interface UseHistoryTravelRecord<T> {
  snapshot: T
  timestamp: number
}

export interface UseManualHistoryTravelOptions<Raw, Serialized = Raw> {
  /**
   * Maximum number of history to be kept. Default to unlimited.
   */
  capacity?: number
  /**
   * Clone when taking a snapshot, shortcut for dump: JSON.parse(JSON.stringify(value)).
   * Default to false
   *
   * @default false
   */
  clone?: boolean | CloneFn<Raw>
  /**
   * Serialize data into the history
   */
  dump?: (v: Raw) => Serialized
  /**
   * Deserialize data from the history
   */
  parse?: (v: Serialized) => Raw

  /**
   * Deserialize data from the history
   */
  setSource?: (setSource: Setter<Raw>, v: Raw) => void
}

export interface UseManualHistoryTravelAccessorReturn<Raw, Serialized> {
  /**
   * Bypassed tracking Accessor from the argument
   */
  source: Accessor<Raw>

  /**
   * An array of history records for undo, newest comes to first
   */
  history: Accessor<Array<UseHistoryTravelRecord<Serialized>>>

  /**
   * Last history point, source can be different if paused
   */
  last: Accessor<UseHistoryTravelRecord<Serialized>>

  /**
   * Same as {@link UseManualHistoryTravelReturn.history | history}
   */
  undoStack: Accessor<Array<UseHistoryTravelRecord<Serialized>>>

  /**
   * Records array for redo
   */
  redoStack: Accessor<Array<UseHistoryTravelRecord<Serialized>>>

  /**
   * A Accessor representing if undo is possible (non empty undoStack)
   */
  canUndo: Accessor<boolean>

  /**
   * A Accessor representing if redo is possible (non empty redoStack)
   */
  canRedo: Accessor<boolean>

  /**
   * Clear all the history
   */
  clear: () => void

  /**
   * Create new a new history record
   */
  commit: () => void
}

export interface UseManualHistoryTravelSignalReturn<Raw, Serialized>
  extends UseManualHistoryTravelAccessorReturn<Raw, Serialized> {
  /**
   * Undo changes
   */
  undo: () => void

  /**
   * Redo changes
   */
  redo: () => void

  /**
   * Reset Accessor's value with latest history
   */
  reset: () => void
}

const fnBypass = <F, T>(v: F) => v as unknown as T
const fnSetSource = <F>(setSource: Setter<F>, value: F) => setSource(value as any)

type FnCloneOrBypass<F, T> = (v: F) => T

function defaultDump<R, S>(clone?: boolean | CloneFn<R>) {
  return (clone ? (isFunction(clone) ? clone : cloneFnJSON) : fnBypass) as unknown as FnCloneOrBypass<R, S>
}

function defaultParse<R, S>(clone?: boolean | CloneFn<R>) {
  return (clone ? (isFunction(clone) ? clone : cloneFnJSON) : fnBypass) as unknown as FnCloneOrBypass<S, R>
}

/**
 * Manually track the change history of a `Signal` or `Accessor` when the using calls `commit()`, when the parameter is a Signal, it provides undo and redo functionality.
 */
export function useManualHistoryTravel<Raw, Serialized = Raw>(
  source: Accessor<Raw>,
  options?: UseManualHistoryTravelOptions<Raw, Serialized>
): UseManualHistoryTravelAccessorReturn<Raw, Serialized>
export function useManualHistoryTravel<Raw, Serialized = Raw>(
  source: Signal<Raw>,
  options?: UseManualHistoryTravelOptions<Raw, Serialized>
): UseManualHistoryTravelSignalReturn<Raw, Serialized>
export function useManualHistoryTravel<Raw, Serialized = Raw>(
  source: Signal<Raw> | Accessor<Raw>,
  options: UseManualHistoryTravelOptions<Raw, Serialized> = {}
) {
  const [getSourceVal, setSourceVal] = toSignal(source)
  const {
    clone = false,
    dump = defaultDump<Raw, Serialized>(clone),
    parse = defaultParse<Raw, Serialized>(clone),
    setSource = fnSetSource
  } = options

  function _createHistoryRecord(): UseHistoryTravelRecord<Serialized> {
    return {
      snapshot: dump(getSourceVal()),
      timestamp: timestamp()
    }
  }

  const [last, setLast] = createSignal<UseHistoryTravelRecord<Serialized>>(_createHistoryRecord())

  const [undoStack, setUndoStack] = createSignal<Array<UseHistoryTravelRecord<Serialized>>>([])
  const [redoStack, setRedoStack] = createSignal<Array<UseHistoryTravelRecord<Serialized>>>([])

  const _setSource = (record: UseHistoryTravelRecord<Serialized>) => {
    setSource(setSourceVal, parse(record.snapshot))
    setLast(record)
  }

  const commit = () => {
    setUndoStack(stacks => {
      return [last(), ...stacks]
    })
    setLast(_createHistoryRecord())

    if (options.capacity && undoStack().length > options.capacity) {
      setUndoStack(([...stacks]) => {
        stacks.splice(options.capacity!, Infinity)
        return stacks
      })
    }
    if (redoStack().length) {
      setRedoStack(([...stacks]) => {
        stacks.splice(0, redoStack().length)
        return stacks
      })
    }
  }

  const clear = () => {
    setUndoStack([])
    setRedoStack([])
  }

  const undo = () => {
    const state = undoStack()[0]
    setUndoStack(([...stacks]) => {
      stacks.shift()
      return stacks
    })

    if (state) {
      setRedoStack(stacks => {
        return [last(), ...stacks]
      })
      _setSource(state)
    }
  }

  const redo = () => {
    const state = redoStack()[0]
    setRedoStack(([...stacks]) => {
      stacks.shift()
      return stacks
    })

    if (state) {
      setUndoStack(stacks => {
        return [last(), ...stacks]
      })
      _setSource(state)
    }
  }

  const reset = () => {
    _setSource(last())
  }

  const history = createMemo(() => [last(), ...undoStack()])

  const canUndo = createMemo(() => undoStack().length > 0)
  const canRedo = createMemo(() => redoStack().length > 0)

  if (isSignal(source)) {
    return {
      source: getSourceVal,
      undoStack,
      redoStack,
      last,
      history,
      canUndo,
      canRedo,

      clear,
      commit,
      reset,
      undo,
      redo
    }
  }
  return {
    source: getSourceVal,
    undoStack,
    redoStack,
    last,
    history,
    canUndo,
    canRedo,

    clear,
    commit
  }
}
