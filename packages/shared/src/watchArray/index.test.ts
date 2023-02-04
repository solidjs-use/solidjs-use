import { runAsyncHook } from '@dream2023/cypress-solidjs'
import { nextTick } from '@solidjs-use/solid-to-vue'
import { createSignal } from 'solid-js'
import { watchArray } from '.'

describe('watchArray', () => {
  it('should work when two lists are different', () => {
    return runAsyncHook(async () => {
      const spy = cy.spy()
      const [num, setNum] = createSignal([1, 2, 3])
      watchArray(num, spy)
      await nextTick()
      expect(spy).to.be.calledWith([1, 2, 3], [], [1, 2, 3], [])
      setNum([1, 1, 4])
      await nextTick()
      expect(spy).to.be.calledWith([1, 1, 4], [1, 2, 3], [1, 4], [2, 3])
      expect(spy).to.be.callCount(2)
    })
  })

  it('should work when two lists are identical', () => {
    return runAsyncHook(async () => {
      const spy = cy.spy()
      const [num, setNum] = createSignal([1, 2, 3])
      watchArray(num, spy)
      await nextTick()
      setNum([1, 2, 3])
      await nextTick()
      expect(spy).to.be.calledWith([1, 2, 3], [1, 2, 3], [], [])
      expect(spy).to.be.callCount(2)
    })
  })

  it('should work with list push', () => {
    return runAsyncHook(async () => {
      const spy = cy.spy()
      const [num, setNum] = createSignal([1, 2, 3])
      watchArray(num, spy)
      await nextTick()
      setNum(([...num]) => {
        num.push(4)
        return num
      })
      await nextTick()
      expect(spy).to.be.calledWith([1, 2, 3, 4], [1, 2, 3], [4], [])
      expect(spy).to.be.callCount(2)
    })
  })

  it('should work with list splice', () => {
    return runAsyncHook(async () => {
      const spy = cy.spy()
      const [num, setNum] = createSignal([1, 2, 3])
      watchArray(num, spy, {})
      await nextTick()
      setNum(([...num]) => {
        num.splice(1, 1, 5, 6, 7)
        return num
      })
      await nextTick()
      expect(spy).to.be.calledWith([1, 5, 6, 7, 3], [1, 2, 3], [5, 6, 7], [2])
      expect(spy).to.be.callCount(2)
    })
  })

  it('should work when defer is true', () => {
    return runAsyncHook(async () => {
      const spy = cy.spy()

      const [num, setNum] = createSignal([1, 2, 3])
      watchArray(() => num(), spy, { defer: true })
      await nextTick()
      expect(spy).not.to.be.called
      setNum([1, 2, 3, 4])
      await nextTick()
      expect(spy).to.have.been.calledWith([1, 2, 3, 4], [1, 2, 3], [4], [])
      expect(spy).to.be.callCount(1)
    })
  })
})
