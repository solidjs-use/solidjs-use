import { runHook } from '@dream2023/cypress-solidjs'
import { createSignal } from 'solid-js'
import { useTitle } from '.'

describe('useTitle', () => {
  beforeEach(() => {
    document.title = ''
  })
  it('without param', () => {
    runHook(() => {
      const [title, setTitle] = useTitle()
      expect(title()).to.eq('')
      setTitle('new title')
      expect(title()).to.eq('new title')
    })
  })

  describe('with writable param', () => {
    it('string', () => {
      runHook(() => {
        const [title, setTitle] = useTitle('old title')
        expect(title()).to.eq('old title')
        setTitle('new title')
        expect(title()).to.eq('new title')
      })
    })

    it('null', () => {
      runHook(() => {
        const [title, setTitle] = useTitle(null)
        expect(title()).to.eq('')
        setTitle('new title')
        expect(title()).to.eq('new title')
      })
    })

    it('undefined', () => {
      runHook(() => {
        const [title, setTitle] = useTitle(undefined)
        expect(title()).to.eq('')
        setTitle('new title')
        expect(title()).to.eq('new title')
      })
    })

    describe('Accessor param', () => {
      it('string', () => {
        runHook(() => {
          const [targetRef, setTargetRef] = createSignal('old title')
          const title = useTitle(targetRef)

          expect(title).not.to.be.a('array')
          expect(title()).to.eq('old title')
          setTargetRef('new title')
          expect(title()).to.eq('new title')
        })
      })

      it('null', () => {
        runHook(() => {
          const [targetRef, setTargetRef] = createSignal<null | string>(null)
          const title = useTitle(targetRef)
          expect(title).not.to.be.a('array')
          expect(title()).to.eq(null)
          setTargetRef('new title')
          expect(title()).to.eq('new title')
        })
      })

      it('undefined', () => {
        runHook(() => {
          const [targetRef, setTargetRef] = createSignal<undefined | string>(undefined)
          const title = useTitle(targetRef)

          expect(title).not.to.be.a('array')
          expect(title()).to.eq(undefined)
          setTargetRef('new title')
          expect(title()).to.eq('new title')
        })
      })
    })
  })
})
