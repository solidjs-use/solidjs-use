import { isAccessor } from '@solidjs-use/solid-to-vue'
import { useToggle } from '.'

describe('useToggle', () => {
  it('should be defined', () => {
    expect(useToggle).to.be.not.undefined
  })

  it('default result', () => {
    const result = useToggle()
    const [value, toggle] = result

    expect(Array.isArray(result)).to.eq(true)
    expect(result.length).to.eq(2)

    expect(typeof toggle).to.eq('function')
    expect(isAccessor(value)).to.eq(true)
    expect(value()).to.eq(false)
  })

  it('default result with initialValue', () => {
    const result = useToggle(true)
    const [value, toggle] = result

    expect(Array.isArray(result)).to.eq(true)
    expect(result.length).to.eq(2)

    expect(typeof toggle).to.eq('function')
    expect(isAccessor(value)).to.eq(true)
    expect(value()).to.eq(true)
  })

  it('should toggle', () => {
    const result = useToggle()
    const [value, toggle] = result

    expect(toggle()).to.eq(true)
    expect(value()).to.eq(true)

    expect(toggle()).to.eq(false)
    expect(value()).to.eq(false)
  })

  it('should receive toggle param', () => {
    const result = useToggle()
    const [value, toggle] = result

    expect(toggle(false)).to.eq(false)
    expect(value()).to.eq(false)

    expect(toggle(true)).to.eq(true)
    expect(value()).to.eq(true)
  })

  it('should toggle with truthy & falsy', () => {
    const [value, toggle] = useToggle('ON', {
      truthyValue: 'ON',
      falsyValue: 'OFF'
    })

    expect(value()).to.eq('ON')
    expect(typeof toggle).to.eq('function')

    expect(toggle()).to.eq('OFF')
    expect(value()).to.eq('OFF')

    expect(toggle()).to.eq('ON')
    expect(value()).to.eq('ON')

    expect(toggle('OFF')).to.eq('OFF')
    expect(value()).to.eq('OFF')

    expect(toggle('ON')).to.eq('ON')
    expect(value()).to.eq('ON')
  })
})
