import { promiseTimeout } from '@solidjs-use/shared'
import { useAsyncState } from '../useAsyncState'

describe('useAsyncState', () => {
  it('should be defined', () => {
    expect(useAsyncState).to.be.exist
  })

  const p1 = (num = 1) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(num)
      }, 50)
    })
  }
  const p2 = async (id?: string) => {
    if (!id) throw new Error('error')
    return id
  }

  it('should work', async () => {
    const { execute, state } = useAsyncState(p1, 0)
    expect(state()).to.be.eq(0)
    await execute(0, 2)
    expect(state()).to.be.eq(2)
  })

  it('should work with isLoading', () => {
    const { execute, isLoading } = useAsyncState(p1, 0, { immediate: false })
    expect(isLoading()).to.be.false
    execute(1)
    expect(isLoading()).to.be.true
  })

  it('should work with isReady', async () => {
    const { execute, isReady } = useAsyncState(p1, 0, { immediate: false })
    expect(isReady()).to.be.false
    await execute(1)
    expect(isReady()).to.be.true
  })

  it('should work with error', async () => {
    const { execute, error } = useAsyncState(p2, '0', { immediate: false })
    expect(error()).to.be.undefined
    await execute()
    expect(error()).to.be.instanceOf(Error)
  })

  it('should work with delay', async () => {
    const { execute, state } = useAsyncState(p1, 0, { delay: 100 })
    await promiseTimeout(50)
    expect(state()).to.be.eq(0)
    await execute(0, 2)
    expect(state()).to.be.eq(2)
  })

  it('should work with onSuccess', async () => {
    const onSuccess = cy.spy()
    const { execute } = useAsyncState(p1, 0, { onSuccess })
    await execute(0, 2)
    expect(onSuccess).to.be.called
    expect(onSuccess).to.be.callCount(2)
  })

  it('should work with onError', async () => {
    const onError = cy.spy()
    const { execute } = useAsyncState(p2, '0', { onError, immediate: false })
    await execute()
    expect(onError).to.be.called
    expect(onError).to.be.calledWith(new Error('error'))
  })
})
