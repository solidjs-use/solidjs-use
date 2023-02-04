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
})
