import { createSignal } from 'solid-js'
import { promiseTimeout } from '../utils'
import { useTimeoutPoll } from '.'

describe('useTimeoutFn', () => {
  it('supports reactive intervals', async () => {
    const callback = cy.stub()
    const [interval, setInterval] = createSignal(0)
    const { pause, resume } = useTimeoutPoll(callback, interval)

    resume()
    await promiseTimeout(1)
    expect(callback).to.be.called
    pause()

    setInterval(50)

    resume()
    callback.reset()

    await promiseTimeout(1)
    expect(callback).not.to.be.called
    await promiseTimeout(101)
    expect(callback).to.be.called

    callback.reset()
    pause()
    await promiseTimeout(101)
    expect(callback).not.to.be.called

    resume()
    await promiseTimeout(1)
    expect(callback).to.be.called

    callback.reset()
    await promiseTimeout(101)
    expect(callback).to.be.called
    pause()
  })
})
