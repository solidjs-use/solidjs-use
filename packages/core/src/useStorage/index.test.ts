import { runAsyncHook } from '@dream2023/cypress-solidjs'
import { nextTick } from '@solidjs-use/shared/solid-to-vue'
import { createSignal } from 'solid-js'
import { StorageSerializers, customStorageEventName, useStorage } from '.'

describe('useStorage', () => {
  afterEach(() => {
    localStorage.clear()
    sessionStorage.clear()
  })

  it('export module', () => {
    expect(useStorage).to.be.exist
    expect(StorageSerializers).to.be.exist
  })

  it('string', () => {
    return runAsyncHook(async () => {
      const KEY = 'custom-key-string'
      const [state, setState] = useStorage(KEY, 'a', localStorage)

      expect(state()).to.be.eq('a')

      setState('b')
      await nextTick()

      expect(state()).to.be.eq('b')
    })
  })

  it('number', () => {
    const KEY = 'custom-key-number'
    localStorage.setItem(KEY, '0')

    return runAsyncHook(async () => {
      const [store, setStore] = useStorage(KEY, 1, localStorage)
      await nextTick()
      expect(store()).to.be.eq(0)

      setStore(2)
      await nextTick()

      expect(localStorage.getItem(KEY)).to.be.deep.eq('2')

      setStore(-1)
      await nextTick()

      expect(localStorage.getItem(KEY)).to.be.deep.eq('-1')

      setStore(2.3)
      await nextTick()

      expect(localStorage.getItem(KEY)).to.be.deep.eq('2.3')
    })
  })

  it('boolean', () => {
    const KEY = 'custom-key-boolean'
    return runAsyncHook(async () => {
      const [store, setStore] = useStorage(KEY, true, localStorage)

      expect(store()).to.be.eq(true)

      setStore(false)
      await nextTick()

      expect(localStorage.getItem(KEY)).to.be.deep.eq('false')

      setStore(true)
      await nextTick()

      expect(localStorage.getItem(KEY)).to.be.deep.eq('true')
    })
  })

  it('null string', () => {
    const KEY = 'custom-key-null-string'
    return runAsyncHook(async () => {
      localStorage.setItem(KEY, 'null')

      const [store] = useStorage(KEY, null, localStorage)
      const storedValue = localStorage.getItem(KEY)

      await nextTick()
      expect(store()).to.be.eq('null')
      expect(storedValue).to.be.eq('null')
    })
  })

  it('null value', () => {
    const KEY = 'custom-key-null-value'
    localStorage.removeItem(KEY)
    return runAsyncHook(async () => {
      const [store] = useStorage(KEY, null)
      const storedValue = localStorage.getItem(KEY)

      await nextTick()
      expect(store()).to.be.eq(null)
      expect(storedValue).to.be.null
    })
  })

  it('remove value', () => {
    return runAsyncHook(async () => {
      const KEY = 'custom-key-null-remove'
      localStorage.setItem(KEY, 'random')

      const [store, setStore] = useStorage(KEY, null, localStorage)
      setStore(null)

      await nextTick()

      expect(store()).to.be.eq(null)
      expect(localStorage.getItem(KEY)).to.be.null
    })
  })

  it('number string', () => {
    return runAsyncHook(async () => {
      const KEY = 'custom-key-number-string'
      localStorage.setItem(KEY, '0')

      const [store, setStore] = useStorage(KEY, '1', localStorage)
      expect(store()).to.be.eq('0')

      setStore('2')
      await nextTick()

      expect(localStorage.getItem(KEY)).to.be.deep.eq('2')
    })
  })

  it('date', () => {
    return runAsyncHook(async () => {
      const KEY = 'custom-key-date'
      localStorage.setItem(KEY, '2000-01-01T00:00:00.000Z')

      const [store, setStore] = useStorage(KEY, new Date('2000-01-02T00:00:00.000Z'), localStorage)
      expect(store()).to.be.deep.eq(new Date('2000-01-01T00:00:00.000Z'))

      setStore(new Date('2000-01-03T00:00:00.000Z'))
      await nextTick()

      expect(localStorage.getItem(KEY)).to.be.deep.eq('2000-01-03T00:00:00.000Z')
    })
  })

  it('object', () => {
    const KEY = 'custom-key-object'
    expect(localStorage.getItem(KEY)).to.be.deep.eq(null)
    return runAsyncHook(async () => {
      const [store, setStore] = useStorage(
        KEY,
        {
          name: 'a',
          data: 123
        },
        localStorage
      )

      expect(localStorage.getItem(KEY)).to.be.deep.eq('{"name":"a","data":123}')

      expect(store()).to.be.deep.eq({
        name: 'a',
        data: 123
      })

      setStore({
        ...store(),
        name: 'b'
      })
      await nextTick()

      expect(localStorage.getItem(KEY)).to.be.deep.eq('{"name":"b","data":123}')

      setStore({
        ...store(),
        data: 321
      })
      await nextTick()

      expect(localStorage.getItem(KEY)).to.be.deep.eq('{"name":"b","data":321}')

      setStore(null)
      await nextTick()
      expect(localStorage.getItem(KEY)).to.be.deep.eq(null)
    })
  })

  it('map', () => {
    const KEY = 'custom-key-map'
    return runAsyncHook(async () => {
      const [store] = useStorage(
        KEY,
        new Map<number, string | number>([
          [1, 'a'],
          [2, 2]
        ]),
        localStorage,
        { serializer: StorageSerializers.map }
      )

      expect(localStorage.getItem(KEY)).to.be.deep.eq('[[1,"a"],[2,2]]')

      expect(store()).to.be.deep.eq(
        new Map<number, string | number>([
          [1, 'a'],
          [2, 2]
        ])
      )
    })
  })

  it('set', () => {
    const KEY = 'custom-key-set'
    expect(localStorage.getItem(KEY)).to.be.deep.eq(null)
    return runAsyncHook(async () => {
      const [store] = useStorage(KEY, new Set<string | number>([1, '2']), localStorage, {
        serializer: StorageSerializers.set
      })

      expect(localStorage.getItem(KEY)).to.be.deep.eq('[1,"2"]')

      expect(store()).to.be.deep.eq(new Set<string | number>([1, '2']))
    })
  })

  it('pass accessor as initialValue', () => {
    const KEY = 'custom-key-initialValue'
    return runAsyncHook(async () => {
      expect(localStorage.getItem(KEY)).to.be.deep.eq(null)
      const [init, setInit] = createSignal({
        name: 'a',
        data: 123
      })
      const state = useStorage(KEY, init, localStorage, { serializer: StorageSerializers.object })

      await nextTick()
      expect(localStorage.getItem(KEY)).to.be.deep.eq('{"name":"a","data":123}')

      expect(state()).to.be.eq(init())

      setInit({
        ...init(),
        name: 'b'
      })
      await nextTick()

      expect(localStorage.getItem(KEY)).to.be.deep.eq('{"name":"b","data":123}')
    })
  })

  it('custom serializer', () => {
    const KEY = 'custom-key-custom-serializer'
    return runAsyncHook(async () => {
      expect(localStorage.getItem(KEY)).to.be.deep.eq(null)

      const [state, setState] = useStorage(KEY, 0, localStorage, {
        serializer: { read: JSON.parse, write: JSON.stringify }
      })

      expect(localStorage.getItem(KEY)).to.be.deep.eq('0')

      expect(state()).to.be.eq(0)

      setState({ name: 'a', data: 123 })
      await nextTick()

      expect(localStorage.getItem(KEY)).to.be.deep.eq('{"name":"a","data":123}')

      setState({ ...state(), name: 'b' })
      await nextTick()

      expect(localStorage.getItem(KEY)).to.be.deep.eq('{"name":"b","data":123}')

      setState({ ...state(), data: 321 })
      await nextTick()

      expect(localStorage.getItem(KEY)).to.be.deep.eq('{"name":"b","data":321}')

      setState(null)
      await nextTick()

      expect(localStorage.getItem(KEY)).to.be.deep.eq(null)
    })
  })

  it('emits custom storage events on change', () => {
    const eventFn = cy.spy()
    const KEY = 'custom-key-custom-storage-on-change'
    return runAsyncHook(async () => {
      const [data0, setData0] = useStorage(KEY, 0, localStorage)
      const [data1] = useStorage(KEY, 0, localStorage)
      expect(data0()).to.eq(0)
      expect(data1()).to.eq(0)

      await nextTick()
      window.addEventListener(customStorageEventName, eventFn, { once: true })

      setData0(1)
      await nextTick()
      await nextTick()

      expect(data0()).to.eq(1)
      expect(data1()).to.eq(1)
      expect(eventFn).to.be.called
      const call = eventFn.args[0] as [CustomEvent]

      expect(call[0].detail.storageArea).to.eq(localStorage)
      expect(call[0].detail.key).to.eq(KEY)
      expect(call[0].detail.oldValue).to.eq('0')
      expect(call[0].detail.newValue).to.eq('1')
    })
  })
})
