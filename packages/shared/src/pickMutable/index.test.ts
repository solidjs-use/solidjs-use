import { createMutable } from 'solid-js/store'
import { pickMutable } from '.'

describe('pickMutable', () => {
  it('should be defined', () => {
    expect(pickMutable).to.be.exist
  })

  it('should work', () => {
    const source = createMutable({
      foo: 'foo',
      bar: 'bar'
    })
    const state = pickMutable(source, 'bar')
    expect(state).to.be.deep.eq({
      bar: 'bar'
    })

    source.foo = 'foo2'

    expect(state).to.be.deep.eq({
      bar: 'bar'
    })

    source.bar = 'bar1'

    expect(state).to.be.deep.eq({
      bar: 'bar1'
    })
  })

  it('should write back', () => {
    const source = createMutable({
      foo: 'foo',
      bar: 'bar'
    })
    const state = pickMutable(source, 'bar')

    state.bar = 'bar2'

    expect(source).to.be.deep.eq({
      foo: 'foo',
      bar: 'bar2'
    })
  })
})
