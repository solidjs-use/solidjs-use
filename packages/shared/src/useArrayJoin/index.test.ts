import { runHook } from '@dream2023/cypress-ct-solid-js'
import { createSignal } from 'solid-js'
import { useArrayJoin } from '../useArrayJoin'

describe('useArrayJoin', () => {
  it('should be defined', () => {
    expect(useArrayJoin).to.be.not.undefined
  })

  it('should work with array of Signals', () => {
    runHook(() => {
      const [item1, setItem1] = createSignal('foo')
      const [item2] = createSignal(0)
      const [item3] = createSignal({ prop: 'val' })
      const list = [item1, item2, item3]
      const result = useArrayJoin(list)
      expect(result()).to.eq('foo,0,[object Object]')
      setItem1('bar')
      expect(result()).to.eq('bar,0,[object Object]')
    })
  })

  it('should work with reactive array', () => {
    runHook(() => {
      const [list, setList] = createSignal(['string', 0, { prop: 'val' }, false, [1], [[2]], null, undefined, []])
      const result = useArrayJoin(list)
      expect(result()).to.eq('string,0,[object Object],false,1,2,,,')
      setList(([...state]) => {
        state.push(true)
        return state
      })
      expect(result()).to.eq('string,0,[object Object],false,1,2,,,,true')
      setList([null, 'string', undefined, 0, [], [1], [[2]], { prop: 'val' }])
      expect(result()).to.eq(',string,,0,,1,2,[object Object]')
    })
  })

  it('should work with reactive separator', () => {
    runHook(() => {
      const [list] = createSignal(['string', 0, { prop: 'val' }, [1], [[2]], null, undefined, []])
      const [separator, setSeparator] = createSignal<string>()
      const result = useArrayJoin(list, separator)
      expect(result()).to.eq('string,0,[object Object],1,2,,,')
      setSeparator('')
      expect(result()).to.eq('string0[object Object]12')
      setSeparator('-')
      expect(result()).to.eq('string-0-[object Object]-1-2---')
    })
  })
})
