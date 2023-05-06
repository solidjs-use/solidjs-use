import { runHook } from '@dream2023/cypress-ct-solid-js'
import { createSignal } from 'solid-js'
import { usePrecision } from '.'

describe('usePrecision', () => {
  it('should be defined', () => {
    expect(usePrecision).to.be.exist
  })
  it('should work', () => {
    runHook(() => {
      const [base, setBase] = createSignal(45.125)
      const result = usePrecision(base, 2)
      expect(result()).to.eq(45.13)
      setBase(-45.155)
      expect(result()).to.eq(-45.15)
    })
  })
  it('out ceil should work', () => {
    runHook(() => {
      const [base, setBase] = createSignal(45.125)
      const result = usePrecision(base, 2, { math: 'ceil' })
      expect(result()).to.eq(45.13)
      setBase(-45.151)
      expect(result()).to.eq(-45.15)
    })
  })
  it('out floor should work', () => {
    runHook(() => {
      const [base, setBase] = createSignal(45.129)
      const result = usePrecision(base, 2, { math: 'floor' })
      expect(result()).to.eq(45.12)
      setBase(-45.159)
      expect(result()).to.eq(-45.16)
      setBase(2.3)
      expect(result()).to.eq(2.3)
      setBase(-2.3)
      expect(result()).to.eq(-2.3)
    })
  })
})
