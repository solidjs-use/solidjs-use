import { promiseTimeout } from '@solidjs-use/shared'
import { useTimestamp } from '.'

describe('useTimestamp', () => {
  // it('allows for a delayed start using requestAnimationFrame', async () => {
  //   let now
  //   const callback = cy.stub((time: number) => {
  //     now = time
  //   })
  //   const { resume, timestamp } = useTimestamp({
  //     controls: true,
  //     immediate: false,
  //     callback,
  //   })

  //   const initial = timestamp()

  //   await promiseTimeout(50)

  //   expect(timestamp()).closeTo(initial, 1)
  //   expect(now).to.be.undefined

  //   resume()

  //   await promiseTimeout(50)

  //   expect(timestamp()).greaterThan(initial)
  //   expect(now).greaterThan(initial)
  // })

  it('allows for a delayed start using common interval', async () => {
    let now
    const callback = cy.stub((time: number) => {
      now = time
    })
    const { resume, timestamp } = useTimestamp({
      controls: true,
      immediate: false,
      interval: 50,
      callback
    })

    const initial = timestamp()

    await promiseTimeout(50)

    expect(timestamp()).closeTo(initial, 1)
    expect(now).to.be.undefined

    resume()

    await promiseTimeout(50)

    expect(timestamp()).greaterThan(initial)
    expect(now).greaterThan(initial)
  })
})
