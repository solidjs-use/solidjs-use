import { createEventHook } from '.'

describe('createEventHook', () => {
  it('should be defined', () => {
    expect(createEventHook).to.be.not.undefined
  })

  it('should trigger event', () => {
    let message = ''

    const myFunction = () => {
      const resultEvent = createEventHook<string>()
      const exec = () => resultEvent.trigger('Hello World')
      return {
        exec,
        onResult: resultEvent.on
      }
    }

    const { exec, onResult } = myFunction()
    onResult(result => (message = result))
    exec()

    setTimeout(() => {}, 0)

    expect(message).to.eq('Hello World')
  })

  it('should add and remove event listener', () => {
    const listener = cy.spy()
    const { on, off, trigger } = createEventHook<string>()

    on(listener)

    trigger('xxx')

    expect(listener).to.callCount(1)

    off(listener)

    trigger('xxx')

    expect(listener).to.callCount(1)

    const { off: remove } = on(listener)

    trigger('xxx')

    expect(listener).to.callCount(2)

    remove()

    trigger('xxx')

    expect(listener).to.callCount(2)
  })

  it('should await trigger', async () => {
    let message = ''

    const myFunction = () => {
      const resultEvent = createEventHook<string>()
      const exec = () => resultEvent.trigger('Hello World')
      return {
        exec,
        onResult: resultEvent.on
      }
    }

    const { exec, onResult } = myFunction()
    onResult(
      result =>
        new Promise<number>(resolve => {
          setTimeout(() => {
            message = result
            resolve(2)
          }, 100)
        })
    )
    const result = await exec()

    expect(message).to.be.eq('Hello World')
    expect(result).to.be.deep.eq([2])
  })

  it('the same listener should fire only once', () => {
    const listener = cy.spy()
    const { on, trigger, off } = createEventHook<string>()
    on(listener)
    on(listener)
    trigger('xxx')
    off(listener)
    expect(listener).to.be.callCount(1)
  })
})
