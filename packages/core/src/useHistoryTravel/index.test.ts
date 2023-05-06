import { runAsyncHook } from '@dream2023/cypress-ct-solid-js'
import { nextTick } from '@solidjs-use/shared/solid-to-vue'
import { createSignal } from 'solid-js'
import { useHistoryTravel } from '.'

describe('useHistoryTravel', () => {
  it('should record', () => {
    return runAsyncHook(async () => {
      const [v, setV] = createSignal(0)
      const { history } = useHistoryTravel([v, setV])

      await nextTick()
      expect(history().length).to.eq(1)
      expect(history()[0].snapshot).to.eq(0)

      setV(2)
      await nextTick()
      expect(history().length).to.eq(2)
      expect(history()[0].snapshot).to.eq(2)
      expect(history()[1].snapshot).to.eq(0)
    })
  })

  it('should be able to undo and redo', () => {
    return runAsyncHook(async () => {
      const [v, setV] = createSignal(1)
      const { undo, redo, clear, canUndo, canRedo, history, last } = useHistoryTravel([v, setV], {})

      expect(canUndo()).to.eq(false)
      expect(canRedo()).to.eq(false)
      await nextTick()
      setV(2)
      await nextTick()
      setV(3)
      await nextTick()
      setV(4)
      await nextTick()
      expect(canUndo()).to.eq(true)
      expect(canRedo()).to.eq(false)
      expect(v()).to.eq(4)
      expect(history().length).to.eq(4)
      expect(last().snapshot).to.eq(4)
      undo()

      expect(canUndo()).to.eq(true)
      expect(canRedo()).to.eq(true)

      expect(v()).to.eq(3)
      expect(last().snapshot).to.eq(3)
      undo()
      expect(v()).to.eq(2)
      expect(last().snapshot).to.eq(2)
      redo()
      expect(v()).to.eq(3)
      expect(last().snapshot).to.eq(3)
      redo()
      expect(v()).to.eq(4)
      expect(last().snapshot).to.eq(4)

      expect(canUndo()).to.eq(true)
      expect(canRedo()).to.eq(false)

      redo()
      expect(v()).to.eq(4)
      expect(last().snapshot).to.eq(4)

      clear()
      expect(canUndo()).to.eq(false)
      expect(canRedo()).to.eq(false)
    })
  })

  it('dump + parse', () => {
    return runAsyncHook(async () => {
      const [v, setV] = createSignal<any>({ a: 'bar' })
      const { history, undo } = useHistoryTravel([v, setV], {
        clone: true,
        dump: v => JSON.stringify(v),
        parse: (v: string) => JSON.parse(v)
      })

      expect(history().length).to.eq(1)
      expect(history()[0].snapshot).to.eq('{"a":"bar"}')
      await nextTick()
      setV({ a: 'foo' })
      await nextTick()
      expect(history().length).to.eq(2)
      expect(history()[0].snapshot).to.eq('{"a":"foo"}')
      expect(history()[1].snapshot).to.eq('{"a":"bar"}')

      undo()

      expect(v().a).to.eq('bar')
    })
  })

  it('commit', () => {
    return runAsyncHook(async () => {
      const [v, setV] = createSignal(0)
      const { commit, history } = useHistoryTravel([v, setV])

      expect(history().length).to.eq(1)
      expect(history()[0].snapshot).to.eq(0)
      await nextTick()
      commit()
      await nextTick()

      expect(history().length).to.eq(2)
      expect(history()[0].snapshot).to.eq(0)
      expect(history()[1].snapshot).to.eq(0)
    })
  })

  it('pause and resume', () => {
    return runAsyncHook(async () => {
      const [v, setV] = createSignal(1)
      const { history, pause, resume, last } = useHistoryTravel([v, setV])

      expect(history().length).to.eq(1)
      expect(history()[0].snapshot).to.eq(1)
      await nextTick()
      pause()
      setV(2)
      await nextTick()
      expect(history().length).to.eq(1)
      expect(last().snapshot).to.eq(1)

      resume()

      expect(history().length).to.eq(1)
      expect(last().snapshot).to.eq(1)

      setV(3)
      await nextTick()
      expect(history().length).to.eq(2)
      expect(history()[0].snapshot).to.eq(3)
      expect(last().snapshot).to.eq(3)

      pause()
      setV(4)
      await nextTick()
      expect(history().length).to.eq(2)
      expect(last().snapshot).to.eq(3)

      resume(true)

      expect(history().length).to.eq(3)
      expect(last().snapshot).to.eq(4)
    })
  })

  it('reset', () => {
    return runAsyncHook(async () => {
      const [v, setV] = createSignal(0)
      const { history, commit, undoStack, redoStack, pause, reset, undo } = useHistoryTravel([v, setV])

      expect(history().length).to.eq(1)
      expect(history()[0].snapshot).to.eq(0)
      await nextTick()
      setV(1)
      await nextTick()

      pause()

      setV(2)
      await nextTick()

      expect(history().length).to.eq(2)
      expect(history()[0].snapshot).to.eq(1)
      expect(history()[1].snapshot).to.eq(0)

      reset()

      // v value needs to be the last history point, but history is unchanged
      expect(v()).to.eq(1)

      expect(history().length).to.eq(2)
      expect(history()[0].snapshot).to.eq(1)
      expect(history()[1].snapshot).to.eq(0)

      reset()

      // Calling reset twice is a no-op
      expect(v()).to.eq(1)

      expect(history().length).to.eq(2)
      expect(history()[1].snapshot).to.eq(0)
      expect(history()[0].snapshot).to.eq(1)

      // Same test, but with a non empty redoStack

      setV(3)
      await nextTick()
      commit()

      undo()

      setV(2)
      await nextTick()

      reset()

      expect(v()).to.eq(1)

      expect(undoStack().length).to.eq(1)
      expect(undoStack()[0].snapshot).to.eq(0)

      expect(redoStack().length).to.eq(1)
      expect(redoStack()[0].snapshot).to.eq(3)
    })
  })

  it('dispose', () => {
    return runAsyncHook(async () => {
      const [v, setV] = createSignal(0)
      const { history, dispose, last } = useHistoryTravel([v, setV])

      await nextTick()
      setV(1)
      await nextTick()
      setV(2)
      await nextTick()

      dispose()

      setV(3)
      await nextTick()

      expect(history().length).to.eq(1)
      expect(history()[0].snapshot).to.eq(2)
      expect(last().snapshot).to.eq(2)
    })
  })
})
