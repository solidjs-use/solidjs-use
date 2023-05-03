import { runAsyncHook } from '@dream2023/cypress-ct-solid-js'
import { promiseTimeout } from '@solidjs-use/shared'
import { nextTick } from '@solidjs-use/shared/solid-to-vue'
import { createMemo, createSignal } from 'solid-js'
import { asyncMemo, createAsyncMemo } from '.'

describe('createAsyncMemo', () => {
  it('export module', () => {
    expect(createAsyncMemo).to.be.exist
    expect(asyncMemo).to.be.exist
  })

  it('is not lazy by default', () => {
    return runAsyncHook(async () => {
      const func = cy.spy(() => Promise.resolve('data'))

      const data = createAsyncMemo(func)

      await nextTick()
      expect(func).to.be.callCount(1)

      expect(data()).to.be.undefined

      await promiseTimeout(10)

      expect(data()).to.be.eq('data')
    })
  })

  it('call onError when error is thrown', () => {
    return runAsyncHook(async () => {
      let errorMessage
      const func = cy.spy(async () => {
        throw new Error('An Error Message')
      })

      const data = createAsyncMemo(func, undefined, {
        onError(e) {
          if (e instanceof Error) errorMessage = e.message
        }
      })
      await nextTick()
      expect(func).to.be.callCount(1)

      expect(data()).to.be.undefined

      await promiseTimeout(10)

      expect(data()).to.be.undefined
      expect(errorMessage).to.be.eq('An Error Message')
    })
  })

  it('re-computes when dependency changes', () => {
    return runAsyncHook(async () => {
      const [counter, setCounter] = createSignal(1)
      const double = createAsyncMemo(() => {
        const result = counter() * 2
        return Promise.resolve(result)
      })

      await nextTick()
      expect(double()).to.be.undefined

      await nextTick()

      expect(double()).to.be.eq(2)

      setCounter(2)
      expect(double()).to.be.eq(2)

      await nextTick()

      expect(double()).to.be.eq(4)
    })
  })

  it('uses last result', () => {
    return runAsyncHook(async () => {
      const [evaluating, setEvaluating] = createSignal(false)
      const resolutions: Array<() => void> = []

      const [counter, setCounter] = createSignal(1)
      const double = createAsyncMemo(
        () => {
          const result = counter() * 2
          return new Promise(resolve => resolutions.push(() => resolve(result)))
        },
        undefined,
        setEvaluating
      )

      await nextTick()
      await nextTick()
      expect(double()).to.be.undefined
      expect(evaluating()).to.be.eq(true)
      expect(resolutions.length).to.eq(1)

      resolutions[0]()
      await nextTick()
      await nextTick()

      expect(double()).to.be.eq(2)
      expect(evaluating()).to.be.eq(false)

      setCounter(2)
      await nextTick()
      setCounter(3)
      await nextTick()
      setCounter(4)
      await nextTick()

      expect(evaluating()).to.be.eq(true)
      expect(resolutions.length).to.eq(4)

      resolutions[1]()
      await nextTick()
      await nextTick()

      expect(evaluating()).to.be.eq(true)
      expect(double()).to.be.eq(2)

      resolutions[3]()
      await nextTick()
      await nextTick()

      expect(evaluating()).to.be.eq(false)
      expect(double()).to.be.eq(8)

      resolutions[2]()
      await nextTick()
      await nextTick()

      expect(evaluating()).to.be.eq(false)
      expect(double()).to.be.eq(8)
    })
  })

  it('evaluating works', () => {
    return runAsyncHook(async () => {
      const [evaluating, setEvaluating] = createSignal(false)

      const data = createAsyncMemo(
        () => new Promise(resolve => setTimeout(() => resolve('data'), 0)),
        undefined,
        setEvaluating
      )

      await nextTick()
      await nextTick()
      expect(data()).to.be.undefined
      expect(evaluating()).to.be.eq(true)

      await new Promise(resolve => setTimeout(resolve, 0))

      expect(evaluating()).to.be.eq(false)
      expect(data()).to.be.eq('data')
    })
  })

  it('triggers', () => {
    return runAsyncHook(async () => {
      const [counter, setCounter] = createSignal(1)
      const double = createAsyncMemo(() => {
        const result = counter() * 2
        return Promise.resolve(result)
      })
      const other = createMemo(() => {
        return double() + 1
      })

      expect(double()).to.be.undefined

      await nextTick()
      await nextTick()

      expect(double()).to.be.eq(2)

      setCounter(2)
      expect(double()).to.be.eq(2)
      expect(other()).to.be.eq(3)

      await nextTick()
      await nextTick()

      expect(double()).to.be.eq(4)
      expect(other()).to.be.eq(5)
    })
  })

  it('cancel is called', () => {
    const onCancel = cy.spy()
    const [_evaluating, setEvaluating] = createSignal(false)
    return runAsyncHook(async () => {
      const [data, setData] = createSignal('initial')
      const uppercase = createAsyncMemo(
        cancel => {
          cancel(onCancel)

          const upperCased = data().toUpperCase()

          return new Promise(resolve => {
            setTimeout(resolve.bind(null, upperCased), 5)
          })
        },
        '',
        setEvaluating
      )

      expect(uppercase()).to.be.eq('')

      expect(onCancel).to.be.callCount(0)
      await promiseTimeout(10)

      expect(uppercase()).to.be.eq('INITIAL')

      setData('to be cancelled')
      await nextTick()
      await nextTick()
      expect(onCancel).to.be.callCount(0)

      setData('final')
      await nextTick()
      expect(onCancel).to.be.callCount(1)

      await promiseTimeout(10)

      expect(uppercase()).to.be.eq('FINAL')
    })
  })
})
