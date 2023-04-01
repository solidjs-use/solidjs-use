import { runAsyncHook } from '@dream2023/cypress-solidjs'
import { nextTick } from '@solidjs-use/shared/solid-to-vue'
import { createSignal } from 'solid-js'
import { onKeyStroke } from '.'
import type { Accessor } from 'solid-js'
import type { KeyStrokeEventName } from '.'

describe('onKeyStroke', () => {
  let element: Accessor<HTMLElement>
  let callBackFn: any

  beforeEach(() => {
    ;[element] = createSignal(document.createElement('div'))
    callBackFn = cy.spy()
  })

  function createKeyEvent(key: string, type: KeyStrokeEventName, repeat = false) {
    const ev = new KeyboardEvent(type, { key, repeat })
    element().dispatchEvent(ev)
  }

  it('listen to single key', () => {
    return runAsyncHook(async () => {
      onKeyStroke('A', callBackFn, { target: element })
      await nextTick()
      createKeyEvent('A', 'keydown')
      createKeyEvent('B', 'keydown')
      expect(callBackFn).to.be.callCount(1)
    })
  })

  it('listen to multi keys', () => {
    return runAsyncHook(async () => {
      onKeyStroke(['A', 'B', 'C'], callBackFn, { target: element })
      await nextTick()
      createKeyEvent('A', 'keydown')
      createKeyEvent('B', 'keydown')
      createKeyEvent('C', 'keydown')
      createKeyEvent('D', 'keydown')
      expect(callBackFn).to.be.callCount(3)
    })
  })

  it('use function filter', () => {
    return runAsyncHook(async () => {
      const filter = (event: KeyboardEvent) => {
        return event.key === 'A'
      }
      onKeyStroke(filter, callBackFn, { target: element })
      await nextTick()
      createKeyEvent('A', 'keydown')
      createKeyEvent('B', 'keydown')
      createKeyEvent('C', 'keydown')
      expect(callBackFn).to.be.callCount(1)
    })
  })

  it('listen to all keys by boolean', () => {
    return runAsyncHook(async () => {
      onKeyStroke(true, callBackFn, { target: element })
      await nextTick()
      createKeyEvent('A', 'keydown')
      createKeyEvent('B', 'keydown')
      createKeyEvent('C', 'keydown')
      createKeyEvent('D', 'keydown')
      createKeyEvent('E', 'keydown')
      expect(callBackFn).to.be.callCount(5)
    })
  })

  it('listen to all keys by constructor', () => {
    return runAsyncHook(async () => {
      onKeyStroke(callBackFn, { target: element })
      await nextTick()
      createKeyEvent('A', 'keydown')
      createKeyEvent('B', 'keydown')
      createKeyEvent('C', 'keydown')
      createKeyEvent('D', 'keydown')
      createKeyEvent('E', 'keydown')
      expect(callBackFn).to.be.callCount(5)
    })
  })

  it('listen to keypress', () => {
    return runAsyncHook(async () => {
      onKeyStroke('A', callBackFn, { target: element, eventName: 'keypress' })
      await nextTick()
      createKeyEvent('A', 'keydown')
      createKeyEvent('B', 'keydown')
      createKeyEvent('A', 'keypress')
      createKeyEvent('B', 'keypress')
      expect(callBackFn).to.be.callCount(1)
    })
  })

  it('ignore repeated events', () => {
    return runAsyncHook(async () => {
      onKeyStroke('A', callBackFn, { target: element, dedupe: true })
      await nextTick()
      createKeyEvent('A', 'keydown', false)
      createKeyEvent('A', 'keydown', true)
      createKeyEvent('A', 'keydown', true)
      createKeyEvent('A', 'keydown', true)
      expect(callBackFn).to.be.callCount(1)
    })
  })
})
