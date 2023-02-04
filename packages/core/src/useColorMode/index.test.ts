import { runAsyncHook } from '@dream2023/cypress-solidjs'
import { nextTick } from '@solidjs-use/shared/solid-to-vue'
import { usePreferredDark } from '../usePreferredDark'
import { useColorMode } from './index'

describe('useColorMode', () => {
  const storageKey = 'solidjs-use-color-scheme'
  const htmlEl = document.querySelector('html')
  let systemCurrentTheme = ''

  before(() => {
    const themeMedia = window.matchMedia('(prefers-color-scheme: light)')
    if (themeMedia.matches) {
      systemCurrentTheme = 'light'
    } else {
      systemCurrentTheme = 'dark'
    }
  })

  beforeEach(() => {
    localStorage.clear()
    htmlEl!.className = ''
  })

  it('should translate auto mode when prefer dark', () => {
    return runAsyncHook(async () => {
      const [mode, setMode] = useColorMode()
      await nextTick()
      setMode('auto')

      await nextTick()
      expect(mode()).to.be.eq(systemCurrentTheme)
      expect(localStorage.getItem(storageKey)).to.be.eq('auto')
      expect(htmlEl?.className).to.be.includes(systemCurrentTheme)
    })
  })

  it('should translate custom mode', () => {
    return runAsyncHook(async () => {
      const [mode, setMode] = useColorMode<'custom' | 'unknown'>({ modes: { custom: 'custom' } })
      await nextTick()
      setMode('custom')

      await nextTick()
      expect(mode()).to.be.eq('custom')
      expect(localStorage.getItem(storageKey)).to.be.eq('custom')
      expect(htmlEl?.className).to.match(/custom/)

      setMode('unknown')

      await nextTick()
      expect(mode()).to.be.eq('unknown')
      expect(localStorage.getItem(storageKey)).to.be.eq('unknown')
      expect(htmlEl?.className).to.be.eq('')
    })
  })

  it('should not persist mode into localStorage', () => {
    return runAsyncHook(async () => {
      const [mode, setMode] = useColorMode({ storageKey: null })
      await nextTick()
      setMode('auto')

      await nextTick()
      expect(mode()).to.be.eq(systemCurrentTheme)
      expect(localStorage.getItem(storageKey)).to.be.null
      expect(htmlEl?.className).to.be.includes(systemCurrentTheme)
    })
  })

  it('should set html attribute to be mode', () => {
    return runAsyncHook(async () => {
      const [mode, setMode] = useColorMode({ attribute: 'data-color-mode' })
      await nextTick()
      setMode('auto')

      await nextTick()
      expect(mode()).to.be.eq(systemCurrentTheme)
      expect(localStorage.getItem(storageKey)).to.be.eq('auto')
      expect(htmlEl?.getAttribute('data-color-mode')).to.be.includes(systemCurrentTheme)
    })
  })

  it('should not affect html when selector invalid', () => {
    return runAsyncHook(async () => {
      const [mode, setMode] = useColorMode({ selector: 'unknown' })
      await nextTick()
      setMode('auto')

      await nextTick()
      expect(mode()).to.be.eq(systemCurrentTheme)
      expect(localStorage.getItem(storageKey)).to.be.eq('auto')
      expect(htmlEl?.className).to.be.eq('')
    })
  })

  it('should call onChanged when mode changed', () => {
    let nextMode: any = null
    const onChanged = (mode: any, defaultOnChanged: any) => {
      nextMode = mode
      defaultOnChanged(mode)
    }

    return runAsyncHook(async () => {
      const [mode, setMode] = useColorMode({ onChanged })
      await nextTick()
      setMode('auto')
      expect(mode()).to.be.eq(systemCurrentTheme)
      expect(nextMode).to.be.eq(systemCurrentTheme)
      expect(localStorage.getItem(storageKey)).to.be.eq('auto')
      expect(htmlEl?.className).to.be.includes(systemCurrentTheme)
    })
  })

  it('should only change html class when preferred dark changed', () => {
    return runAsyncHook(async () => {
      const [mode] = useColorMode({ emitAuto: true })
      usePreferredDark()

      await nextTick()
      expect(mode()).to.be.eq('auto')
      expect(localStorage.getItem(storageKey)).to.be.eq('auto')
      expect(htmlEl?.className).to.be.includes(systemCurrentTheme)
    })
  })
})
