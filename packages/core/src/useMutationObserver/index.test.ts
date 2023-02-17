import { runAsyncHook } from '@dream2023/cypress-solidjs'
import { nextTick, promiseTimeout } from '@solidjs-use/shared'
import { useMutationObserver } from './index'

describe('useMutationObserver', () => {
  it('should be defined', () => {
    expect(useMutationObserver).to.be.exist
  })

  it('should work with attributes', () => {
    return runAsyncHook(async () => {
      const cb = cy.spy()

      const target = document.createElement('div')
      target.setAttribute('id', 'header')

      useMutationObserver(target, cb, {
        attributes: true
      })

      await nextTick()
      target.setAttribute('id', 'footer')
      await promiseTimeout(10)
      expect(cb).to.be.callCount(1)

      target.setAttribute('id', 'header')
      await promiseTimeout(10)

      expect(cb).to.be.callCount(2)
      const record = cb.args[0][0][0]
      expect(record.toString()).to.be.eq('[object MutationRecord]')
      expect(record.target).to.be.eq(target)
    })
  })

  it('should work with childList', () => {
    return runAsyncHook(async () => {
      const target = document.createElement('div')

      const cb = cy.spy()

      useMutationObserver(target, cb, {
        childList: true
      })

      await nextTick()
      target.appendChild(document.createElement('div'))
      await promiseTimeout(10)
      expect(cb).to.be.called
    })
  })

  it('should work with subtree', () => {
    return runAsyncHook(async () => {
      const target = document.createElement('div')
      const cb = cy.spy()

      useMutationObserver(target, cb, {
        subtree: true,
        childList: true
      })

      await nextTick()
      const child = document.createElement('div')

      target.appendChild(child)
      await promiseTimeout(10)
      expect(cb).to.be.called

      child.appendChild(document.createElement('div'))
      await promiseTimeout(10)
      expect(cb).to.be.callCount(2)
    })
  })

  it('should work with characterData', () => {
    return runAsyncHook(async () => {
      const target = document.createTextNode('123')
      const cb = cy.spy()
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      useMutationObserver(target, cb, {
        characterData: true
      })
      await nextTick()
      target.data = 'content'

      await promiseTimeout(10)
      expect(cb).to.be.called

      target.data = 'footer'
      await promiseTimeout(10)
      expect(cb).to.be.callCount(2)
    })
  })

  it('should work with attributeFilter', () => {
    return runAsyncHook(async () => {
      const target = document.createElement('div')
      const cb = cy.spy()

      useMutationObserver(target, cb, {
        attributes: true,
        attributeFilter: ['id']
      })

      await nextTick()
      target.setAttribute('id', 'footer')
      await promiseTimeout(10)
      expect(cb).to.be.called

      target.setAttribute('class', 'footer')
      await promiseTimeout(10)
      expect(cb).to.be.callCount(1)
    })
  })

  it('should work with attributeOldValue', () => {
    return runAsyncHook(async () => {
      const target = document.createElement('div')
      const cb = cy.spy()

      useMutationObserver(target, cb, {
        attributes: true,
        attributeOldValue: true
      })

      await nextTick()
      target.setAttribute('id', 'footer')
      await promiseTimeout(10)
      expect(cb).to.be.called

      const record = cb.args[0][0][0]
      expect(record.oldValue).to.be.eq(null)

      target.setAttribute('id', 'header')
      await promiseTimeout(10)
      expect(cb).to.be.callCount(2)

      const record2 = cb.args[1][0][0]
      expect(record2.oldValue).to.be.eq('footer')
    })
  })

  it('should work with characterDataOldValue', () => {
    return runAsyncHook(async () => {
      const target = document.createTextNode('123')
      const cb = cy.spy()
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      useMutationObserver(target, cb, {
        characterData: true,
        characterDataOldValue: true
      })

      await nextTick()
      target.data = 'content'
      await promiseTimeout(10)
      expect(cb).to.be.called

      const record = cb.args[0][0][0]
      expect(record.oldValue).to.be.eq('123')

      target.data = 'footer'
      await promiseTimeout(10)
      expect(cb).to.be.callCount(2)

      const record2 = cb.args[1][0][0]
      expect(record2.oldValue).to.be.eq('content')
    })
  })

  it('should work with stop', () => {
    return runAsyncHook(async () => {
      const target = document.createElement('div')
      const cb = cy.spy()

      const { stop } = useMutationObserver(target, cb, {
        attributes: true
      })

      await nextTick()
      target.setAttribute('id', 'footer')
      await promiseTimeout(10)
      expect(cb).to.be.called

      stop()
      target.setAttribute('id', 'header')
      await promiseTimeout(10)
      expect(cb).to.be.callCount(1)
    })
  })
})
