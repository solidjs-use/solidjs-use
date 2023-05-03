import { runHook } from '@dream2023/cypress-ct-solid-js'
import { createSignal } from 'solid-js'
import { toValue } from 'solidjs-use'
import { logicOr } from '.'

describe('logicOr', () => {
  it('should be defined', () => {
    expect(logicOr).to.be.exist
  })

  it('returns false when given no args', () => {
    runHook(() => {
      expect(toValue(logicOr())).to.eq(false)
    })
  })

  it('returns true only when any arguments are truthy', () => {
    runHook(() => {
      expect(toValue(logicOr(createSignal(true)[0], createSignal(false)[0]))).to.eq(true)
      expect(toValue(logicOr(createSignal('foo')[0], createSignal(false)[0]))).to.eq(true)
      expect(toValue(logicOr(createSignal('foo')[0], createSignal(1)[0], createSignal(false)[0]))).to.eq(true)

      expect(toValue(logicOr(createSignal(false)[0], createSignal(false)[0]))).to.eq(false)
      expect(toValue(logicOr(createSignal('')[0], createSignal(0)[0]))).to.eq(false)
    })
  })

  it('works with values', () => {
    runHook(() => {
      expect(toValue(logicOr(true))).to.eq(true)
      expect(toValue(logicOr(true, false))).to.eq(true)
      expect(toValue(logicOr('foo'))).to.eq(true)

      expect(toValue(logicOr(false))).to.eq(false)
      expect(toValue(logicOr(''))).to.eq(false)
      expect(toValue(logicOr(0))).to.eq(false)
    })
  })

  it('works with getter functions', () => {
    runHook(() => {
      expect(toValue(logicOr(() => true))).to.eq(true)
      expect(
        toValue(
          logicOr(
            () => true,
            () => false
          )
        )
      ).to.eq(true)
      expect(toValue(logicOr(() => 'foo'))).to.eq(true)

      expect(toValue(logicOr(() => false))).to.eq(false)
      expect(toValue(logicOr(() => ''))).to.eq(false)
      expect(toValue(logicOr(() => 0))).to.eq(false)
    })
  })
})
