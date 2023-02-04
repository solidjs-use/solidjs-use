import { runAsyncHook, runHook } from '@dream2023/cypress-solidjs'
import { createSignal, getOwner, runWithOwner } from 'solid-js'
import { invoke } from '../utils'
import { until } from '.'

describe('until', () => {
  it('should toBe', () => {
    return new Promise<void>((resolve, reject) => {
      runHook(() => {
        const [r1, setR1] = createSignal(0)
        const [r2, setR2] = createSignal(0)
        const owner = getOwner()
        invoke(async () => {
          expect(r1()).to.be.eq(0)
          expect(r2()).to.be.eq(0)
          let x = 0
          await runWithOwner(owner!, async () => {
            x = await until(r1).toBe(1)
          })
          expect(x).to.be.eq(1)
          await runWithOwner(owner!, async () => {
            x = await until(r2).toBe(createSignal(2)[0])
          })
          expect(x).to.be.eq(2)
          resolve()
        }).catch(reject)

        setTimeout(() => {
          setR1(1)
          setR2(1)
        }, 100)

        setTimeout(() => {
          setR2(2)
        }, 200)
      })
    })
  })

  it('should toBeTruthy', () => {
    return runAsyncHook(async () => {
      const [r, setR] = createSignal(false)
      setTimeout(() => {
        setR(true)
      }, 100)

      expect(await until(r).toBeTruthy()).to.be.true
    })
  })

  it('should toBeUndefined', () => {
    return runAsyncHook(async () => {
      const [r, setR] = createSignal<boolean | undefined>(false)
      setTimeout(() => {
        setR(undefined)
      }, 100)

      expect(await until(r).toBeUndefined()).to.be.undefined
    })
  })

  it('should toBeNaN', () => {
    return runAsyncHook(async () => {
      const [r, setR] = createSignal(0)
      setTimeout(() => {
        setR(NaN)
      }, 100)

      expect(await until(r).toBeNaN()).to.be.NaN
    })
  })

  it('should toBe timeout with Accessor', () => {
    return runAsyncHook(async () => {
      const [r] = createSignal(0)
      const reject = cy.spy()
      await invoke(async () => {
        await until(r).toBe(createSignal(1)[0], { timeout: 200, throwOnTimeout: true })
      }).catch(reject)

      expect(reject).to.be.calledWith('Timeout')
    })
  })

  it('should work for changedTimes', async () => {
    await new Promise<void>((resolve, reject) => {
      runHook(() => {
        const [r, setR] = createSignal(0)

        invoke(async () => {
          expect(r()).to.be.eq(0)
          const x = await until(r).changed()
          expect(x).to.be.eq(1)
          resolve()
        }).catch(reject)

        setTimeout(() => {
          setR(1)
        }, 100)
      })
    })
    return new Promise<void>((resolve, reject) => {
      runHook(() => {
        const [r, setR] = createSignal(0)

        invoke(async () => {
          expect(r()).to.eq(0)
          const x = await until(r).changedTimes(3)
          expect(x).to.eq(3)
          resolve()
        }).catch(reject)

        setTimeout(() => {
          setR(1)
          setR(2)
          setR(3)
        }, 100)
      })
    })
  })

  it('should support `not`', () => {
    return new Promise<void>((resolve, reject) => {
      runHook(() => {
        const [r, setR] = createSignal(0)

        invoke(async () => {
          expect(r()).to.eq(0)
          const x = await until(r).not.toBe(0)
          expect(x).to.eq(1)
          resolve()
        }).catch(reject)

        setTimeout(() => {
          setR(1)
        }, 100)
      })
    })
  })

  it('should support `not` as separate instances', () => {
    return new Promise<void>((resolve, reject) => {
      runHook(() => {
        const [r, setR] = createSignal(0)

        invoke(async () => {
          expect(r()).to.eq(0)
          const instance = until(r)
          const x = await instance.not.toBe(0)
          const y = await instance.not.toBe(2)
          expect(x).to.eq(1)
          expect(y).to.eq(1)
          resolve()
        }).catch(reject)

        setTimeout(() => {
          setR(1)
        }, 100)
      })
    })
  })

  it('should support toBeNull()', () => {
    return new Promise<void>((resolve, reject) => {
      runHook(() => {
        const [r, setR] = createSignal<number | null>(null)

        invoke(async () => {
          expect(r()).to.eq(null)
          const x = await until(r).not.toBeNull()
          expect(x).to.eq(1)
          resolve()
        }).catch(reject)

        setTimeout(() => {
          setR(1)
        }, 100)
      })
    })
  })

  it('should support array', () => {
    return new Promise((resolve, reject) => {
      runHook(() => {
        const [r, setR] = createSignal<number[]>([1, 2, 3])
        invoke(async () => {
          expect(r()).to.deep.eq([1, 2, 3])
          const x = await until(r).toContains(4)
          expect(x).to.deep.eq([1, 2, 3, 4])
          resolve(undefined)
        }).catch(reject)

        setTimeout(() => {
          setR(([...state]) => {
            state.push(4)
            return state
          })
        }, 100)
      })
    })
  })

  it('should support array with not', () => {
    return new Promise<void>((resolve, reject) => {
      runHook(() => {
        const [r, setR] = createSignal<number[]>([1, 2, 3])

        invoke(async () => {
          expect(r()).to.deep.eq([1, 2, 3])
          const x = await until(r).not.toContains(2)
          expect(x).to.deep.eq([1])
          resolve()
        }).catch(reject)

        setTimeout(() => {
          setR(([...state]) => {
            state.pop()
            return state
          })
          setR(([...state]) => {
            state.pop()
            return state
          })
        }, 100)
      })
    })
  })

  it('should immediately timeout', () => {
    return new Promise<void>((resolve, reject) => {
      runHook(() => {
        const [r, setR] = createSignal(0)
        expect(r()).to.eq(0)
        invoke(async () => {
          const x = await until(r).toBe(1, { timeout: 0 })
          expect(x).to.eq(0)
          resolve()
        }).catch(reject)

        setTimeout(() => {
          setR(1)
        }, 100)
      })
    })
  })
})
