import { retry } from '@solidjs-use/test-utils'
import { useAsyncQueue } from '.'

describe('useAsyncQueue', () => {
  const p1 = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(1000)
      }, 10)
    })
  }

  const p2 = (result: number) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(1000 + result)
      }, 20)
    })
  }

  const p3 = (result: number) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(1000 + result)
      }, 30)
    })
  }

  const pError = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('e'))
      }, 30)
    })
  }

  it('should return the tasks result', async () => {
    const { activeIndex, result } = useAsyncQueue([p1, p2, p3])
    await retry(() => {
      expect(activeIndex()).to.eq(2)
      expect(JSON.stringify(result)).to.eq(
        '[{"state":"fulfilled","data":1000},{"state":"fulfilled","data":2000},{"state":"fulfilled","data":3000}]'
      )
    })
  })

  it('should passed the current task result to the next task', async () => {
    const { activeIndex, result } = useAsyncQueue([p1, p2])
    await retry(() => {
      expect(activeIndex()).to.eq(1)
      expect(result[activeIndex()].data).to.eq(2000)
    })
  })

  it('should trigger onFinished when the tasks ends', async () => {
    const onFinishedSpy = cy.spy()
    const { activeIndex } = useAsyncQueue([p1, p2], {
      onFinished: onFinishedSpy
    })
    await retry(() => {
      expect(activeIndex()).to.eq(1)
      expect(onFinishedSpy).to.be.called
    })
  })

  it('should trigger onError when the tasks fails', async () => {
    const onErrorSpy = cy.spy()
    const { activeIndex } = useAsyncQueue([p3, pError], {
      onError: onErrorSpy
    })
    await retry(() => {
      expect(activeIndex()).to.eq(1)
      expect(onErrorSpy).to.be.calledOnce
    })
  })
})
