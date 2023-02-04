import { runHook } from '@dream2023/cypress-solidjs'
import { createSignal } from 'solid-js'
import { reactify } from '.'

describe('reactify', () => {
  it('one arg', () => {
    runHook(() => {
      const [base, setBase] = createSignal(1.5)
      const floor = reactify(Math.floor)
      const result = floor(base)

      expect(result()).to.be.eq(1)

      setBase(2.8)

      expect(result()).to.be.eq(2)
    })
  })

  it('two args', () => {
    runHook(() => {
      const [base, setBase] = createSignal(0)
      const [exponent, setExponent] = createSignal(0)
      const pow = reactify(Math.pow)
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

  it('mixed with literal', () => {
    runHook(() => {
      const [base, setBase] = createSignal(0)
      const pow = reactify(Math.pow)
      const result = pow(base, 2)

      expect(base()).to.be.eq(0)
      expect(result()).to.be.eq(0)

      setBase(10)
      expect(result()).to.be.eq(100)
    })
  })

  it('JSON.stringify', () => {
    runHook(() => {
      const [base, setBase] = createSignal<any>(0)
      const stringify = reactify(JSON.stringify)
      const result = stringify(base, null, 2)

      expect(base()).to.be.eq(0)
      expect(result()).to.be.eq('0')

      setBase({ foo: 'bar' })
      expect(result()).to.be.eq('{\n  "foo": "bar"\n}')
    })
  })

  it('Pythagorean theorem', () => {
    runHook(() => {
      const pow = reactify(Math.pow)
      const sqrt = reactify(Math.sqrt)
      const add = reactify((a: number, b: number) => a + b)

      const [a, setA] = createSignal(3)
      const [b, setB] = createSignal(4)

      const c = sqrt(add(pow(a, 2), pow(b, 2)))

      expect(c()).to.be.eq(5)

      setA(5)
      setB(12)

      expect(c()).to.be.eq(13)
    })
  })

  it('computed getter', () => {
    runHook(() => {
      const add = reactify((a: number, b: number) => a + b)

      const [a] = createSignal(3)
      const [b, setB] = createSignal(4)

      const c = add(a, () => b())

      expect(c()).to.be.eq(7)

      setB(12)

      expect(c()).to.be.eq(15)
    })
  })
})
