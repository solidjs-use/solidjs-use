import { runAsyncHook, runHook } from '@dream2023/cypress-solidjs'
import { nextTick } from '@solidjs-use/shared/solid-to-vue'
import { createSignal } from 'solid-js'
import { useConfirmDialog } from '.'

describe('useConfirmDialog', () => {
  it('should be defined', () => {
    expect(useConfirmDialog).to.exist
  })

  it('should open the dialog and close on confirm', () => {
    runHook(() => {
      const [show, setShow] = createSignal(false)
      const { reveal, confirm } = useConfirmDialog([show, setShow])

      reveal()
      expect(show()).to.be.true

      confirm()
      expect(show()).to.be.false
    })
  })

  it('should close on cancel', () => {
    runHook(() => {
      const [show, setShow] = createSignal(false)
      const { reveal, cancel } = useConfirmDialog([show, setShow])

      reveal()
      expect(show()).to.be.true

      cancel()
      expect(show()).to.be.false
    })
  })

  it('should execute `onReveal` fn on open dialog', () => {
    runHook(() => {
      const [show, setShow] = createSignal(false)
      const [message, setMessage] = createSignal('initial')

      const { reveal, cancel, onReveal } = useConfirmDialog([show, setShow])
      expect(message()).to.eq('initial')
      onReveal(() => {
        setMessage('final')
      })
      reveal()
      expect(message()).to.eq('final')

      cancel()
      expect(show()).to.be.false
    })
  })

  it('should execute a callback inside `onConfirm` hook only after confirming', () => {
    runHook(() => {
      const [show, setShow] = createSignal(false)
      const [message, setMessage] = createSignal('initial')

      const { reveal, confirm, onConfirm } = useConfirmDialog([show, setShow])

      onConfirm(() => {
        setMessage('final')
      })
      expect(message()).to.eq('initial')

      reveal()
      expect(message()).to.eq('initial')
      confirm()
      expect(message()).to.eq('final')
    })
  })

  it('should execute a callback inside `onCancel` hook only after canceling dialog', () => {
    runHook(() => {
      const [show, setShow] = createSignal(false)
      const [message, setMessage] = createSignal('initial')

      const { reveal, cancel, onCancel } = useConfirmDialog([show, setShow])

      onCancel(() => {
        setMessage('final')
      })
      expect(message()).to.eq('initial')

      reveal()
      expect(message()).to.eq('initial')
      cancel()
      expect(message()).to.eq('final')
    })
  })

  it('should pass data from confirm fn to `onConfirm` hook', () => {
    runHook(() => {
      const [show, setShow] = createSignal(false)
      const [message, setMessage] = createSignal('initial')
      const data = { value: 'confirm' }

      const { reveal, confirm, onConfirm } = useConfirmDialog([show, setShow])

      onConfirm(data => {
        setMessage(data.value)
      })

      reveal()
      confirm(data)

      expect(message()).to.eq('confirm')
    })
  })

  it('should pass data from cancel fn to `onCancel` hook', () => {
    return runAsyncHook(async () => {
      const [show, setShow] = createSignal(false)
      const [message, setMessage] = createSignal('initial')
      const data = { value: 'confirm' }

      const { reveal, cancel, onCancel } = useConfirmDialog([show, setShow])

      onCancel(data => {
        setMessage(data.value)
      })

      reveal()
      cancel(data)

      expect(message()).to.eq('confirm')
    })
  })

  it('should return promise that will be resolved on `confirm()`', () => {
    return runAsyncHook(async () => {
      const [show, setShow] = createSignal(false)
      const { reveal, confirm } = useConfirmDialog([show, setShow])

      setTimeout(() => {
        confirm(true)
      }, 10)

      const { data, isCanceled } = await reveal()

      await nextTick()

      expect(data).to.eq(true)
      expect(isCanceled).to.eq(false)
    })
  })

  it('should return promise that will be resolved on `cancel()`', () => {
    return runAsyncHook(async () => {
      const [show, setShow] = createSignal(false)
      const { reveal, cancel } = useConfirmDialog([show, setShow])

      setTimeout(() => {
        cancel(true)
      }, 10)

      const { data, isCanceled } = await reveal()

      await nextTick()

      expect(data).to.eq(true)
      expect(isCanceled).to.eq(true)
    })
  })
})
