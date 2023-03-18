import { runAsyncHook } from '@dream2023/cypress-solidjs'
import { nextTick } from '@solidjs-use/shared/solid-to-vue'
import { usePointerSwipe } from './index'
import type { UsePointerSwipeOptions } from './index'

const mockPointerEventInit = (x: number, y: number): PointerEventInit => ({
  clientX: x,
  clientY: y
})

const mockPointerDown = (x: number, y: number) => new PointerEvent('pointerdown', mockPointerEventInit(x, y))
const mockPointerMove = (x: number, y: number) => new PointerEvent('pointermove', mockPointerEventInit(x, y))
const mockPointerUp = (x: number, y: number) => new PointerEvent('pointerup', mockPointerEventInit(x, y))

const mockPointerEvents = (target: Element, coords: number[][]) => {
  coords.forEach(([x, y], i) => {
    if (i === 0) target.dispatchEvent(mockPointerDown(x, y))
    else if (i === coords.length - 1) target.dispatchEvent(mockPointerUp(x, y))
    else target.dispatchEvent(mockPointerMove(x, y))
  })
}

describe('usePointerSwipe', () => {
  const target = document.createElement('div')
  target.id = 'target'
  // set to noop, else test will fail
  target.setPointerCapture = () => {}
  document.body.appendChild(target)

  const threshold = 30
  let onSwipeStart: Cypress.Agent<sinon.SinonSpy>
  let onSwipe: Cypress.Agent<sinon.SinonSpy>
  let onSwipeEnd: Cypress.Agent<sinon.SinonSpy>

  const options = (): UsePointerSwipeOptions => ({
    threshold,
    onSwipeStart,
    onSwipe,
    onSwipeEnd
  })

  beforeEach(() => {
    onSwipeStart = cy.spy()
    onSwipe = cy.spy()
    onSwipeEnd = cy.spy()
  })

  it('threshold is not exceeded', () => {
    return runAsyncHook(async () => {
      usePointerSwipe(target, options())
      await nextTick()
      mockPointerEvents(target, [
        [0, 0],
        [threshold - 1, 0],
        [threshold - 1, 0]
      ])
      expect(onSwipeStart.callCount).to.eq(1)
      expect(onSwipe.callCount).to.eq(0)
      expect(onSwipeEnd.callCount).to.eq(0)
    })
  })

  it('threshold is exceeded', () => {
    return runAsyncHook(async () => {
      usePointerSwipe(target, options())
      await nextTick()
      mockPointerEvents(target, [
        [0, 0],
        [threshold / 2, 0],
        [threshold, 0],
        [threshold, 0]
      ])

      expect(onSwipeStart).to.be.called
      expect(onSwipe).to.be.called
      expect(onSwipeEnd).to.be.called
      expect(onSwipeEnd).to.be.calledWith(Cypress.sinon.match.any, 'right')
    })
  })

  it('threshold is exceeded in between', () => {
    return runAsyncHook(async () => {
      usePointerSwipe(target, options())
      await nextTick()

      mockPointerEvents(target, [
        [0, 0],
        [threshold / 2, 0],
        [threshold, 0],
        [threshold - 1, 0],
        [threshold - 1, 0]
      ])

      expect(onSwipeStart).to.be.called
      expect(onSwipe).to.be.callCount(2)
      expect(onSwipeEnd).to.be.called
      expect(onSwipeEnd).to.be.calledWith(Cypress.sinon.match.any, 'none')
    })
  })

  it('reactivity', () => {
    return runAsyncHook(async () => {
      const { isSwiping, direction, distanceX, distanceY } = usePointerSwipe(target, options())
      await nextTick()

      target.dispatchEvent(mockPointerDown(0, 0))
      expect(isSwiping()).to.be.false
      expect(direction()).to.eq('none')
      expect(distanceX()).to.eq(0)
      expect(distanceY()).to.eq(0)

      target.dispatchEvent(mockPointerMove(threshold, threshold / 2))
      expect(isSwiping()).to.be.true
      expect(direction()).to.eq('right')
      expect(distanceX()).to.eq(-threshold)
      expect(distanceY()).to.eq(-threshold / 2)

      target.dispatchEvent(mockPointerUp(threshold, threshold / 2))
      expect(isSwiping()).to.be.false
      expect(direction()).to.eq('right')
      expect(distanceX()).to.eq(-threshold)
      expect(distanceY()).to.eq(-threshold / 2)
    })
  })

  it('not reactivity when pointer types not matched', () => {
    return runAsyncHook(async () => {
      const { isSwiping, direction, distanceX, distanceY } = usePointerSwipe(target, {
        ...options(),
        pointerTypes: ['touch']
      })
      await nextTick()

      target.dispatchEvent(mockPointerDown(0, 0))
      expect(isSwiping()).to.be.false
      expect(direction()).to.eq('none')
      expect(distanceX()).to.eq(0)
      expect(distanceY()).to.eq(0)

      target.dispatchEvent(mockPointerMove(threshold, threshold / 2))
      expect(isSwiping()).to.be.false
      expect(direction()).to.eq('none')
      expect(distanceX()).to.eq(0)
      expect(distanceY()).to.eq(0)

      target.dispatchEvent(mockPointerUp(threshold, threshold / 2))
      expect(isSwiping()).to.be.false
      expect(direction()).to.eq('none')
      expect(distanceX()).to.eq(0)
      expect(distanceY()).to.eq(0)
    })
  })

  it('not reactivity when pointer not down', () => {
    return runAsyncHook(async () => {
      const { isSwiping, direction, distanceX, distanceY } = usePointerSwipe(target, options())

      target.dispatchEvent(mockPointerMove(threshold, threshold / 2))
      expect(isSwiping()).to.be.false
      expect(direction()).to.eq('none')
      expect(distanceX()).to.eq(0)
      expect(distanceY()).to.eq(0)
    })
  })

  it('stop', () => {
    return runAsyncHook(async () => {
      const { isSwiping, direction, distanceX, distanceY, stop } = usePointerSwipe(target, {
        ...options(),
        pointerTypes: ['touch']
      })

      target.dispatchEvent(mockPointerDown(0, 0))
      expect(isSwiping()).to.be.false
      expect(direction()).to.eq('none')
      expect(distanceX()).to.eq(0)
      expect(distanceY()).to.eq(0)

      stop()

      target.dispatchEvent(mockPointerMove(threshold, threshold / 2))
      expect(isSwiping()).to.be.false
      expect(direction()).to.eq('none')
      expect(distanceX()).to.eq(0)
      expect(distanceY()).to.eq(0)
    })
  })
})
