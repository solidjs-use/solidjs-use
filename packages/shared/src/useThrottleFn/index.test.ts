import { useThrottleFn } from '../useThrottleFn'
import { promiseTimeout } from '../utils'

describe('useThrottleFn', () => {
  it('should be defined', () => {
    expect(useThrottleFn).to.be.exist
  })

  it('should work', async () => {
    const callback = cy.spy()
    const ms = 20
    const run = useThrottleFn(callback, ms)
    run()
    run()
    expect(callback).to.be.callCount(1)
    await promiseTimeout(ms + 10)
    run()
    expect(callback).to.be.callCount(2)
  })

  it('should work with trailing', async () => {
    const callback = cy.spy()
    const ms = 20
    const run = useThrottleFn(callback, ms, true)
    run()
    run()
    expect(callback).to.be.callCount(1)
    await promiseTimeout(ms + 10)
    expect(callback).to.be.callCount(2)
  })

  it('should work with leading', async () => {
    const callback = cy.spy()
    const ms = 20
    const run = useThrottleFn(callback, ms, false, false)
    run()
    run()
    expect(callback).to.be.callCount(1)
    await promiseTimeout(ms + 10)
    run()
    run()
    run()
    expect(callback).to.be.callCount(2)
    await promiseTimeout(ms + 20)
    run()
    expect(callback).to.be.callCount(2)
  })
})
