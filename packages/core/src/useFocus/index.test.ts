import { runAsyncHook, runHook } from '@dream2023/cypress-ct-solid-js'
import { nextTick } from '@solidjs-use/shared/solid-to-vue'
import { retry } from '@solidjs-use/test-utils'
import { createSignal } from 'solid-js'
import { useFocus } from '.'
import type { Accessor } from 'solid-js'

describe('useFocus', () => {
  let target: Accessor<HTMLButtonElement>

  beforeEach(() => {
    target = createSignal(document.createElement('button'))[0]
    target().tabIndex = 0
    document.body.appendChild(target())
  })

  it('should be defined', () => {
    expect(useFocus).to.be.exist
  })

  it('should initialize properly', () => {
    runHook(() => {
      const [focused] = useFocus(target)

      expect(focused()).to.be.false
    })
  })

  it('reflect focus state in reactive Accessor value', () => {
    return runAsyncHook(async () => {
      const [focused] = useFocus(target)

      await nextTick()
      expect(focused()).to.be.false

      target()?.focus()
      await nextTick()
      expect(focused()).to.be.true

      target()?.blur()
      await nextTick()
      expect(focused()).to.be.false
    })
  })

  it('reflect reactive Accessor `focused` state changes in DOM', () => {
    return runAsyncHook(async () => {
      const [focused, setFocused] = useFocus(target)

      await nextTick()
      expect(focused()).to.be.false

      setFocused(true)

      await retry(() => expect(document.activeElement).to.be.eq(target()))

      setFocused(false)
      await retry(() => expect(document.activeElement).not.to.be.eq(target()))
    })
  })

  describe('when target is missing', () => {
    it('should initialize properly', () => {
      runHook(() => {
        const [focused] = useFocus(null)

        expect(focused()).to.be.false
      })
    })
  })

  describe('when initialValue=true passed in', () => {
    it('should initialize focus', () => {
      return runAsyncHook(async () => {
        const [focused] = useFocus(target, { initialValue: true })

        await retry(() => {
          expect(document.activeElement).to.be.eq(target())
          expect(focused()).to.be.true
        })
      })
    })
  })
})
