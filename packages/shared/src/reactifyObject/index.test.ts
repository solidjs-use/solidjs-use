import { runHook } from '@dream2023/cypress-ct-solid-js'
import { createSignal } from 'solid-js'
import { reactifyObject } from '.'

describe('reactifyObject', () => {
  it('Math', () => {
    runHook(() => {
      const { pow } = reactifyObject(Math, { includeOwnProperties: true })

      const [base, setBase] = createSignal(0)
      const [exponent, setExponent] = createSignal(0)
      const result = pow(base, exponent)

      expect(base()).to.be.eq(0)
      expect(result()).to.be.eq(1)

      setBase(2)
      setExponent(2)

      expect(result()).to.be.eq(4)

      setBase(3)

      expect(result()).to.be.eq(9)

      setExponent(3)

      expect(result()).to.be.eq(27)
    })
  })

  it('JSON', () => {
    runHook(() => {
      const { stringify, parse } = reactifyObject(JSON)

      const [base, setBase] = createSignal('{"foo":"bar"}')
      const result = stringify(parse(base))

      expect(result()).to.be.eq(base())

      setBase('{"bar":42}')

      expect(result()).to.be.eq(base())
    })
  })
})
