import { runAsyncHook } from '@dream2023/cypress-solidjs'
import { promiseTimeout } from '@solidjs-use/shared'
import { nextTick } from '@solidjs-use/shared/solid-to-vue'
import { createSignal } from 'solid-js'
import { useDebouncedHistoryTravel } from '.'

describe('useDebouncedHistoryTravel', () => {
  it("Once the signal's value has changed and some time has passed, ensure the snapshot is updated", () => {
    return runAsyncHook(async () => {
      const [v, setV] = createSignal(0)

      const { history } = useDebouncedHistoryTravel([v, setV], { debounce: 10 })
      await nextTick()
      setV(100)
      await nextTick()
      expect(history().length).to.eq(1)
      expect(history()[0].snapshot).to.eq(0)

      await promiseTimeout(20)

      expect(history().length).to.eq(2)
      expect(history()[0].snapshot).to.eq(100)
    })
  })

  it('when debounce is undefined', () => {
    return runAsyncHook(async () => {
      const [v, setV] = createSignal(0)

      const { history } = useDebouncedHistoryTravel([v, setV], {})
      await nextTick()
      setV(100)
      await nextTick()

      expect(history().length).to.eq(2)
      expect(history()[0].snapshot).to.eq(100)
    })
  })
})
