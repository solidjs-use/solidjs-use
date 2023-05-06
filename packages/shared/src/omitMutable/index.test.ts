import { runHook } from '@dream2023/cypress-ct-solid-js'
import { createMutable } from 'solid-js/store'
import { omitMutable } from '.'

interface TargetObject {
  foo: string
  bar: string
  baz?: string
  qux?: boolean
}

describe('omitMutable', () => {
  it('should work', () => {
    runHook(() => {
      const source = createMutable<TargetObject>({
        foo: 'foo',
        bar: 'bar'
      })

      const state = omitMutable(source, 'bar', 'baz')

      expect(state).to.deep.eq({
        foo: 'foo'
      })

      source.qux = true

      expect(state).to.deep.eq({
        foo: 'foo',
        qux: true
      })

      source.baz = 'should be omit'

      expect(state).to.deep.eq({
        foo: 'foo',
        qux: true
      })
    })
  })
})
