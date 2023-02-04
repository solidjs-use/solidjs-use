import { createSignal } from 'solid-js'
import { useConfirmDialog } from 'solidjs-use'

const Demo = () => {
  const [message, setMessage] = createSignal('')

  const dialog1 = useConfirmDialog()
  const dialog2 = useConfirmDialog()

  dialog1.onReveal(() => {
    setMessage('Modal is shown!')
  })
  dialog1.onConfirm(() => {
    dialog2.reveal()
  })
  dialog1.onCancel(() => {
    setMessage('Canceled!')
  })
  dialog2.onReveal(() => {
    setMessage('Second modal is shown!')
  })
  dialog2.onConfirm(result => {
    if (result) {
      setMessage('Confirmed!')
    } else {
      setMessage('Rejected!')
    }
  })
  dialog2.onCancel(() => {
    dialog1.reveal()
    setMessage('Canceled!')
  })
  return (
    <>
      <h2>
        <span class="text-orange-400">{message()}</span>
      </h2>
      <button disabled={dialog1.isRevealed() || dialog2.isRevealed()} onClick={dialog1.reveal}>
        Click to Show Modal Dialog
      </button>
      {dialog1.isRevealed() && (
        <div>
          <div>
            <div>
              <p>Show Second Dialog?</p>
            </div>
            <footer>
              <button onClick={dialog1.confirm}>OK</button>
              <button onClick={dialog1.cancel}>Cancel</button>
            </footer>
          </div>
        </div>
      )}
      {dialog2.isRevealed() && (
        <div>
          <div>
            <div>
              <p>Confirm or Reject</p>
            </div>
            <footer>
              <button onClick={() => dialog2.confirm(true)}>Confirm</button>
              <button onClick={() => dialog2.confirm(false)}>Reject</button>
              <button onClick={dialog2.cancel}>Cancel</button>
            </footer>
          </div>
        </div>
      )}
    </>
  )
}

export default Demo
