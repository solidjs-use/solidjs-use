import { nextTick } from '@solidjs-use/solid-to-vue'
import { createEffect, createSignal } from 'solid-js'
import { mutableMemo } from '.'

describe('mutableMemo', () => {
  it('should work', () => {
    const [count, setCount] = createSignal(0)

    const state = mutableMemo(() => {
      return {
        count: count()
      }
    })

    expect(state.count).to.eq(0)

    setCount(state => state + 1)

    expect(state.count).to.eq(1)
  })

  it('should work with dynamic props', async () => {
    const [foo, setFoo] = createSignal(false)

    const state = mutableMemo(() => {
      return foo() ? { foo: true, type: 'foo' } : { bar: true, type: 'bar' }
    })

    let type

    createEffect(() => {
      type = state.type
    })

    expect(state.foo).to.eq(undefined)
    expect(state.bar).to.eq(true)
    expect(type).to.eq('bar')

    setFoo(true)

    expect(state.foo).to.eq(true)
    expect(state.bar).to.eq(undefined)

    await nextTick()

    expect(type).to.eq('foo')
  })
})
