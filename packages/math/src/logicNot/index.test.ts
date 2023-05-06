import { runHook } from '@dream2023/cypress-ct-solid-js'
import { toValue } from '@solidjs-use/shared'
import { createSignal } from 'solid-js'
import { logicNot } from '.'

describe('logicNot', () => {
  it('should be defined', () => {
    expect(logicNot).to.be.exist
  })

  it('returns the logical complement of the given Accessor', () => {
    runHook(() => {
      expect(toValue(logicNot(createSignal(true)[0]))).to.eq(false)
      expect(toValue(logicNot(createSignal('foo')[0]))).to.eq(false)
      expect(toValue(logicNot(createSignal(1)[0]))).to.eq(false)

      expect(toValue(logicNot(createSignal(false)[0]))).to.eq(true)
      expect(toValue(logicNot(createSignal('')[0]))).to.eq(true)
      expect(toValue(logicNot(createSignal(0)[0]))).to.eq(true)
    })
  })

  it('returns the logical complement of the given value', () => {
    runHook(() => {
      expect(toValue(logicNot(true))).to.eq(false)
      expect(toValue(logicNot('foo'))).to.eq(false)

      expect(toValue(logicNot(false))).to.eq(true)
      expect(toValue(logicNot(''))).to.eq(true)
      expect(toValue(logicNot(0))).to.eq(true)
    })
  })

  it('returns the logical complement of the given getter function', () => {
    runHook(() => {
      expect(toValue(logicNot(() => true))).to.eq(false)
      expect(toValue(logicNot(() => 'foo'))).to.eq(false)

      expect(toValue(logicNot(() => false))).to.eq(true)
      expect(toValue(logicNot(() => 0))).to.eq(true)
    })
  })
})
