import { runHook } from '@dream2023/cypress-solidjs'
import { useCounter } from '@solidjs-use/shared'
import { mountWithUnmount } from '@solidjs-use/test-utils'
import { events } from './internal'
import { useEventBus } from '.'

describe('useEventBus', () => {
  const emptyMap = new Map()
  beforeEach(() => {
    events.clear()
  })
  it('on event and off listener', () => {
    runHook(() => {
      const { on, off } = useEventBus<number>('foo')
      const { inc } = useCounter(0)
      on(inc)
      off(inc)
      expect(events).to.deep.equal(emptyMap)
    })
  })
  it('on event', () => {
    runHook(() => {
      let event = false
      const { emit, on, reset } = useEventBus<boolean>('on-event')
      on(_event => {
        event = _event
      })
      emit(true)
      expect(event).to.deep.equal(true)
      reset()
      expect(events).to.deep.equal(emptyMap)
    })
  })
  it('once event', () => {
    runHook(() => {
      const { once, emit, reset } = useEventBus<number>('foo')
      const { inc, count } = useCounter(0)
      once(inc)
      emit()
      emit()
      emit()
      expect(count()).to.deep.equal(1)
      reset()
      expect(events).to.deep.equal(emptyMap)
    })
  })
  it('on callback off event', () => {
    runHook(() => {
      const bus = useEventBus<number>('on-callback-off')
      const { count, inc } = useCounter(0)
      const off = bus.on(inc)
      bus.on(inc)
      off()
      bus.emit()
      bus.reset()
      expect(count()).to.deep.equal(1)
      expect(events).to.deep.equal(emptyMap)
    })
  })
  it('not off non-exist listener', () => {
    runHook(() => {
      const bus1 = useEventBus<number>('foo')
      const bus2 = useEventBus<number>('bar')
      const listener = cy.spy()

      bus1.on(listener)
      bus2.off(listener)

      expect(events.get('foo')).to.be.not.undefined
      expect(events.get('bar')).to.be.undefined
    })
  })
  it('not off other events listener', () => {
    runHook(() => {
      const bus1 = useEventBus<number>('foo')
      const bus2 = useEventBus<number>('bar')
      const listener1 = cy.spy()
      const listener2 = cy.spy()

      bus1.on(listener1)
      bus2.on(listener2)
      bus1.off(listener2)
      bus2.off(listener1)

      expect(events.get('foo')).to.be.not.undefined
      expect(events.get('bar')).to.be.not.undefined
    })
  })
  it('useEventBus off event', () => {
    runHook(() => {
      const { emit, on, reset } = useEventBus<number>('useEventBus-off')
      const { count, inc } = useCounter(0)
      on(inc)
      on(inc)
      on(inc)

      emit()
      reset()

      on(inc)
      on(inc)

      emit()
      reset()

      expect(count()).to.deep.equal(5)
      expect(events).to.deep.equal(emptyMap)
    })
  })
  it('event off event', () => {
    runHook(() => {
      const event1 = useEventBus<number>('event-off-1')
      const event2 = useEventBus<number>('event-off-2')
      const { count, inc } = useCounter(0)
      event1.on(inc)
      event2.on(inc)
      event1.emit() // 1
      event2.emit() // 2

      event1.reset()

      event1.on(inc)
      event2.on(inc)
      event1.emit() // 3
      event2.emit() // 5

      event1.reset()
      event2.reset()

      expect(count()).to.deep.equal(5)
      expect(events).to.deep.equal(emptyMap)
    })
  })

  it('setup unmount off', () => {
    const unmount = mountWithUnmount(() => {
      const { on } = useEventBus('setup-unmount')
      on(() => {})
      on(() => {})
      on(() => {})
      on(() => {})
      on(() => {})
    })

    unmount(() => {
      expect(events).to.deep.equal(emptyMap)
    })
  })

  it('should work with payload', () => {
    runHook(() => {
      const { on, emit } = useEventBus<'inc' | 'dec', number>('counter')
      const counter = useCounter(0)
      on((event, payload) => counter[event](payload))
      emit('inc', 3)
      expect(counter.count()).to.deep.equal(3)
      emit('dec', 1)
      expect(counter.count()).to.deep.equal(2)
    })
  })
})
