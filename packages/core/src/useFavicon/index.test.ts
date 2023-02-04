import { createMemo, createSignal } from 'solid-js'
import { useFavicon } from '.'

describe('useFavicon', () => {
  it('no param', () => {
    const [favicon, setFavicon] = useFavicon()
    expect(favicon()).to.eq(null)
    setFavicon('https://www.google.at/favicon.ico')
    expect(favicon()).to.eq('https://www.google.at/favicon.ico')
  })

  it('const', () => {
    const [favicon, setFavicon] = useFavicon('v1')
    expect(favicon()).to.eq('v1')
    setFavicon('v2')
    expect(favicon()).to.eq('v2')
  })

  it('null', () => {
    const [favicon, setFavicon] = useFavicon(null)
    expect(favicon()).to.eq(null)
    setFavicon('v1')
    expect(favicon()).to.eq('v1')
  })

  it('undefined', () => {
    const [favicon, setFavicon] = useFavicon(undefined)
    expect(favicon()).to.eq(null)
    setFavicon('v1')
    expect(favicon()).to.eq('v1')
  })

  it('signal const', () => {
    const [target, setTarget] = createSignal('v1')
    const favicon = useFavicon(target)
    expect(favicon()).to.eq('v1')
    setTarget('v2')
    expect(favicon()).to.eq('v2')
  })

  it('signal null', () => {
    const [target] = createSignal(null)
    const favicon = useFavicon(target)
    expect(favicon()).to.eq(null)
  })

  it('signal undefined', () => {
    const [target] = createSignal(undefined)
    const favicon = useFavicon(target)
    expect(favicon()).to.eq(undefined)
  })

  it('memo', () => {
    const [onoff, setOnOff] = createSignal(1)
    const target = createMemo(() => (onoff() === 1 ? 'a.jpg' : 'b.jpg'))
    const favicon = useFavicon(target)
    expect(favicon()).to.eq('a.jpg')
    setOnOff(2)
    expect(favicon()).to.eq('b.jpg')
  })
})
