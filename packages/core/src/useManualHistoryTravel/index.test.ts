import { runHook } from '@dream2023/cypress-solidjs'
import { createSignal } from 'solid-js'
import { useManualHistoryTravel } from '.'

describe('useManualHistoryTravel', () => {
  it('should record', () => {
    runHook(() => {
      const [v, setV] = createSignal(0)
      const { history, commit } = useManualHistoryTravel([v, setV])

      expect(history().length).to.eq(1)
      expect(history()[0].snapshot).to.eq(0)

      setV(2)
      commit()

      expect(history().length).to.eq(2)
      expect(history()[0].snapshot).to.eq(2)
      expect(history()[1].snapshot).to.eq(0)
    })
  })

  it('should be able to undo and redo', () => {
    runHook(() => {
      const [v, setV] = createSignal(0)
      const { commit, undo, redo, clear, canUndo, canRedo, history, last } = useManualHistoryTravel([v, setV])

      expect(canUndo()).to.eq(false)
      expect(canRedo()).to.eq(false)

      setV(2)
      commit()
      setV(3)
      commit()
      setV(4)
      commit()

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

  it('object with deep', () => {
    runHook(() => {
      const [v, setV] = createSignal({ foo: 'bar' })
      const { commit, undo, history } = useManualHistoryTravel([v, setV], { clone: true })

      expect(history().length).to.eq(1)
      expect(history()[0].snapshot.foo).to.eq('bar')

      v().foo = 'foo'
      commit()

      expect(history().length).to.eq(2)
      expect(history()[0].snapshot.foo).to.eq('foo')

      // different references
      expect(history()[1].snapshot.foo).to.eq('bar')
      expect(history()[0].snapshot).not.to.eq(history()[1].snapshot)

      undo()

      // history references should not be equal to the source
      expect(history()[0].snapshot).not.to.eq(v())
    })
  })

  it('object with clone function', () => {
    runHook(() => {
      const [v, setV] = createSignal({ foo: 'bar' })
      const { commit, undo, history } = useManualHistoryTravel([v, setV], { clone: x => JSON.parse(JSON.stringify(x)) })

      expect(history().length).to.eq(1)
      expect(history()[0].snapshot.foo).to.eq('bar')

      v().foo = 'foo'
      commit()

      expect(history().length).to.eq(2)
      expect(history()[0].snapshot.foo).to.eq('foo')

      // different references
      expect(history()[1].snapshot.foo).to.eq('bar')
      expect(history()[0].snapshot).not.to.eq(history()[1].snapshot)

      undo()

      // history references should not be equal to the source
      expect(history()[0].snapshot).not.to.eq(v())
    })
  })

  it('dump + parse', () => {
    runHook(() => {
      const [v, setV] = createSignal<any>({ a: 'bar' })
      const { history, commit, undo } = useManualHistoryTravel([v, setV], {
        dump: v => JSON.stringify(v),
        parse: (v: string) => JSON.parse(v)
      })

      expect(history().length).to.eq(1)
      expect(history()[0].snapshot).to.eq('{"a":"bar"}')

      v().a = 'foo'
      commit()
      expect(history().length).to.eq(2)
      expect(history()[0].snapshot).to.eq('{"a":"foo"}')
      expect(history()[1].snapshot).to.eq('{"a":"bar"}')

      undo()

      expect(v().a).to.eq('bar')
    })
  })

  it('reset', () => {
    runHook(() => {
      const [v, setV] = createSignal(0)
      const { history, commit, undoStack, redoStack, reset, undo } = useManualHistoryTravel([v, setV])

      expect(history().length).to.eq(1)
      expect(history()[0].snapshot).to.eq(0)

      setV(1)
      commit()

      setV(2)

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
      commit()

      undo()

      setV(2)

      reset()

      expect(v()).to.eq(1)

      expect(undoStack().length).to.eq(1)
      expect(undoStack()[0].snapshot).to.eq(0)

      expect(redoStack().length).to.eq(1)
      expect(redoStack()[0].snapshot).to.eq(3)
    })
  })
})
