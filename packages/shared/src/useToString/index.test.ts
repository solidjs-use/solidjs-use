import { runHook } from '@dream2023/cypress-solidjs'
import { createSignal } from 'solid-js'
import { useToString } from '.'

describe('useToString', () => {
  it('default', () => {
    runHook(() => {
      const [value, setValue] = createSignal<any>(123.345)
      const str = useToString(value)

      expect(str()).to.eq('123.345')

      setValue('hi')

      expect(str()).to.eq('hi')

      setValue({ foo: 'hi' })

      expect(str()).to.eq('[object Object]')
    })
  })
})
