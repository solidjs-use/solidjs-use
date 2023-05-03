import { nextTick } from '@solidjs-use/shared'
import { runAsyncHook, runHook } from '@dream2023/cypress-ct-solid-js'
import { defaultWindow } from '../_configurable'
import { useCssVar } from '.'

describe('useCssVar', () => {
  it('should be defined', () => {
    expect(useCssVar).to.be.exist
  })

  it('should work', () => {
    runHook(() => {
      const el = document.createElement('div')
      const color = '--color'
      const [variable] = useCssVar(color, el, { initialValue: 'red' })

      expect(variable()).to.be.eq('red')
    })
  })

  it('should work observe', () => {
    return runAsyncHook(async () => {
      const window = defaultWindow
      const el = document.createElement('div')
      window?.document.body.appendChild(el)

      const color = '--color'
      const [variable] = useCssVar(color, el, { initialValue: 'red', observe: true })

      await nextTick()
      expect(variable()).to.be.eq('red')

      el.style.setProperty(color, 'blue')
      await nextTick()
      expect(variable()).to.be.eq('blue')
    })
  })
})
