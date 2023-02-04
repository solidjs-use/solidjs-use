import { runAsyncHook, runHook } from '@dream2023/cypress-solidjs'
import { nextTick } from '@solidjs-use/shared/solid-to-vue'
import { createSignal, getOwner } from 'solid-js'
import { useFocusWithin } from '.'
import type { Accessor, Owner } from 'solid-js'

describe('useFocusWithin', () => {
  let parent: Accessor<HTMLFormElement>
  let child: Accessor<HTMLDivElement>
  let grandchild: Accessor<HTMLInputElement>
  let owner: Owner | null

  beforeEach(() => {
    runHook(() => {
      ;[parent] = createSignal(document.createElement('form'))
      parent().tabIndex = 0
      document.body.appendChild(parent())

      const childSignal = createSignal(document.createElement('div'))
      child = childSignal[0]
      child().tabIndex = 0
      parent().appendChild(child())

      const grandchildSignal = createSignal(document.createElement('input'))
      grandchild = grandchildSignal[0]
      grandchild().tabIndex = 0
      child().appendChild(grandchild())

      owner = getOwner()
    })
  })

  it('should be defined', () => {
    expect(useFocusWithin).to.be.exist
  })

  it('should initialize properly', () => {
    runHook(() => {
      const focused = useFocusWithin(parent)

      expect(focused()).to.be.false
    }, owner)
  })

  it('should track the state of the target itself', () => {
    return runAsyncHook(async () => {
      const focused = useFocusWithin(parent)

      expect(focused()).to.be.false

      await nextTick()
      parent()?.focus()

      await nextTick()
      expect(focused()).to.be.true

      await nextTick()
      parent()?.blur()
      expect(focused()).to.be.false
    }, owner)
  })

  it('should track the state of the targets descendants', () => {
    return runAsyncHook(async () => {
      const focused = useFocusWithin(parent)

      expect(focused()).to.be.false

      await nextTick()
      child()?.focus()
      expect(focused()).to.be.true

      await nextTick()
      child()?.blur()
      expect(focused()).to.be.false

      await nextTick()
      grandchild()?.focus()
      expect(focused()).to.be.true

      await nextTick()
      grandchild()?.blur()
      expect(focused()).to.be.false
    }, owner)
  })
})
