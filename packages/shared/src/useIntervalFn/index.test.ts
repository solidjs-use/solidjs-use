import { runAsyncHook } from '@dream2023/cypress-ct-solid-js'
import { promiseTimeout } from '@solidjs-use/shared'
import { nextTick } from '@solidjs-use/solid-to-vue'
import { createSignal, getOwner, runWithOwner } from 'solid-js'
import { useIntervalFn } from './index'
import type { Pausable } from '@solidjs-use/shared'

describe('useIntervalFn', () => {
  let callback: Cypress.Agent<sinon.SinonSpy>

  beforeEach(() => {
    callback = cy.spy()
  })

  async function exec({ isActive, pause, resume }: Pausable) {
    expect(isActive()).to.be.true
    expect(callback).to.be.callCount(0)

    await promiseTimeout(60)
    expect(callback).to.be.callCount(1)

    pause()
    expect(isActive()).to.be.false

    await promiseTimeout(60)
    expect(callback).to.be.callCount(1)

    resume()
    expect(isActive()).to.be.true

    await promiseTimeout(60)
    expect(callback).to.be.callCount(2)
  }

  async function execImmediateCallback({ isActive, pause, resume }: Pausable) {
    expect(isActive()).to.be.true
    expect(callback).to.be.callCount(1)

    await promiseTimeout(60)
    expect(callback).to.be.callCount(2)

    pause()
    expect(isActive()).to.be.false

    await promiseTimeout(60)
    expect(callback).to.be.callCount(2)

    resume()
    expect(isActive()).to.be.true
    expect(callback).to.be.callCount(3)

    await promiseTimeout(60)
    expect(callback).to.be.callCount(4)
  }

  it('basic pause/resume', () => {
    return runAsyncHook(async () => {
      const owner = getOwner()
      await exec(useIntervalFn(callback, 50))

      callback = cy.spy()
      const [interval, setInterval] = createSignal(50)
      await runWithOwner(owner!, async () => {
        await exec(useIntervalFn(callback, interval))
      })

      callback.resetHistory()
      setInterval(20)
      await promiseTimeout(30)
      expect(callback).to.be.callCount(1)
    })
  })

  it('pause/resume with immediateCallback', () => {
    return runAsyncHook(async () => {
      const owner = getOwner()
      await runWithOwner(owner!, async () => {
        await execImmediateCallback(useIntervalFn(callback, 50, { immediateCallback: true }))
      })

      callback = cy.spy()

      const [interval, setInterval] = createSignal(50)
      await runWithOwner(owner!, async () => {
        await execImmediateCallback(useIntervalFn(callback, interval, { immediateCallback: true }))
      })

      callback.resetHistory()
      setInterval(20)
      await nextTick()
      expect(callback).to.be.callCount(1)
    })
  })

  it('cant work when interval is negative', () => {
    return runAsyncHook(async () => {
      const { isActive } = useIntervalFn(callback, -1)

      expect(isActive()).to.be.false
      await promiseTimeout(60)
      expect(callback).to.be.callCount(0)
    })
  })
})
