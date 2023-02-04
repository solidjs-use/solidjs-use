import { runAsyncHook } from '@dream2023/cypress-solidjs'
import { nextTick } from '@solidjs-use/solid-to-vue'
import { createSignal } from 'solid-js'
import { syncSignals } from '.'

describe('syncSignals', () => {
  it('should work with array', () => {
    return runAsyncHook(async () => {
      const [source, setSource] = createSignal('foo')
      const [target1, setTarget1] = createSignal('bar')
      const [target2, setTarget2] = createSignal('bar2')

      const stop = syncSignals(source, [setTarget1, setTarget2])

      await nextTick()
      expect(target1()).to.be.eq('foo')
      expect(target2()).to.be.eq('foo')

      setSource('bar')

      expect(target1()).to.be.eq('bar')
      expect(target2()).to.be.eq('bar')

      stop()

      setSource('bar2')

      expect(target1()).to.be.eq('bar')
      expect(target2()).to.be.eq('bar')
    })
  })

  it('should work with non-array', () => {
    return runAsyncHook(async () => {
      const [source, setSource] = createSignal('foo')
      const [target, setTarget] = createSignal('bar')

      const stop = syncSignals(source, setTarget)

      await nextTick()
      expect(target()).to.be.eq('foo')

      setSource('bar')

      expect(target()).to.be.eq('bar')

      stop()

      setSource('bar2')

      expect(target()).to.be.eq('bar')
    })
  })
})
