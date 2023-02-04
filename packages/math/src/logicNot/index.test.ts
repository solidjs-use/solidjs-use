import { runHook } from '@dream2023/cypress-solidjs'
import { unAccessor } from '@solidjs-use/shared'
import { createSignal } from 'solid-js'
import { logicNot } from '.'

describe('logicNot', () => {
  it('should be defined', () => {
    expect(logicNot).to.be.exist
  })

  it('returns the logical complement of the given Accessor', () => {
    runHook(() => {
      expect(unAccessor(logicNot(createSignal(true)[0]))).to.eq(false)
      expect(unAccessor(logicNot(createSignal('foo')[0]))).to.eq(false)
      expect(unAccessor(logicNot(createSignal(1)[0]))).to.eq(false)

      expect(unAccessor(logicNot(createSignal(false)[0]))).to.eq(true)
      expect(unAccessor(logicNot(createSignal('')[0]))).to.eq(true)
      expect(unAccessor(logicNot(createSignal(0)[0]))).to.eq(true)
    })
  })

  it('returns the logical complement of the given value', () => {
    runHook(() => {
      expect(unAccessor(logicNot(true))).to.eq(false)
      expect(unAccessor(logicNot('foo'))).to.eq(false)

      expect(unAccessor(logicNot(false))).to.eq(true)
      expect(unAccessor(logicNot(''))).to.eq(true)
      expect(unAccessor(logicNot(0))).to.eq(true)
    })
  })

  it('returns the logical complement of the given getter function', () => {
    runHook(() => {
      expect(unAccessor(logicNot(() => true))).to.eq(false)
      expect(unAccessor(logicNot(() => 'foo'))).to.eq(false)

      expect(unAccessor(logicNot(() => false))).to.eq(true)
      expect(unAccessor(logicNot(() => 0))).to.eq(true)
    })
  })
})
