import { runAsyncHook } from '@dream2023/cypress-solidjs'
import { promiseTimeout } from '@solidjs-use/shared'
import { createSignal } from 'solid-js'
import { executeTransition, useCssTransition } from '.'

const expectBetween = (val: number, floor: number, ceiling: number) => {
  expect(val).to.be.greaterThan(floor)
  expect(val).to.be.lessThan(ceiling)
}

describe('executeTransition', () => {
  it('transitions between numbers', () => {
    return runAsyncHook(async () => {
      const [source, setSource] = createSignal(0)

      const trans = executeTransition([source, setSource], 0, 1, { duration: 50 })

      await promiseTimeout(25)

      expectBetween(source(), 0.25, 0.75)

      await trans

      expect(source()).to.be.eq(1)
    })
  })

  it('transitions between vectors', () => {
    return runAsyncHook(async () => {
      const [source, setSource] = createSignal([0, 0, 0])

      const trans = executeTransition([source, setSource], [0, 1, 2], [1, 2, 3], { duration: 50 })

      await promiseTimeout(25)

      expectBetween(source()[0], 0, 1)
      expectBetween(source()[1], 1, 2)
      expectBetween(source()[2], 2, 3)

      await trans

      expect(source()[0]).to.be.eq(1)
      expect(source()[1]).to.be.eq(2)
      expect(source()[2]).to.be.eq(3)
    })
  })

  it('transitions can be aborted', () => {
    return runAsyncHook(async () => {
      let abort = false

      const [source, setSource] = createSignal(0)

      const trans = executeTransition([source, setSource], 0, 1, {
        abort: () => abort,
        duration: 50
      })

      await promiseTimeout(25)

      abort = true

      await trans

      expectBetween(source(), 0, 1)
    })
  })
})

describe('useCssTransition', () => {
  it('transitions between numbers', () => {
    return runAsyncHook(async () => {
      const [source, setSource] = createSignal(0)
      const transition = useCssTransition(source, { duration: 100 })

      expect(transition()).to.be.eq(0)

      setSource(1)

      await promiseTimeout(50)
      expectBetween(transition(), 0, 1)

      await promiseTimeout(100)
      expect(transition()).to.be.eq(1)
    })
  })

  it('transitions between vectors', () => {
    return runAsyncHook(async () => {
      const [source, setSource] = createSignal([0, 0])
      const transition = useCssTransition(source, { duration: 100 })

      expect(transition()).to.be.deep.eq([0, 0])

      setSource([1, 1])

      await promiseTimeout(50)
      expectBetween(transition()[0], 0, 1)
      expectBetween(transition()[1], 0, 1)

      await promiseTimeout(100)
      expect(transition()[0]).to.be.eq(1)
      expect(transition()[1]).to.be.eq(1)
    })
  })

  it('supports cubic bezier curves', () => {
    return runAsyncHook(async () => {
      const [source, setSource] = createSignal(0)

      // https://cubic-bezier.com/#0,2,0,1
      const easeOutBack = useCssTransition(source, {
        duration: 100,
        transition: [0, 2, 0, 1]
      })

      // https://cubic-bezier.com/#1,0,1,-1
      const easeInBack = useCssTransition(source, {
        duration: 100,
        transition: [1, 0, 1, -1]
      })

      setSource(1)

      await promiseTimeout(50)
      expectBetween(easeOutBack(), 1, 2)
      expectBetween(easeInBack(), -1, 0)

      await promiseTimeout(100)
      expect(easeOutBack()).to.be.eq(1)
      expect(easeInBack()).to.be.eq(1)
    })
  })

  it('supports custom easing functions', () => {
    return runAsyncHook(async () => {
      const [source, setSource] = createSignal(0)
      const linear = cy.spy(n => n)
      const transition = useCssTransition(source, {
        duration: 100,
        transition: linear
      })

      expect(linear).not.to.be.called

      setSource(1)

      await promiseTimeout(50)
      expect(linear).to.be.called
      expectBetween(transition(), 0, 1)

      await promiseTimeout(100)
      expect(transition()).to.be.eq(1)
    })
  })

  it('supports delayed transitions', () => {
    return runAsyncHook(async () => {
      const [source, setSource] = createSignal(0)

      const transition = useCssTransition(source, {
        delay: 100,
        duration: 100
      })

      setSource(1)

      await promiseTimeout(50)
      expect(transition()).to.be.eq(0)

      await promiseTimeout(100)
      expectBetween(transition(), 0, 1)
    })
  })

  it('supports dynamic transitions', () => {
    return runAsyncHook(async () => {
      const [source, setSource] = createSignal(0)
      const first = cy.spy(n => n)
      const second = cy.spy(n => n)
      const [easingFn, setEasingFn] = createSignal(first)

      useCssTransition(source, {
        duration: 100,
        transition: easingFn
      })

      expect(first).not.to.be.called
      expect(second).not.to.be.called

      setSource(1)

      await promiseTimeout(50)
      expect(first).to.be.called
      expect(second).not.to.be.called
      first.resetHistory()
      second.resetHistory()

      setEasingFn(second)
      setSource(2)

      await promiseTimeout(100)
      // expect(first).not.to.be.called
      expect(second).to.be.called
    })
  })

  it('supports dynamic durations', () => {
    return runAsyncHook(async () => {
      const [source, setSource] = createSignal(0)
      const [duration, setDuration] = createSignal(100)
      const transition = useCssTransition(source, { duration })

      setSource(1)

      await promiseTimeout(50)
      expectBetween(transition(), 0, 1)

      await promiseTimeout(100)
      expect(transition()).to.be.eq(1)

      setDuration(200)
      setSource(2)

      await promiseTimeout(150)
      expectBetween(transition(), 1, 2)

      await promiseTimeout(100)
      expect(transition()).to.be.eq(2)
    })
  })

  it('fires onStarted and onFinished callbacks', () => {
    return runAsyncHook(async () => {
      const [source, setSource] = createSignal(0)
      const onStarted = cy.spy()
      const onFinished = cy.spy()

      useCssTransition(source, {
        duration: 100,
        onStarted,
        onFinished
      })

      expect(onStarted).not.to.be.called
      expect(onFinished).not.to.be.called

      setSource(1)

      await promiseTimeout(50)
      expect(onStarted).to.be.called
      expect(onFinished).not.to.be.called

      onStarted.resetHistory()
      onFinished.resetHistory()

      await promiseTimeout(100)
      expect(onStarted).not.to.be.called
      expect(onFinished).to.be.called
    })
  })

  it('clears pending transitions before starting a new one', () => {
    return runAsyncHook(async () => {
      const [source, setSource] = createSignal(0)
      const onStarted = cy.spy()
      const onFinished = cy.spy()

      useCssTransition(source, {
        delay: 100,
        duration: 100,
        onFinished,
        onStarted
      })

      await promiseTimeout(150)
      setSource(1)
      await promiseTimeout(50)
      setSource(2)
      await promiseTimeout(250)
      expect(onStarted).to.be.callCount(2)
      expect(onFinished).to.be.callCount(2)
    })
  })

  it('can be disabled for sychronous changes', () => {
    return runAsyncHook(async () => {
      const onStarted = cy.spy()
      const [disabled, setDisabled] = createSignal(false)
      const [source, setSource] = createSignal(0)

      const transition = useCssTransition(source, {
        disabled,
        duration: 100,
        onStarted
      })

      setDisabled(true)
      setSource(1)

      expect(transition()).to.be.eq(1)
      await promiseTimeout(150)
      expect(onStarted).not.to.be.called
      setDisabled(false)
      expect(transition()).to.be.eq(1)
    })
  })

  it('begins transition from where previous transition was interrupted', () => {
    return runAsyncHook(async () => {
      const [source, setSource] = createSignal(0)

      const transition = useCssTransition(source, {
        duration: 100
      })

      setSource(1)

      await promiseTimeout(50)

      setSource(0)

      await promiseTimeout(25)

      expectBetween(transition(), 0, 0.5)
    })
  })
})
