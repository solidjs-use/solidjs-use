import { runAsyncHook } from '@dream2023/cypress-solidjs'
import { nextTick } from '@solidjs-use/solid-to-vue'
import { createSignal } from 'solid-js'
import { whenever } from '.'
import type { Signal } from 'solid-js'

describe('whenever', () => {
  const expectType = <T>(value: T) => value

  it('ignore falsy state change', async () => {
    // use a component to simulate normal use case
    return runAsyncHook(async () => {
      const [number, setNumber] = createSignal<number | null | undefined>(1)
      const changeNumber = (v: number) => setNumber(v)
      const [watchCount, setWatchCount] = createSignal(0)
      const [watchValue, setWatchValue]: Signal<number | undefined> = createSignal()

      whenever(number, value => {
        setWatchCount(watchCount() + 1)
        setWatchValue(value)

        expectType<number>(value)

        // @ts-expect-error value should be of type number
        expectType<undefined>(value)
        // @ts-expect-error value should be of type number
        expectType<null>(value)
        // @ts-expect-error value should be of type number
        expectType<string>(value)
      })

      expect(watchCount()).to.eq(0)
      changeNumber(2)
      await nextTick()
      expect(watchCount()).to.eq(1)
      expect(watchValue()).to.eq(2)

      changeNumber(0)
      await nextTick()
      expect(watchCount()).to.eq(1)
      expect(watchValue()).to.eq(2)

      changeNumber(3)
      await nextTick()
      expect(watchCount()).to.eq(2)
      expect(watchValue()).to.eq(3)
    })
  })
})
