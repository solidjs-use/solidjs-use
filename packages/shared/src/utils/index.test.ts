import { createSignal } from 'solid-js'
import { createFilterWrapper, debounceFilter, throttleFilter } from './filters'
import { assert, clamp, hasOwn, isClient, isDef, isIOS, isObject, noop, now, rand, timestamp } from './is'
import { createSingletonPromise, increaseWithUnit, objectPick, promiseTimeout, objectOmit } from '.'

describe('utils', () => {
  it('increaseWithUnit', () => {
    expect(increaseWithUnit(100, 1)).to.eq(101)
    expect(increaseWithUnit('1px', 1)).to.eq('2px')
    expect(increaseWithUnit('-1em', 1)).to.eq('0em')
    expect(increaseWithUnit('1em', -1)).to.eq('0em')
    expect(increaseWithUnit('1em', -5)).to.eq('-4em')
    expect(increaseWithUnit('0.5vw', 1.5)).to.eq('2vw')
    expect(increaseWithUnit('100 %', 10)).to.eq('110 %')
    expect(increaseWithUnit('var(--cool)', -5)).to.eq('var(--cool)')
  })

  it('objectPick', () => {
    expect(objectPick({ a: 1, b: 2, c: 3 }, ['a', 'b'])).to.deep.equal({ a: 1, b: 2 })
    expect(objectPick({ a: 1, b: 2, c: undefined }, ['a', 'b'], true)).to.deep.equal({ a: 1, b: 2 })
  })

  it('objectOmit', () => {
    const obj = { a: 1, b: 2, c: 3 }

    expect(objectOmit(obj, ['a', 'b'])).to.deep.eq({ c: 3 })
    expect(obj).to.deep.eq({ a: 1, b: 2, c: 3 })
    expect(objectOmit({ a: 1, b: 2, c: undefined }, ['a', 'b'], true)).to.deep.eq({})
    expect(objectOmit({ a: 1, b: 2, c: undefined }, ['b', 'c'], true)).to.deep.eq({ a: 1 })
  })
})

describe('promise', () => {
  it('should promiseTimeout work', async () => {
    const [num, setNum] = createSignal(0)
    setTimeout(() => {
      setNum(1)
    }, 100)

    await promiseTimeout(100)

    expect(num()).to.eq(1)
  })

  it('should promiseTimeout throw timeout', async () => {
    await promiseTimeout(100, true).catch(error => {
      expect(error).to.eq('Timeout')
    })
  })

  it('should createSingletonPromise work', async () => {
    const createPromise = () => Promise.resolve(0)
    const wrapper = createSingletonPromise(createPromise)
    const promise1 = wrapper()
    const promise2 = wrapper()

    expect(promise1).to.eq(promise2)
    const value = await promise1
    expect(value).to.eq(0)
  })

  it('should createSingletonPromise reset', async () => {
    const cb = cy.spy()
    const createPromise = () => Promise.resolve(0).then(cb)
    const wrapper = createSingletonPromise(createPromise)
    const promise1 = wrapper()

    await wrapper.reset()
    expect(cb).to.be.called

    const promise2 = wrapper()
    expect(promise1).not.to.eq(promise2)
  })
})

describe('filters', () => {
  it('should debounce', () => {
    const debouncedFilterSpy = cy.spy()
    const filter = createFilterWrapper(debounceFilter(10), debouncedFilterSpy)
    setTimeout(filter, 10)
    setTimeout(filter, 10)

    cy.wait(100).then(() => {
      expect(debouncedFilterSpy).to.be.calledOnce
    })
  })

  it('should debounce twice', async () => {
    const debouncedFilterSpy = cy.spy()
    const filter = createFilterWrapper(debounceFilter(50), debouncedFilterSpy)

    setTimeout(filter, 50)
    await promiseTimeout(50)
    setTimeout(filter, 110)
    await promiseTimeout(200)

    expect(debouncedFilterSpy).to.be.calledTwice
  })

  it('should resolve & reject debounced fn', async () => {
    const debouncedSum = createFilterWrapper(
      debounceFilter(50, { rejectOnCancel: true }),
      (a: number, b: number) => a + b
    )

    const five = debouncedSum(2, 3)
    let nine: Promise<number> = Promise.resolve(0)
    setTimeout(() => {
      nine = debouncedSum(4, 5)
    }, 20)

    const fn = cy.spy()
    await five.catch(fn)

    await nine.then(res => {
      expect(res).to.be.eq(9)
    })
  })

  it('should debounce with signal', () => {
    const debouncedFilterSpy = cy.spy()
    const [debounceTime, setDebounceTime] = createSignal(0)
    const filter = createFilterWrapper(debounceFilter(debounceTime), debouncedFilterSpy)

    filter()
    setDebounceTime(50)
    filter()
    setTimeout(filter, 20)

    cy.wait(100).then(() => {
      expect(debouncedFilterSpy).to.be.calledTwice
    })
  })

  it('should throttle', () => {
    const throttledFilterSpy = cy.spy()
    const filter = createFilterWrapper(throttleFilter(20), throttledFilterSpy)

    setTimeout(filter, 10)
    setTimeout(filter, 10)
    setTimeout(filter, 10)
    setTimeout(filter, 10)

    cy.wait(50).then(() => {
      expect(throttledFilterSpy).to.be.calledTwice
    })
  })

  it('should throttle evenly', () => {
    const debouncedFilterSpy = cy.spy()
    const filter = createFilterWrapper(throttleFilter(20), debouncedFilterSpy)

    setTimeout(() => filter(1), 10)
    setTimeout(() => filter(2), 22)
    setTimeout(() => filter(3), 45)

    cy.wait(100).then(() => {
      expect(debouncedFilterSpy).to.be.callCount(3)
      expect(debouncedFilterSpy).to.be.calledWith(1)
      expect(debouncedFilterSpy).to.be.calledWith(2)
      expect(debouncedFilterSpy).to.be.calledWith(3)
    })
  })

  it('should throttle with Signal', () => {
    const debouncedFilterSpy = cy.spy()
    const [throttleTime, setThrottleTime] = createSignal(0)
    const filter = createFilterWrapper(throttleFilter(throttleTime), debouncedFilterSpy)

    filter()

    setThrottleTime(100)

    setTimeout(filter, 30)
    setTimeout(filter, 50)
    setTimeout(filter, 80)

    cy.wait(200).then(() => {
      expect(debouncedFilterSpy).to.be.calledTwice
    })
  })

  it('should not duplicate single event', () => {
    const debouncedFilterSpy = cy.spy()
    const filter = createFilterWrapper(throttleFilter(10), debouncedFilterSpy)

    setTimeout(filter, 5)

    cy.wait(20).then(() => {
      expect(debouncedFilterSpy).to.be.calledOnce
    })
  })

  it('should get trailing value', async () => {
    const sumSpy = cy.spy((a: number, b: number) => a + b)
    const throttledSum = createFilterWrapper(throttleFilter(50, true), sumSpy)

    let result = throttledSum(2, 3)
    setTimeout(() => {
      result = throttledSum(4, 5)
    }, 30)
    setTimeout(() => {
      result = throttledSum(6, 7)
    }, 40)

    await promiseTimeout(100)

    expect(sumSpy).to.be.callCount(2)
    const res1 = await result
    expect(res1).to.be.eq(6 + 7)

    setTimeout(() => {
      result = throttledSum(8, 9)
    }, 120)
    setTimeout(() => {
      result = throttledSum(10, 11)
    }, 150)

    await promiseTimeout(200)

    expect(sumSpy).to.be.callCount(4)
    const res2 = await result
    expect(res2).to.be.eq(10 + 11)
  })

  it('should get leading value', async () => {
    const sumSpy = cy.spy((a: number, b: number) => a + b)
    const throttledSum = createFilterWrapper(throttleFilter(50, false), sumSpy)

    let result = throttledSum(2, 3)
    setTimeout(() => {
      result = throttledSum(4, 5)
    }, 30)
    setTimeout(() => {
      result = throttledSum(6, 7)
    }, 40)

    await promiseTimeout(100)

    expect(sumSpy).to.be.callCount(1)
    const res = await result
    expect(res).to.be.eq(2 + 3)

    setTimeout(() => {
      result = throttledSum(8, 9)
    }, 120)
    setTimeout(() => {
      result = throttledSum(10, 11)
    }, 150)

    await promiseTimeout(200)

    const res2 = await result
    expect(res2).to.be.eq(8 + 9)
    expect(sumSpy).to.be.callCount(2)
  })
})

describe('is', () => {
  beforeEach(() => {
    console.warn = cy.spy()
  })

  it('should be client', () => {
    expect(isClient).to.be.true
  })

  it('should be IOS', () => {
    expect(isIOS).to.be.false
  })

  it('should assert', () => {
    assert(true)
    expect(console.warn).not.to.be.called
    assert(false, 'error')
    expect(console.warn).to.have.calledWith('error')
  })

  it('should be defined', () => {
    expect(isDef(null)).to.be.true
    expect(isDef(0)).to.be.true
    expect(isDef('')).to.be.true
    expect(isDef(undefined)).to.be.false
  })

  it('should be object', () => {
    expect(isObject({})).to.be.true
    expect(isObject(null)).to.be.false
    expect(isObject([])).to.be.false
  })

  it('should be now', () => {
    expect(now()).at.most(Date.now())
    expect(timestamp()).at.most(Date.now())
  })

  it('should clamp', () => {
    expect(clamp(1, 2, 3)).to.eq(2)
    expect(clamp(2, 1, 3)).to.eq(2)
  })

  it('should noop', () => {
    expect(noop()).to.be.undefined
  })

  it('should be rand', () => {
    expect(rand(1, 5)).to.be.within(1, 5)
  })

  it('should be rand', () => {
    class Parent {
      a = 1
    }
    class Child extends Parent {}
    function F() {}
    F.prototype.a = 1
    const obj1 = { a: 1 } as any
    const obj2 = new Child() as any
    const obj3 = new (F as any)()
    expect(hasOwn(obj1, 'a')).to.be.true
    expect(hasOwn(obj1, 'b')).to.be.false
    expect(hasOwn(obj2, 'a')).to.be.true
    expect(hasOwn(obj2, 'b')).to.be.false
    expect(hasOwn(obj3, 'a')).to.be.false

    obj3.a = 2
    expect(hasOwn(obj3, 'a')).to.be.true
  })
})
