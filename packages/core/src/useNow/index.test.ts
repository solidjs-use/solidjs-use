import { promiseTimeout } from '@solidjs-use/shared'
import { useNow } from '.'

describe('useNow', () => {
  it('should get now timestamp by default', async () => {
    const now = useNow()

    expect(+now()).to.be.lte(+new Date())
  })

  function testControl(interval: any) {
    it(`should control now timestamp by ${interval}`, async () => {
      let initial = +new Date()
      const { now, pause, resume } = useNow({ controls: true, interval })

      expect(+now()).to.be.gte(initial)

      await promiseTimeout(50)

      expect(+now()).to.be.gt(initial)

      initial = +now()

      pause()
      await promiseTimeout(50)

      expect(+now()).to.be.eq(initial)

      resume()
      await promiseTimeout(50)

      expect(+now()).to.be.gt(initial)
    })
  }

  // cypress bug
  // testControl('requestAnimationFrame')
  testControl(50)
})
