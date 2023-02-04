import { createSignal } from 'solid-js'
import { get } from '.'

describe('get', () => {
  it('unref', () => {
    const [a] = createSignal(42)

    expect(get(a)).to.eq(42)
    expect(get(42)).to.eq(42)
  })

  it('Accessor object', () => {
    const [reactive] = createSignal({ foo: 'bar' })
    const plain = { foo: 'bar' }

    expect(get(reactive, 'foo')).to.eq('bar')
    expect(get(plain, 'foo')).to.eq('bar')

    // @ts-expect-error cast
    expect(get(reactive, 'bar')).to.be.undefined
    // @ts-expect-error cast
    expect(get(plain, 'bar')).to.be.undefined
  })

  it('Accessor array', () => {
    const [reactive] = createSignal([1, 2, 3])
    const plain = [1, 2, 3]

    expect(get(reactive, 2)).to.eq(3)
    expect(get(plain, 2)).to.eq(3)

    // @ts-expect-error cast
    expect(get(reactive, 'bar')).to.be.undefined
    // @ts-expect-error cast
    expect(get(plain, 'bar')).to.be.undefined
  })
})
