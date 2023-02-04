import { createSignal } from 'solid-js'
import { isDefined } from '.'

describe('isDefined', () => {
  it('should be defined', () => {
    expect(isDefined).to.be.not.undefined
  })

  it('should support signal', () => {
    const [definedRef] = createSignal('test')
    const [undefinedRef] = createSignal(undefined)
    const [nullRef] = createSignal(null)

    expect(isDefined(definedRef)).to.eq(true)
    expect(isDefined(undefinedRef)).to.eq(false)
    expect(isDefined(nullRef)).to.eq(false)
  })

  it('should support values', () => {
    const definedValue = 'test'
    const undefinedValue = undefined
    const nullValue = null

    expect(isDefined(definedValue)).to.eq(true)
    expect(isDefined(undefinedValue)).to.eq(false)
    expect(isDefined(nullValue)).to.eq(false)
  })
})
