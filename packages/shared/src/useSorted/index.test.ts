import { runAsyncHook, runHook } from '@dream2023/cypress-solidjs'
import { nextTick } from '@solidjs-use/solid-to-vue'
import { unAccessor } from '../unAccessor'
import { useSorted } from '.'

interface User {
  name: string
  age: number
}

const arr = [10, 3, 5, 7, 2, 1, 8, 6, 9, 4]
const arrSorted = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const objArr: User[] = [
  {
    name: 'John',
    age: 40
  },
  {
    name: 'Jane',
    age: 20
  },
  {
    name: 'Joe',
    age: 30
  },
  {
    name: 'Jenny',
    age: 22
  }
]
const objectSorted: User[] = [
  {
    name: 'Jane',
    age: 20
  },
  {
    name: 'Jenny',
    age: 22
  },
  {
    name: 'Joe',
    age: 30
  },
  {
    name: 'John',
    age: 40
  }
]

describe('useSorted', () => {
  it('should be defined', () => {
    expect(useSorted).to.be.exist
  })

  it('should pure sort function', () => {
    runHook(() => {
      const sorted = useSorted(arr)
      expect(unAccessor(sorted)).to.be.deep.eq(arrSorted)
      expect(unAccessor(arr)).to.be.deep.eq([10, 3, 5, 7, 2, 1, 8, 6, 9, 4])
    })
  })

  it('should dirty sort', () => {
    return runAsyncHook(async () => {
      const dirtyArr = [...arr]
      const sorted = useSorted(dirtyArr, (a, b) => a - b, { dirty: true })
      await nextTick()
      expect(unAccessor(sorted)).to.be.deep.eq(arrSorted)
      expect(unAccessor(dirtyArr)).to.be.deep.eq(unAccessor(sorted))
    })
  })

  it('should sort object', () => {
    runHook(() => {
      const sorted = useSorted(objArr, (a, b) => a.age - b.age)

      expect(unAccessor(sorted)).to.be.deep.eq(objectSorted)
    })
  })

  it('should sort object by options.compareFn', () => {
    runHook(() => {
      const sorted = useSorted(objArr, {
        compareFn: (a, b) => a.age - b.age
      })

      expect(unAccessor(sorted)).to.be.deep.eq(objectSorted)
    })
  })
})
