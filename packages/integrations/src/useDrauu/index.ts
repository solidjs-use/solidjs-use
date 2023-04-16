import { createDrauu } from 'drauu'
import { createEffect, createSignal, on } from 'solid-js'
import { createEventHook, toAccessor, tryOnCleanup } from 'solidjs-use'
import type { Accessor, Setter } from 'solid-js'
import type { EventHookOn, Fn, MaybeElementAccessor } from 'solidjs-use'
import type { Brush, Drauu, Options } from 'drauu'

export type UseDrauuOptions = Omit<Options, 'el'>

export interface UseDrauuReturn {
  drauuInstance: Accessor<Drauu | undefined>
  load: (svg: string) => void
  dump: () => string | undefined
  clear: () => void
  cancel: () => void
  undo: () => boolean | undefined
  redo: () => boolean | undefined
  canUndo: Accessor<boolean>
  canRedo: Accessor<boolean>
  brush: Accessor<Brush>
  setBrush: Setter<Brush>

  onChanged: EventHookOn
  onCommitted: EventHookOn
  onStart: EventHookOn
  onEnd: EventHookOn
  onCanceled: EventHookOn
}

/**
 * Reactive drauu
 *
 * @see https://solidjs-use.github.io/solidjs-use/integrations/useDrauu
 * @param target The target svg element
 * @param options Drauu Options
 */
export function useDrauu(target: MaybeElementAccessor, options?: UseDrauuOptions): UseDrauuReturn {
  const [drauuInstance, setDrauuInstance] = createSignal<Drauu>()

  let disposables: Fn[] = []

  const onChangedHook = createEventHook<void>()
  const onCanceledHook = createEventHook<void>()
  const onCommittedHook = createEventHook<void>()
  const onStartHook = createEventHook<void>()
  const onEndHook = createEventHook<void>()
  const [canUndo, setCanUndo] = createSignal(false)
  const [canRedo, setCanRedo] = createSignal(false)
  const [_altPressed, setAltPressed] = createSignal(false)
  const [_shiftPressed, setShiftPressed] = createSignal(false)

  const [brush, setBrush] = createSignal<Brush>({
    color: 'black',
    size: 3,
    arrowEnd: false,
    cornerRadius: 0,
    dasharray: undefined,
    fill: 'transparent',
    mode: 'draw'
  })

  createEffect(
    on(brush, () => {
      const instance = drauuInstance()
      if (instance) {
        instance.brush = brush()
        instance.mode = brush().mode!
      }
    })
  )

  const undo = () => drauuInstance()?.undo()
  const redo = () => drauuInstance()?.redo()
  const clear = () => drauuInstance()?.clear()
  const cancel = () => drauuInstance()?.cancel()
  const load = (svg: string) => drauuInstance()?.load(svg)
  const dump = () => drauuInstance()?.dump()

  const cleanup = () => {
    disposables.forEach(dispose => dispose())
    drauuInstance()?.unmount()
  }

  const syncStatus = () => {
    const drauuInstanceVal = drauuInstance()
    if (drauuInstanceVal) {
      setCanUndo(drauuInstanceVal.canUndo())
      setCanRedo(drauuInstanceVal.canRedo())
      setAltPressed(drauuInstanceVal.altPressed)
      setShiftPressed(drauuInstanceVal.shiftPressed)
    }
  }

  createEffect(
    on(toAccessor(target), el => {
      if (!el || typeof SVGSVGElement === 'undefined' || !(el instanceof SVGSVGElement)) return

      let drauuInstanceVal = drauuInstance()
      if (drauuInstanceVal) cleanup()

      drauuInstanceVal = createDrauu({ el, ...options })
      setDrauuInstance(drauuInstanceVal)

      syncStatus()

      disposables = [
        drauuInstanceVal.on('canceled', () => onCanceledHook.trigger()),
        drauuInstanceVal.on('committed', () => onCommittedHook.trigger()),
        drauuInstanceVal.on('start', () => onStartHook.trigger()),
        drauuInstanceVal.on('end', () => onEndHook.trigger()),
        drauuInstanceVal.on('changed', () => {
          syncStatus()
          onChangedHook.trigger()
        })
      ]
    })
  )

  tryOnCleanup(() => cleanup())

  return {
    drauuInstance,

    load,
    dump,
    clear,
    cancel,
    undo,
    redo,
    canUndo,
    canRedo,
    brush,
    setBrush,

    onChanged: onChangedHook.on,
    onCommitted: onCommittedHook.on,
    onStart: onStartHook.on,
    onEnd: onEndHook.on,
    onCanceled: onCanceledHook.on
  }
}
