import { runAsyncHook } from '@dream2023/cypress-solidjs'
import { mountWithUnmount } from '@solidjs-use/test-utils'
import { useScriptTag } from '.'

describe('useScriptTag', () => {
  const src = `${window.origin}/use-script-demo.js`

  const scriptTagElement = (): HTMLScriptElement | null => document.head.querySelector(`script[src="${src}"]`)

  beforeEach(() => {
    document.head.innerHTML = ''
  })

  it('should add script tag', () => {
    return runAsyncHook(async () => {
      const appendChildListener = cy.spy(document.head, 'appendChild')

      expect(appendChildListener).not.to.be.called

      expect(scriptTagElement()).to.be.null

      const { load, scriptTag } = useScriptTag(src, () => {}, { immediate: true })

      await load(true)
      expect(scriptTag()).to.be.instanceOf(HTMLScriptElement)
      expect(appendChildListener).to.be.called
    })
  })

  it('should re-use the same src for multiple loads', () => {
    return runAsyncHook(async () => {
      const addChildListener = cy.spy(document.head, 'appendChild')

      expect(addChildListener).not.to.be.called

      expect(scriptTagElement()).to.be.null

      const script1 = useScriptTag(src, () => {}, { immediate: false, manual: true })
      const script2 = useScriptTag(src, () => {}, { immediate: false, manual: true })

      await script1.load(true)
      await script2.load(true)

      expect(script1.scriptTag()).not.to.be.null
      expect(script2.scriptTag()).not.to.be.null

      expect(addChildListener).to.be.calledOnce
      expect(scriptTagElement()).to.be.instanceOf(HTMLScriptElement)
    })
  })

  it('should support custom attributes', () => {
    return runAsyncHook(async () => {
      const appendChildListener = cy.spy(document.head, 'appendChild')

      expect(appendChildListener).not.to.be.called

      expect(scriptTagElement()).to.be.null

      const { load } = useScriptTag(src, () => {}, {
        attrs: { id: 'id-value', 'data-test': 'data-test-value' },
        immediate: true
      })

      await load()
      expect(appendChildListener).to.be.called

      const element = scriptTagElement()
      expect(element).to.be.instanceOf(HTMLScriptElement)
      expect(element?.getAttribute('id')).to.eq('id-value')
      expect(element?.getAttribute('data-test')).to.eq('data-test-value')
    })
  })

  it('should remove script tag on unmount', () => {
    const removeChildListener = cy.spy(document.head, 'removeChild')
    expect(removeChildListener).not.to.be.called
    expect(scriptTagElement()).to.be.null

    const unmount = mountWithUnmount(() => {
      useScriptTag(src, () => {}, { immediate: true })
    })

    cy.get('head script').should('have.attr', 'src')
    unmount(() => {
      expect(removeChildListener).to.be.called
    })
  })

  it('should remove script tag on unload call', () => {
    return runAsyncHook(async () => {
      const removeChildListener = cy.spy(document.head, 'removeChild')

      expect(removeChildListener).not.to.be.called

      expect(scriptTagElement()).to.be.null

      const { scriptTag, load, unload } = useScriptTag(src, () => {}, { immediate: false })

      await load(true)

      expect(scriptTagElement()).to.be.instanceOf(HTMLScriptElement)

      unload()

      expect(scriptTagElement()).to.be.null

      expect(removeChildListener).to.be.called

      expect(scriptTag()).to.be.null
    })
  })

  it('should remove script tag on unload call after multiple loads', () => {
    return runAsyncHook(async () => {
      const removeChildListener = cy.spy(document.head, 'removeChild')

      expect(removeChildListener).not.to.be.called

      expect(scriptTagElement()).to.be.null

      const script1 = useScriptTag(src, () => {}, { immediate: false, manual: true })
      const script2 = useScriptTag(src, () => {}, { immediate: false, manual: true })

      // Multiple Loads
      await script1.load(true)
      await script2.load(true)

      expect(scriptTagElement()).to.be.instanceOf(HTMLScriptElement)

      script1.unload()
      script2.unload()

      expect(script1.scriptTag()).to.be.null
      expect(script2.scriptTag()).to.be.null
      expect(removeChildListener).to.be.calledOnce
      expect(scriptTagElement()).to.be.null
    })
  })
})
