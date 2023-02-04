import { createEventHook, noop } from '@solidjs-use/shared'
import { createSignal } from 'solid-js'
import type { Accessor, Setter } from 'solid-js'
import type { EventHook, EventHookOn } from '@solidjs-use/shared'

export type UseConfirmDialogRevealResult<C, D> =
  | {
      data?: C
      isCanceled: false
    }
  | {
      data?: D
      isCanceled: true
    }

export interface UseConfirmDialogReturn<RevealData, ConfirmData, CancelData> {
  /**
   * Opens the dialog.
   * Create promise and return it. Triggers `onReveal` hook.
   */
  reveal: (data?: RevealData) => Promise<UseConfirmDialogRevealResult<ConfirmData, CancelData>>

  /**
   * Confirms and closes the dialog. Triggers a callback inside `onConfirm` hook.
   * Resolves promise from `reveal()` with `data` and `isCanceled` Accessor with `false` value.
   * Can accept any data and to pass it to `onConfirm` hook.
   */
  confirm: (data?: ConfirmData) => void

  /**
   * Cancels and closes the dialog. Triggers a callback inside `onCancel` hook.
   * Resolves promise from `reveal()` with `data` and `isCanceled` Accessor with `true` value.
   * Can accept any data and to pass it to `onCancel` hook.
   */
  cancel: (data?: CancelData) => void

  /**
   * Event Hook to be triggered right before dialog creating.
   */
  onReveal: EventHookOn<RevealData>

  /**
   * Event Hook to be called on `confirm()`.
   * Gets data object from `confirm` function.
   */
  onConfirm: EventHookOn<ConfirmData>

  /**
   * Event Hook to be called on `cancel()`.
   * Gets data object from `cancel` function.
   */
  onCancel: EventHookOn<CancelData>
}

/**
 * Hooks for creating confirm dialogs. Useful for modal windows, popups and logins.
 *
 * @param setRevealed `Setter<boolean>` that handles a modal window
 */
export function useConfirmDialog<RevealData = any, ConfirmData = any, CancelData = any>(): UseConfirmDialogReturn<
  RevealData,
  ConfirmData,
  CancelData
> & {
  isRevealed: Accessor<boolean>
}
export function useConfirmDialog<RevealData = any, ConfirmData = any, CancelData = any>(
  setRevealed: Setter<boolean>
): UseConfirmDialogReturn<RevealData, ConfirmData, CancelData>
export function useConfirmDialog<RevealData = any, ConfirmData = any, CancelData = any>(setRevealed?: Setter<boolean>) {
  const confirmHook: EventHook = createEventHook<ConfirmData>()
  const cancelHook: EventHook = createEventHook<CancelData>()
  const revealHook: EventHook = createEventHook<RevealData>()
  let revealed: Accessor<boolean> | undefined
  if (setRevealed === undefined) {
    ;[revealed, setRevealed] = createSignal(false)
  }

  let _resolve: (arg0: UseConfirmDialogRevealResult<ConfirmData, CancelData>) => void = noop

  const reveal = (data?: RevealData) => {
    revealHook.trigger(data)
    setRevealed?.(true)

    return new Promise<UseConfirmDialogRevealResult<ConfirmData, CancelData>>(resolve => {
      _resolve = resolve
    })
  }

  const confirm = (data?: ConfirmData) => {
    setRevealed?.(false)
    confirmHook.trigger(data)

    _resolve({ data, isCanceled: false })
  }

  const cancel = (data?: CancelData) => {
    setRevealed?.(false)
    cancelHook.trigger(data)
    _resolve({ data, isCanceled: true })
  }

  const res = {
    reveal,
    confirm,
    cancel,
    onReveal: revealHook.on,
    onConfirm: confirmHook.on,
    onCancel: cancelHook.on
  }
  if (revealed) {
    return {
      isRevealed: reveal,
      ...res
    }
  }

  return res
}
