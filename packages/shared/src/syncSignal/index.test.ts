import { runAsyncHook } from '@dream2023/cypress-solidjs'
import { nextTick } from '@solidjs-use/solid-to-vue'
import { createSignal } from 'solid-js'
import { syncSignal } from '.'

describe('syncSignal', () => {
  it('should work', () => {
    return runAsyncHook(async () => {
      const a = createSignal('foo')
      const b = createSignal('bar')

      const stop = syncSignal(a, b)
      await nextTick()
      expect(b[0]()).to.be.eq('foo')
      a[1]('bar')

      await nextTick()
      expect(a[0]()).to.be.eq('bar')
      expect(b[0]()).to.be.eq('bar')

      b[1]('foo')
      await nextTick()
      expect(a[0]()).to.be.eq('foo')
      expect(b[0]()).to.be.eq('foo')

      stop()

      a[1]('bar2')

      await nextTick()
      expect(a[0]()).to.be.eq('bar2')
      expect(b[0]()).to.be.eq('foo')
    })
  })

  it('trl', () => {
    return runAsyncHook(async () => {
      const left = createSignal('left')
      const right = createSignal('right')

      syncSignal(left, right, { direction: 'rtl' })

      await nextTick()
      expect(left[0]()).to.be.eq('right')
      expect(right[0]()).to.be.eq('right')

      left[1]('bar')

      await nextTick()
      expect(left[0]()).to.be.eq('bar')
      expect(right[0]()).to.be.eq('right')

      right[1]('foobar')

      await nextTick()
      expect(left[0]()).to.be.eq('foobar')
      expect(right[0]()).to.be.eq('foobar')
    })
  })

  it('works with mutual convertors', () => {
    return runAsyncHook(async () => {
      const left = createSignal(10)
      const right = createSignal(1)

      syncSignal(left, right, {
        transform: {
          ltr: left => left * 2,
          rtl: right => Math.round(right / 2)
        }
      })

      // check immediately sync
      await nextTick()
      expect(right[0]()).to.be.eq(20)
      expect(left[0]()).to.be.eq(10)

      left[1](30)
      await nextTick()
      expect(right[0]()).to.be.eq(60)
      expect(left[0]()).to.be.eq(30)

      right[1](10)
      await nextTick()
      expect(right[0]()).to.be.eq(10)
      expect(left[0]()).to.be.eq(5)
    })
  })

  it('works with only rtl convertor', () => {
    return runAsyncHook(async () => {
      const left = createSignal(10)
      const right = createSignal(2)

      syncSignal(left, right, {
        direction: 'rtl',
        transform: {
          rtl: right => Math.round(right / 2)
        }
      })

      // check immediately sync
      await nextTick()
      expect(right[0]()).to.be.eq(2)
      expect(left[0]()).to.be.eq(1)

      left[1](10)
      await nextTick()
      expect(right[0]()).to.be.eq(2)
      expect(left[0]()).to.be.eq(10)

      right[1](10)

      await nextTick()
      expect(right[0]()).to.be.eq(10)
      expect(left[0]()).to.be.eq(5)
    })
  })
})
