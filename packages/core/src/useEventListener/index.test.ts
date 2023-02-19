import { runAsyncHook, runHook } from '@dream2023/cypress-solidjs'
import { noop } from '@solidjs-use/shared'
import { createSignal, getOwner } from 'solid-js'
import { nextTick } from '@solidjs-use/shared/solid-to-vue'
import { useEventListener } from '.'
import type { Accessor, Owner, Setter } from 'solid-js'
import type { Fn } from '@solidjs-use/shared'

describe('useEventListener', () => {
  const options = { capture: true }
  let stop: Fn
  let target: HTMLDivElement
  let removeSpy: Cypress.Agent<sinon.SinonSpy>
  let addSpy: Cypress.Agent<sinon.SinonSpy>

  beforeEach(() => {
    target = document.createElement('div')
    removeSpy = cy.spy(target, 'removeEventListener')
    addSpy = cy.spy(target, 'addEventListener')
  })

  it('should be defined', () => {
    expect(useEventListener).to.be.exist
  })

  describe('given both none array', () => {
    let listener: Cypress.Agent<sinon.SinonSpy>
    const event = 'click'
    let owner: Owner | null

    beforeEach(() => {
      listener = cy.spy()
      listener.resetHistory()
      runHook(() => {
        owner = getOwner()
        stop = useEventListener(target, event, listener, options)
      })
    })

    it('should add listener', () => {
      runHook(() => {
        expect(addSpy).to.be.callCount(1)
      }, owner)
    })

    it('should trigger listener', () => {
      runHook(() => {
        expect(listener).not.to.be.called
        target.dispatchEvent(new MouseEvent(event))
        expect(listener).to.be.callCount(1)
      }, owner)
    })

    it('should remove listener', () => {
      runHook(() => {
        expect(removeSpy).not.to.be.called

        stop()

        expect(removeSpy).to.be.callCount(1)
        expect(removeSpy).to.be.calledWith(event, listener, options)
      }, owner)
    })
  })

  describe('given array of events but single listener', () => {
    let listener: Cypress.Agent<sinon.SinonSpy>
    const events = ['click', 'scroll', 'blur', 'resize']
    let owner: Owner | null

    beforeEach(() => {
      listener = cy.spy()
      listener.resetHistory()
      runHook(_owner => {
        owner = _owner
        stop = useEventListener(target, events, listener, options)
      })
    })

    it('should add listener for all events', () => {
      runHook(() => {
        events.forEach(event => expect(addSpy).to.be.calledWith(event, listener, options))
      }, owner)
    })

    it('should trigger listener with all events', () => {
      runHook(() => {
        expect(listener).not.to.be.called
        events.forEach((event, index) => {
          target.dispatchEvent(new Event(event))
          expect(listener).to.be.callCount(index + 1)
        })
      }, owner)
    })

    it('should remove listener with all events', () => {
      runHook(() => {
        expect(removeSpy).not.to.be.called

        stop()

        expect(removeSpy).to.be.callCount(events.length)
        events.forEach(event => expect(removeSpy).to.be.calledWith(event, listener, options))
      }, owner)
    })
  })

  describe('given single event but array of listeners', () => {
    let listeners: Array<Cypress.Agent<sinon.SinonSpy>>
    const event = 'click'
    let owner: Owner | null

    beforeEach(() => {
      listeners = [cy.spy(), cy.spy(), cy.spy()]
      listeners.forEach(listener => listener.resetHistory())
      runHook(_owner => {
        owner = _owner
        stop = useEventListener(target, event, listeners, options)
      })
    })

    it('should add all listeners', () => {
      runHook(() => {
        listeners.forEach(listener => expect(addSpy).to.be.calledWith(event, listener, options))
      }, owner)
    })

    it('should call all listeners with single click event', () => {
      runHook(() => {
        listeners.forEach(listener => expect(listener).not.to.be.called)

        target.dispatchEvent(new Event(event))

        listeners.forEach(listener => expect(listener).to.be.callCount(1))
      }, owner)
    })

    it('should remove listeners', () => {
      runHook(() => {
        expect(removeSpy).not.to.be.called

        stop()

        expect(removeSpy).to.be.callCount(listeners.length)
        listeners.forEach(listener => expect(removeSpy).to.be.calledWith(event, listener, options))
      }, owner)
    })
  })

  describe('given both array of events and listeners', () => {
    let listeners: Array<Cypress.Agent<sinon.SinonSpy>>
    const events = ['click', 'scroll', 'blur', 'resize', 'custom-event']
    let owner: Owner | null

    beforeEach(() => {
      listeners = [cy.spy(), cy.spy(), cy.spy()]
      listeners.forEach(listener => listener.resetHistory())
      runHook(_owner => {
        owner = _owner
        stop = useEventListener(target, events, listeners, options)
      })
    })

    it('should add all listeners for all events', () => {
      runHook(() => {
        listeners.forEach(listener => {
          events.forEach(event => {
            expect(addSpy).to.be.calledWith(event, listener, options)
          })
        })
      }, owner)
    })

    it('should call all listeners with all events', () => {
      runHook(() => {
        events.forEach((event, index) => {
          target.dispatchEvent(new Event(event))
          listeners.forEach(listener => expect(listener).to.be.callCount(index + 1))
        })
      }, owner)
    })

    it('should remove all listeners with all events', () => {
      runHook(() => {
        stop()

        listeners.forEach(listener => {
          events.forEach(event => {
            expect(removeSpy).to.be.calledWith(event, listener, options)
          })
        })
      }, owner)
    })
  })

  describe('multiple events', () => {
    let target: Accessor<HTMLDivElement | null>
    let setTarget: Setter<HTMLDivElement | null>
    let listener: Cypress.Agent<sinon.SinonSpy>

    beforeEach(() => {
      listener = cy.spy()
      ;[target, setTarget] = createSignal(document.createElement('div'))
    })

    it('should not listen when target is invalid', () => {
      return runAsyncHook(async () => {
        useEventListener(target, 'click', listener)
        const el = target()
        setTarget(null)
        await nextTick()
        el?.dispatchEvent(new MouseEvent('click'))
        await nextTick()

        expect(listener).to.be.callCount(0)
        expect(useEventListener(null, 'click', listener)).to.eq(noop)
      })
    })

    function getTargetName(useTarget: boolean) {
      return useTarget ? 'element' : 'window'
    }

    function getArgs(useTarget: boolean) {
      return useTarget ? [target, 'click', listener] : ['click', listener]
    }

    function trigger(useTarget: boolean) {
      ;(useTarget ? target() : window)!.dispatchEvent(new MouseEvent('click'))
    }

    function testTarget(useTarget: boolean) {
      it(`should ${getTargetName(useTarget)} listen event`, () => {
        return runAsyncHook(async () => {
          // @ts-expect-error mock different args
          useEventListener(...getArgs(useTarget))

          await nextTick()

          trigger(useTarget)

          expect(listener).to.be.callCount(1)
        })
      })

      it(`should ${getTargetName(useTarget)} manually stop listening event`, () => {
        return runAsyncHook(async () => {
          // @ts-expect-error mock different args
          const stop = useEventListener(...getArgs(useTarget))

          stop()

          await nextTick()

          trigger(useTarget)

          await nextTick()

          expect(listener).to.be.callCount(0)
        })
      })
    }

    testTarget(false)
    // testTarget(true)
  })

  it.only('should auto re-register', () => {
    return runAsyncHook(async () => {
      const [target, setTarget] = createSignal<HTMLElement>()
      const listener = cy.spy()
      const [options, setOptions] = createSignal<any>(false)
      useEventListener(target, 'click', listener, options)

      const el = document.createElement('div')
      const addSpy = cy.spy(el, 'addEventListener')
      const removeSpy = cy.spy(el, 'removeEventListener')
      setTarget(el)
      await nextTick()
      expect(addSpy).to.be.callCount(1)
      expect(addSpy).to.be.calledWith('click', listener, false)
      expect(removeSpy).to.be.callCount(0)

      setOptions(true)
      await nextTick()
      expect(addSpy).to.be.callCount(2)
      expect(addSpy).to.be.calledWith('click', listener, true)
      expect(removeSpy).to.be.callCount(1)
    })
  })
})
