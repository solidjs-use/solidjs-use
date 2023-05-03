import { runAsyncHook } from '@dream2023/cypress-ct-solid-js'
import { promiseTimeout } from '@solidjs-use/shared'
import { nextTick } from '@solidjs-use/shared/solid-to-vue'
import { createSignal } from 'solid-js'
import { useThrottledHistoryTravel } from '.'

describe('useThrottledHistoryTravel ', () => {
  it('take first snapshot right after data was changed and second after given time', () => {
    return runAsyncHook(async () => {
      const ms = 10
      const [v, setV] = createSignal(0)

      const { history } = useThrottledHistoryTravel([v, setV], { throttle: ms })

      await nextTick()
      expect(history().length).to.eq(1)
      expect(history()[0].snapshot).to.eq(0)
      await nextTick()

      setV(100)
      await promiseTimeout(ms * 3)
      expect(history().length).to.eq(2)
      expect(history()[0].snapshot).to.eq(100)
      setV(200)
      setV(300)
      setV(400)

      await promiseTimeout(ms * 5)
      expect(history().length).to.eq(4)
      expect(history()[0].snapshot).to.eq(400)
    })
  })
})
