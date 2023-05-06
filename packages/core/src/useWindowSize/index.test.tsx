import { runAsyncHook, runHook } from '@dream2023/cypress-ct-solid-js'
import { nextTick } from '@solidjs-use/shared/solid-to-vue'
import { useWindowSize } from '.'

describe('useWindowSize', () => {
  it('should be defined', () => {
    expect(useWindowSize).not.to.be.undefined
  })

  it('should work', () => {
    runHook(() => {
      const { width, height } = useWindowSize({ initialWidth: 100, initialHeight: 200 })

      expect(width()).to.eq(window.innerWidth)
      expect(height()).to.eq(window.innerHeight)
    })
  })

  it('should exclude scrollbar', () => {
    runHook(() => {
      const { width, height } = useWindowSize({ initialWidth: 100, initialHeight: 200, includeScrollbar: false })

      expect(width()).to.eq(window.document.documentElement.clientWidth)
      expect(height()).to.eq(window.document.documentElement.clientHeight)
    })
  })

  it('sets handler for window "resize" event', () => {
    return runAsyncHook(async () => {
      const addEventListenerSpy = cy.spy(window, 'addEventListener')
      useWindowSize({ initialWidth: 100, initialHeight: 200, listenOrientation: false })

      await nextTick()

      expect(addEventListenerSpy).to.be.calledOnce

      const call = addEventListenerSpy.args[0]
      expect(call[0]).to.eq('resize')
      expect(call[2]).to.deep.equal({ passive: true })
    })
  })

  it('sets handler for window.matchMedia("(orientation: portrait)") change event', () => {
    return runAsyncHook(async () => {
      const matchMediaSpy = cy.spy(window, 'matchMedia')
      useWindowSize({ initialWidth: 100, initialHeight: 200 })

      await nextTick()

      expect(matchMediaSpy).to.be.callCount(1)

      const call = matchMediaSpy.args[0] as any
      expect(call[0]).to.eq('(orientation: portrait)')
    })
  })
})
