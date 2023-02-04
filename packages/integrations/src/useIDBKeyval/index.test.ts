import { runAsyncHook } from '@dream2023/cypress-solidjs'
import { promiseTimeout } from '@solidjs-use/shared'
import { clear, get } from 'idb-keyval'
import { useIDBKeyval } from '.'

const KEY1 = 'vue-use-idb-keyval-1'
const KEY2 = 'vue-use-idb-keyval-2'
const KEY3 = 'vue-use-idb-keyval-3'
describe('useIDBKeyval', async () => {
  afterEach(() => {
    clear()
  })

  it('get/set', () => {
    return runAsyncHook(async () => {
      const [data1] = useIDBKeyval(KEY1, { count: 0 })
      const [data2] = useIDBKeyval(KEY2, ['foo', 'bar'])
      await promiseTimeout(10)
      expect(data1()).to.be.deep.eq({ count: 0 })
      expect(data2()).to.be.deep.eq(['foo', 'bar'])

      await promiseTimeout(50)

      expect(await get(KEY1)).to.be.deep.eq(data1())
      expect(await get(KEY2)).to.be.deep.eq(data2())
    })
  })

  it('update', () => {
    return runAsyncHook(async () => {
      const [data1, setData1] = useIDBKeyval(KEY1, { count: 0 })
      const [data2, setData2] = useIDBKeyval(KEY2, ['foo', 'bar'])
      const [data3, setData3] = useIDBKeyval(KEY3, 'world')
      await promiseTimeout(10)
      setData1({ count: data1().count + 1 })
      setData2([...data2(), 'woo'])
      setData3('world')

      await promiseTimeout(50)

      expect(await get(KEY1)).to.be.deep.eq(data1())
      expect(await get(KEY2)).to.be.deep.eq(data2())
      expect(await get(KEY3)).to.be.deep.eq(data3())
    })
  })

  it('del', () => {
    return runAsyncHook(async () => {
      const [_1, setData1] = useIDBKeyval(KEY1, { count: 0 })
      const [_2, setData2] = useIDBKeyval(KEY2, ['foo', 'bar'])
      const [_3, setData3] = useIDBKeyval(KEY3, 'world')
      await promiseTimeout(10)
      setData1(null)
      setData2(null)
      setData3(null)
      await promiseTimeout(50)

      expect(await get(KEY1)).to.be.undefined
      expect(await get(KEY2)).to.be.undefined
      expect(await get(KEY3)).to.be.undefined
    })
  })
})
