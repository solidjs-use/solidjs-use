import { nextTick } from '@solidjs-use/shared/solid-to-vue'
import { useWindowSize } from 'solidjs-use'

describe('useWindowSize', () => {
  it('should be defined', () => {
    expect(useWindowSize).not.to.be.undefined
  })

  it('should work', () => {
    const { width, height } = useWindowSize({ initialWidth: 100, initialHeight: 200 })

    expect(width()).to.eq(window.innerWidth)
    expect(height()).to.eq(window.innerHeight)
  })

  it('should exclude scrollbar', () => {
    const { width, height } = useWindowSize({ initialWidth: 100, initialHeight: 200, includeScrollbar: false })

    expect(width()).to.eq(window.document.documentElement.clientWidth)
    expect(height()).to.eq(window.document.documentElement.clientHeight)
  })

  it('sets handler for window "resize" event', async () => {
    const addEventListenerSpy = cy.spy(window, 'addEventListener')
    useWindowSize({ initialWidth: 100, initialHeight: 200, listenOrientation: false })

    await nextTick()

    expect(addEventListenerSpy).to.be.calledOnce

    const call = addEventListenerSpy.args[0]
    expect(call[0]).to.eq('resize')
    expect(call[2]).to.deep.equal({ passive: true })
  })

  it('sets handler for window "orientationchange" event', async () => {
    const addEventListenerSpy = cy.spy(window, 'addEventListener')
    useWindowSize({ initialWidth: 100, initialHeight: 200 })

    await nextTick()

    expect(addEventListenerSpy).to.be.callCount(2)

    const call = addEventListenerSpy.args[1] as any
    expect(call[0]).to.eq('orientationchange')
    expect(call[2]).to.deep.equal({ passive: true })
  })
})
