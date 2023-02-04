import { runHook } from '@dream2023/cypress-solidjs'
import { createSignal } from 'solid-js'
import { unAccessor } from 'solidjs-use'
import { logicAnd } from '.'

describe('logicAnd', () => {
  it('should be defined', () => {
    expect(logicAnd).to.be.exist
  })

  it('returns true when given no args', () => {
    runHook(() => {
      expect(unAccessor(logicAnd())).to.eq(true)
    })
  })

  it('returns true only when all arguments are truthy', () => {
    runHook(() => {
      expect(unAccessor(logicAnd(createSignal(true)[0], createSignal(true)[0]))).to.eq(true)
      expect(unAccessor(logicAnd(createSignal('foo')[0], createSignal(true)[0]))).to.eq(true)
      expect(unAccessor(logicAnd(createSignal('foo')[0], createSignal(1)[0]))).to.eq(true)

      expect(unAccessor(logicAnd(createSignal(true)[0], createSignal(false)[0]))).to.eq(false)
      expect(unAccessor(logicAnd(createSignal('foo')[0], createSignal(0)[0]))).to.eq(false)
    })
  })

  it('works with values', () => {
    runHook(() => {
      expect(unAccessor(logicAnd(true))).to.eq(true)
      expect(unAccessor(logicAnd('foo'))).to.eq(true)

      expect(unAccessor(logicAnd(true, false))).to.eq(false)
      expect(unAccessor(logicAnd(0))).to.eq(false)
    })
  })

  it('works with getter functions', () => {
    runHook(() => {
      expect(unAccessor(logicAnd(() => true))).to.eq(true)
      expect(unAccessor(logicAnd(() => 'foo'))).to.eq(true)

      expect(
        unAccessor(
          logicAnd(
            () => true,
            () => false
          )
        )
      ).to.eq(false)
      expect(unAccessor(logicAnd(() => 0))).to.eq(false)
    })
  })
})
