import { createUnAccessorFn } from '.'

describe('createUnAccessorFn', () => {
  it('should be defined', () => {
    expect(createUnAccessorFn).to.exist
  })

  it('should return a function that returns the same value', () => {
    const value = 42
    const fn = (value: any) => value
    const res = fn(value)
    const resWrapped = createUnAccessorFn(fn)(value)
    expect(res).to.eq(resWrapped)
  })
})
