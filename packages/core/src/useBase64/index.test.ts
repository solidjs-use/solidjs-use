import { runAsyncHook } from '@dream2023/cypress-ct-solid-js'
import { useBase64 } from '.'

function decode(encoded: string) {
  const decodedStr = Cypress.Buffer.from(encoded.split(',')[1], 'base64').toString('utf-8')

  if (!decodedStr) return ''

  return JSON.parse(decodedStr)
}

describe('useBase64', () => {
  it('should work with record', () => {
    return runAsyncHook(async () => {
      const template = { test: 5 }

      const { promise, base64 } = useBase64(template)

      await promise()
      expect(decode(base64())).to.deep.equal(template)
    })
  })

  it('should work with map and default serialize function', () => {
    return runAsyncHook(async () => {
      const map = new Map([['test', 1]])

      const { promise, base64 } = useBase64(map)

      await promise()

      expect(decode(base64())).to.deep.equal(Object.fromEntries(map))
    })
  })

  it('should work with set', () => {
    return runAsyncHook(async () => {
      const set = new Set([1])

      const { promise, base64 } = useBase64(set)

      await promise()

      expect(decode(base64())).to.deep.equal(Array.from(set))
    })
  })

  it('should work with array', () => {
    return runAsyncHook(async () => {
      const arr = [1, 2, 3]

      const { promise, base64 } = useBase64(arr)

      await promise()

      expect(decode(base64())).to.deep.equal(arr)
    })
  })

  it('should work with custom serialize function', async () => {
    return await runAsyncHook(async () => {
      const arr = [1, 2, 3]

      const serializer = (arr: number[]) => {
        return JSON.stringify(arr.map(el => el * 2))
      }

      const { promise, base64 } = useBase64(arr, { serializer })

      await promise()

      expect(decode(base64())).to.deep.equal(JSON.parse(serializer(arr)))
    })
  })
})
