import { runHook } from '@dream2023/cypress-solidjs'
import { createSignal } from 'solid-js'
import { unAccessor } from 'solidjs-use'
import { logicOr } from '.'

describe('logicOr', () => {
  it('should be defined', () => {
    expect(logicOr).to.be.exist
  })

  it('returns false when given no args', () => {
    runHook(() => {
      expect(unAccessor(logicOr())).to.eq(false)
    })
  })

  it('returns true only when any arguments are truthy', () => {
    runHook(() => {
      expect(unAccessor(logicOr(createSignal(true)[0], createSignal(false)[0]))).to.eq(true)
      expect(unAccessor(logicOr(createSignal('foo')[0], createSignal(false)[0]))).to.eq(true)
      expect(unAccessor(logicOr(createSignal('foo')[0], createSignal(1)[0], createSignal(false)[0]))).to.eq(true)

      expect(unAccessor(logicOr(createSignal(false)[0], createSignal(false)[0]))).to.eq(false)
      expect(unAccessor(logicOr(createSignal('')[0], createSignal(0)[0]))).to.eq(false)
    })
  })

  it('works with values', () => {
    runHook(() => {
      expect(unAccessor(logicOr(true))).to.eq(true)
      expect(unAccessor(logicOr(true, false))).to.eq(true)
      expect(unAccessor(logicOr('foo'))).to.eq(true)

      expect(unAccessor(logicOr(false))).to.eq(false)
      expect(unAccessor(logicOr(''))).to.eq(false)
      expect(unAccessor(logicOr(0))).to.eq(false)
    })
  })

  it('works with getter functions', () => {
    runHook(() => {
      expect(unAccessor(logicOr(() => true))).to.eq(true)
      expect(
        unAccessor(
          logicOr(
            () => true,
            () => false
          )
        )
      ).to.eq(true)
      expect(unAccessor(logicOr(() => 'foo'))).to.eq(true)

      expect(unAccessor(logicOr(() => false))).to.eq(false)
      expect(unAccessor(logicOr(() => ''))).to.eq(false)
      expect(unAccessor(logicOr(() => 0))).to.eq(false)
    })
  })
})
