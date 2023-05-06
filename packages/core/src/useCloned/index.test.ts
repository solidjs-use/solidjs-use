import { runAsyncHook, runHook } from '@dream2023/cypress-ct-solid-js'
import { nextTick } from '@solidjs-use/shared/solid-to-vue'
import { createSignal } from 'solid-js'
import { useCloned } from './index'

describe('useCloned', () => {
  it('works with simple objects', () => {
    return runHook(() => {
      const data = { test: 'test' }

      const { cloned, sync } = useCloned(data)
      expect(cloned()).to.deep.equal(data)

      sync()

      expect(cloned()).to.deep.equal(data)
    })
  })

  it('works with signal', () => {
    return runAsyncHook(async () => {
      const [data, setData] = createSignal({ test: 'test' })

      const { cloned } = useCloned(data)

      setData({ test: 'success' })

      await nextTick()

      expect(cloned()).to.deep.equals({ test: 'success' })
    })
  })

  it('works with signal and manual sync', () => {
    return runAsyncHook(async () => {
      const [data, setData] = createSignal({ test: 'test' })

      const { cloned, sync } = useCloned(data, { manual: true })

      setData({ test: 'success' })

      await nextTick()

      expect(cloned()).not.deep.eq({ test: 'success' })

      sync()

      await nextTick()

      expect(cloned()).to.deep.eq({ test: 'success' })
    })
  })

  it('works with custom clone function', () => {
    return runAsyncHook(async () => {
      const [data, setData] = createSignal<Record<string, any>>({ test: 'test' })

      const { cloned } = useCloned(data, {
        clone: source => ({ ...source, proxyTest: true })
      })

      setData({ test: 'partial' })

      await nextTick()

      expect(cloned().test).to.deep.eq('partial')
      expect(cloned().proxyTest).to.deep.eq(true)
    })
  })

  it('works with on options', () => {
    return runAsyncHook(async () => {
      const [data] = createSignal({ test: 'test' })

      const { cloned } = useCloned(data, { defer: true })

      await nextTick()

      // test defer: true
      expect(cloned()).to.deep.eq({})
    })
  })
})
