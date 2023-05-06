import { runHook } from '@dream2023/cypress-ct-solid-js'
import { useSupported } from './index'

describe('useSupported', () => {
  it('should return boolean accessor', () => {
    runHook(() => {
      const value = useSupported(() => true)
      expect(value()).to.eq(true)
    })
  })

  it('should update on mount', () => {
    let count = 0
    runHook(() => {
      useSupported(() => {
        count++
        return false
      })
    })
    expect(count).to.eq(2)
  })
})
