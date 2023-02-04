import { runAsyncHook } from '@dream2023/cypress-solidjs'
import { nextTick } from '@solidjs-use/solid-to-vue'
import { createEffect, createSignal } from 'solid-js'
import { toReactive } from '.'

describe('toRefs', () => {
  it('should be defined', () => {
    expect(toReactive).to.be.exist
  })

  it('should work', () => {
    const [r, setR] = createSignal({ a: 'a', b: 0 })
    const state = toReactive(r)
    expect(state.a).to.be.eq('a')
    expect(state.b).to.be.eq(0)

    setR({
      a: 'b',
      b: 1
    })
    expect(state.a).to.be.eq('b')
    expect(state.b).to.be.eq(1)
  })

  it('should be enumerable', () => {
    const obj = { a: 'a', b: 0 }
    const [r] = createSignal(obj)
    const state = toReactive(r)

    expect(JSON.stringify(state)).to.be.eq(JSON.stringify(r()))
    expect(state).to.deep.eq(obj)
  })

  it('should be reactive', () => {
    return runAsyncHook(async () => {
      const [r, setR] = createSignal({ a: 'a', b: 0 })
      const state = toReactive(r)
      let dummy = 0

      expect(state.a).to.be.eq('a')
      expect(state.b).to.be.eq(0)

      createEffect(() => {
        dummy = state.b
      })

      expect(dummy).to.be.eq(0)

      setR(r => ({ ...r, b: r.b + 1 }))
      await nextTick()
      expect(dummy).to.be.eq(1)
    })
  })

  it('should be replaceable', () => {
    return runAsyncHook(async () => {
      const [r, setR] = createSignal<any>({ a: 'a', b: 0 })
      const state = toReactive(r)
      let dummy = 0

      expect(state.a).to.be.eq('a')
      expect(state.b).to.be.eq(0)

      createEffect(() => {
        dummy = state.b
      })

      expect(dummy).to.be.eq(0)

      setR({
        b: 1,
        a: 'a'
      })
      await nextTick()
      expect(dummy).to.be.eq(1)
    })
  })
})
