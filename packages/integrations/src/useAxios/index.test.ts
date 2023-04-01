import { runAsyncHook } from '@dream2023/cypress-solidjs'
import { nextTick } from '@solidjs-use/solid-to-vue'
import axios from 'axios'
import { useAxios } from '.'
import type { RawAxiosRequestConfig } from 'axios'

describe('useAxios', () => {
  const url = `${window.origin}/todos/1.json`
  const config: RawAxiosRequestConfig = {
    method: 'GET'
  }
  const instance = axios.create({
    baseURL: window.origin
  })
  const options = { immediate: false }
  const path = '/todos/1.json'
  it('params: url', () => {
    return runAsyncHook(async () => {
      const { isFinished, data, then } = useAxios(url)
      await nextTick()
      expect(isFinished()).to.be.false
      const onRejected = cy.spy()

      await then(result => {
        expect(data().id).to.be.eq(1)
        expect(result.data()).to.be.eq(data())
        expect(isFinished()).to.be.true
        expect(onRejected).to.be.callCount(0)
      }, onRejected)
    })
  })

  it('params: url config', () => {
    return runAsyncHook(async () => {
      const { isFinished, then } = useAxios(url, config)
      expect(isFinished()).to.be.false
      const onRejected = cy.spy()

      await then().then(result => {
        expect(result.data().id).to.be.eq(1)
        expect(isFinished()).to.be.true
        expect(onRejected).to.be.callCount(0)
      }, onRejected)
    })
  })

  it('params: url config options', () => {
    return runAsyncHook(async () => {
      const { isLoading, execute, then } = useAxios(url, config, options)
      expect(isLoading()).to.be.false
      execute(`${window.origin}/todos/2.json`)
      expect(isLoading()).to.be.true
      const onRejected = cy.spy()

      const result = await then(undefined, onRejected)
      expect(result.data().id).to.be.eq(2)
      expect(isLoading()).to.be.false
      expect(onRejected).to.be.callCount(0)
    })
  })

  it('params: url instance', () => {
    return runAsyncHook(async () => {
      const { isFinished, then } = useAxios(path, instance)
      expect(isFinished()).to.be.false
      const onRejected = cy.spy()

      await then(result => {
        expect(result.data().id).to.be.eq(1)
        expect(isFinished()).to.be.true
        expect(onRejected).to.be.callCount(0)
      }, onRejected)
    })
  })

  it('params: url instance options', () => {
    return runAsyncHook(async () => {
      const { isLoading, execute, then } = useAxios(path, instance, options)
      expect(isLoading()).to.be.false
      execute()
      expect(isLoading()).to.be.true
      const onRejected = cy.spy()

      await then(result => {
        expect(result.data().id).to.be.eq(1)
        expect(isLoading()).to.be.false
        expect(onRejected).to.be.callCount(0)
      }, onRejected)
    })
  })

  it('params: url config instance', () => {
    return runAsyncHook(async () => {
      const { isFinished, then } = useAxios(path, config, instance)
      expect(isFinished()).to.be.false
      const onRejected = cy.spy()

      await then(result => {
        expect(result.data().id).to.be.eq(1)
        expect(isFinished()).to.be.true
        expect(onRejected).to.be.callCount(0)
      }, onRejected)
    })
  })

  it('params: url config instance options', () => {
    return runAsyncHook(async () => {
      const { isLoading, then, execute } = useAxios(path, config, instance, options)
      expect(isLoading()).to.be.false
      execute()
      expect(isLoading()).to.be.true
      const onRejected = cy.spy()

      await then(result => {
        expect(result.data().id).to.be.eq(1)
        expect(isLoading()).to.be.false
        expect(onRejected).to.be.callCount(0)
      }, onRejected)
    })
  })

  it('params: url config instance options, execute: config', () => {
    return runAsyncHook(async () => {
      const { isLoading, then, execute } = useAxios(path, config, instance, options)
      expect(isLoading()).to.be.false
      execute(undefined, config)
      expect(isLoading()).to.be.true
      const onRejected = cy.spy()

      await then(result => {
        expect(result.data().id).to.be.eq(1)
        expect(isLoading()).to.be.false
        expect(onRejected).to.be.callCount(0)
      }, onRejected)
    })
  })

  it('params no url: nil', () => {
    return runAsyncHook(async () => {
      const { isLoading, execute } = useAxios()
      expect(isLoading()).to.be.false
      const { then } = execute(url)
      expect(isLoading()).to.be.true
      const onRejected = cy.spy()

      await then(result => {
        expect(result.data().id).to.be.eq(1)
        expect(isLoading()).to.be.false
        expect(onRejected).to.be.callCount(0)
      }, onRejected)
    })
  })

  it('params no url: config', () => {
    return runAsyncHook(async () => {
      const { isLoading, execute } = useAxios(config)
      expect(isLoading()).to.be.false
      const { then } = execute(url)
      expect(isLoading()).to.be.true
      const onRejected = cy.spy()

      const result = await then(undefined, onRejected)
      expect(result.data().id).to.be.eq(1)
      expect(isLoading()).to.be.false
      expect(onRejected).to.be.callCount(0)
    })
  })

  it('params no url: instance', () => {
    return runAsyncHook(async () => {
      const { isLoading, execute } = useAxios(instance)
      expect(isLoading()).to.be.false
      const { then } = execute(path)
      expect(isLoading()).to.be.true
      const onRejected = cy.spy()

      await then(result => {
        expect(result.data().id).to.be.eq(1)
        expect(isLoading()).to.be.false
        expect(onRejected).to.be.callCount(0)
      }, onRejected)
    })
  })

  it('params no url: config instance', () => {
    return runAsyncHook(async () => {
      const { isLoading, execute } = useAxios(config, instance)
      expect(isLoading()).to.be.false
      const res = execute(path)
      expect(isLoading()).to.be.true
      const onRejected = cy.spy()

      const result = await res.then(undefined, onRejected)
      expect(result.data().id).to.be.eq(1)
      expect(isLoading()).to.be.false
      expect(onRejected).to.be.callCount(0)
      expect(isLoading()).to.be.false
    })
  })

  it('execute is awaitable', () => {
    return runAsyncHook(async () => {
      const { isLoading, then, execute } = useAxios(config, instance)
      expect(isLoading()).to.be.false
      execute(path)
      expect(isLoading()).to.be.true
      const onRejected = cy.spy()

      await then(result => {
        expect(result.data().id).to.be.eq(1)
        expect(isLoading()).to.be.false
        expect(onRejected).to.be.callCount(0)
      }, onRejected)
    })
  })

  it('calling axios with config change(param/data etc.) only', () => {
    return runAsyncHook(async () => {
      const { isLoading, then, execute } = useAxios('/comments.json', config, instance, options)
      expect(isLoading()).to.be.false
      const paramConfig: RawAxiosRequestConfig = { params: { postId: 1 } }
      execute(paramConfig)
      expect(isLoading()).to.be.true
      const onRejected = cy.spy()

      await then(result => {
        expect(result.data()[0].postId).to.be.eq(1)
        expect(isLoading()).to.be.false
        expect(onRejected).to.be.callCount(0)
      }, onRejected)

      paramConfig.params = { postId: 2 }
      execute(paramConfig)
      expect(isLoading()).to.be.true

      await then(() => {
        expect(isLoading()).to.be.false
        expect(onRejected).to.be.callCount(0)
      }, onRejected)
    })
  })

  it('use generic type', () => {
    return runAsyncHook(async () => {
      interface ReqType {
        title: string
        body: string
        userId: number
      }

      interface ResType {
        id: number
        title: string
        body: string
        userId: number
      }
      const typeConfig: RawAxiosRequestConfig<ReqType> = {
        method: 'POST'
      }
      const { isLoading, then, execute } = useAxios<ResType, ReqType>('/posts.json', typeConfig, instance, options)
      expect(isLoading()).to.be.false
      const requestData: ReqType = {
        title: 'title',
        body: 'body',
        userId: 123
      }
      execute({ data: requestData })
      expect(isLoading()).to.be.true
      const onRejected = cy.spy()

      await then(result => {
        expect(result.data()).to.be.exist
        expect(result.data()?.title).to.be.eq('title')
        expect(result.data()?.body).to.be.eq('body')
        expect(result.data()?.userId).to.be.eq(123)
        expect(result.data()?.id).to.be.exist
        expect(isLoading()).to.be.false
        expect(onRejected).to.be.callCount(0)
      }, onRejected)
    })
  })

  it('should not abort when finished', () => {
    return runAsyncHook(async () => {
      const { isLoading, isFinished, isAborted, execute, abort } = useAxios(url, config, options)
      expect(isLoading()).to.be.false
      await execute(`${window.origin}/todos/2.json`)
      expect(isFinished()).to.be.true
      expect(isLoading()).to.be.false
      abort()
      expect(isAborted()).to.be.false
    })
  })

  it('should abort when loading', () => {
    return runAsyncHook(async () => {
      const { isLoading, isFinished, isAborted, execute, abort } = useAxios(url, config, options)
      expect(isLoading()).to.be.false
      execute(`${window.origin}/todos/2.json`).then(result => {
        expect((result.error() as Error)?.message).to.be('aborted')
        expect(isFinished()).to.be.true
        expect(isLoading()).to.be.false
        expect(isAborted()).to.be.true
      })
      abort('aborted')
      expect(isAborted()).to.be.true
    })
  })

  it('should call onFinish', async () => {
    const onFinish = cy.spy()
    const { execute, isLoading, isFinished } = useAxios(url, config, { ...options, onFinish })
    expect(isLoading()).to.be.false

    await execute()
    expect(onFinish).to.have.been.called
    expect(isFinished()).to.be.true
    expect(isLoading()).to.be.false
  })
})
