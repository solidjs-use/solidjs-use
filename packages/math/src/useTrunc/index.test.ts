import { runHook } from '@dream2023/cypress-ct-solid-js'
import { createSignal } from 'solid-js'
import { useTrunc } from '.'

// Returns:
//  0        ->  0
// -0        -> -0
//  0.2      ->  0
// -0.2      -> -0
//  0.7      ->  0
// -0.7      -> -0
//  Infinity ->  Infinity
// -Infinity -> -Infinity
//  NaN      ->  NaN
//  null     ->  0

describe('useTrunk', () => {
  it('should be defined', () => {
    expect(useTrunc).to.be.exist
  })
  it('should work', () => {
    runHook(() => {
      const [base, setBase] = createSignal(1.95)
      const result = useTrunc(base)
      expect(result()).to.eq(1)
      setBase(-7.004)
      expect(result()).to.eq(-7)

      setBase(0)
      expect(result()).to.eq(0)
      setBase(-0)
      expect(result()).to.eq(-0)

      setBase(0.2)
      expect(result()).to.eq(0)
      setBase(-0.2)
      expect(result()).to.eq(-0)

      setBase(Infinity)
      expect(result()).to.eq(Infinity)
      setBase(-Infinity)
      expect(result()).to.eq(-Infinity)
      setBase(NaN)
      expect(isNaN(result())).to.eq(true)
    })
  })
})
