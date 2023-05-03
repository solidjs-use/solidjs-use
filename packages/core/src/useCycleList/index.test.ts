import { runHook } from '@dream2023/cypress-ct-solid-js'
import { createSignal } from 'solid-js'
import { useCycleList } from '.'

describe('useCycleList', () => {
  it('should work with array', () => {
    runHook(() => {
      const { state, next, prev, index, setState, setIndex } = useCycleList(['foo', 'bar', 'fooBar'])

      expect(state()).to.be.eq('foo')
      expect(index()).to.be.eq(0)

      next()

      expect(state()).to.be.eq('bar')
      expect(index()).to.be.eq(1)

      prev()

      expect(state()).to.be.eq('foo')
      expect(index()).to.be.eq(0)

      setIndex(2)

      expect(state()).to.be.eq('fooBar')
      expect(index()).to.be.eq(2)

      setState('foo')

      expect(state()).to.be.eq('foo')
      expect(index()).to.be.eq(0)
    })
  })

  it('should work with ref', () => {
    runHook(() => {
      const [list] = createSignal(['foo', 'bar', 'fooBar'])

      const { state, next, prev, index, setState, setIndex } = useCycleList(list)

      expect(state()).to.be.eq('foo')
      expect(index()).to.be.eq(0)

      next()

      expect(state()).to.be.eq('bar')
      expect(index()).to.be.eq(1)

      prev()

      expect(state()).to.be.eq('foo')
      expect(index()).to.be.eq(0)

      setIndex(2)

      expect(state()).to.be.eq('fooBar')
      expect(index()).to.be.eq(2)

      setState('foo')

      expect(state()).to.be.eq('foo')
      expect(index()).to.be.eq(0)
    })
  })

  describe('when list empty', () => {
    it('returns the correctly data', () => {
      runHook(() => {
        const [list, setList] = createSignal(['foo', 'bar', 'fooBar'])

        const { state, index, setIndex } = useCycleList(list)

        setList([])
        setIndex(2)

        expect(state()).to.be.undefined
        expect(index()).to.be.eq(0)
      })
    })
  })
})
