---
category: Utilities
---

# useConfirmDialog

Creates event hooks to support modals and confirmation dialog chains.

Functions can be used on the template, and hooks are a handy skeleton for the business logic of modals dialog or other actions that require user confirmation.

## Functions and hooks

- `reveal()` - triggers `onReveal` hook and sets `revealed` to `true`. Returns promise that resolves by `confirm()` or `cancel()`.
- `confirm()` - sets `isRevealed` to `false` and triggers `onConfirm` hook.
- `cancel()` - sets `isRevealed` to `false` and triggers `onCancel` hook.

## Basic Usage

### Using hooks

```tsx
import { useConfirmDialog } from 'solidjs-use'
import { Portal } from 'solid-js/web'

const Demo = () => {
  const { isRevealed, reveal, confirm, cancel, onReveal, onConfirm, onCancel } = useConfirmDialog()
  return (
    <>
      <button onClick={reveal}>Reveal Modal</button>
      <Portal mount={document.querySelector('body')}>
        {isRevealed() && (
          <div class="modal-bg">
            <div class="modal">
              <h2>Confirm?</h2>
              <button onClick={confirm}>Yes</button>
              <button onClick={cancel}>Cancel</button>
            </div>
          </div>
        )}
      </Portal>
    </>
  )
}
```

### Promise

If you prefer working with promises:

```tsx
import { useConfirmDialog, onClickOutside } from 'solidjs-use'
import { Portal } from 'solid-js/web'

const Demo = () => {
  const { isRevealed, reveal, confirm, cancel } = useConfirmDialog()

  const openDialog = async () => {
    const { data, isCanceled } = await reveal()
    if (!isCanceled) {
      console.log(data)
    }
  }
  return (
    <>
      <button onClick={openDialog}>Show Modal</button>
      <Portal mount={document.querySelector('body')}>
        <Show when={isRevealed()}>
          <div class="modal-layout">
            <div class="modal">
              <h2>Confirm?</h2>
              <button onClick={() => confirm(true)}>Yes</button>
              <button onClick={() => confirm(false)}>No</button>
            </div>
          </div>
        </Show>
      </Portal>
    </>
  )
}
```
