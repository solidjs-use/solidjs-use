import { runAsyncHook } from '@dream2023/cypress-solidjs'
import { nextTick, reactive } from '@solidjs-use/solid-to-vue'
import { createSignal } from 'solid-js'
import { watchTriggerable } from '.'
describe('watchTriggerable', () => {
  it('this should work', () => {
    return runAsyncHook(async () => {
      const [source, setSource] = createSignal(0)
      const [effect, setEffect] = createSignal(0)
      const { trigger } = watchTriggerable(source, value => {
        expect(value).to.be.eq(source())
        setEffect(value)
      })

      // By default watch will be executed on the next tick
      await nextTick()
      setSource(1)
      await nextTick()
      expect(effect()).to.be.eq(source())

      setSource(2)
      await nextTick()
      expect(effect()).to.be.eq(source())

      // trigger is executed immediately
      setEffect(0)
      trigger()
      await nextTick()
      expect(effect()).to.be.eq(source())
    })
  })

  it('source array', () => {
    return runAsyncHook(async () => {
      const [source1, setSource1] = createSignal(0)
      const source2 = reactive({ a: 'a' })
      const [effect1, setEffect1] = createSignal(-1)
      const [effect2, setEffect2] = createSignal('z')
      const { trigger } = watchTriggerable([source1, () => source2.a], ([value1, value2]) => {
        expect(value1).to.be.eq(source1())
        expect(value2).to.be.eq(source2.a)
        setEffect1(value1)
        setEffect2(value2)
      })

      trigger()

      await nextTick()
      expect(effect1()).to.be.eq(source1())
      expect(effect2()).to.be.eq(source2.a)

      setSource1(1)
      source2.a = 'b'
      await nextTick()
      expect(effect1()).to.be.eq(source1())
      expect(effect2()).to.be.eq(source2.a)
    })
  })

  it('trigger should await', () => {
    return runAsyncHook(async () => {
      const [source] = createSignal(1)
      const [effect, setEffect] = createSignal(0)
      const { trigger } = watchTriggerable(source, async value => {
        await new Promise(resolve => setTimeout(resolve, 10))
        setEffect(value)
      })

      await trigger()
      expect(effect()).to.be.eq(source())
    })
  })
})
