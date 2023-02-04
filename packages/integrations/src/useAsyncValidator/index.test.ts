import { runAsyncHook, runHook } from '@dream2023/cypress-solidjs'
import { nextTick } from '@solidjs-use/solid-to-vue'
import { createSignal } from 'solid-js'
import { useAsyncValidator } from '.'
import type { Signal } from 'solid-js'
import type { Rules } from 'async-validator'

describe('useAsyncValidator', () => {
  let form: {
    name: string
    age: number
  }

  beforeEach(() => {
    form = {
      name: 'jelf',
      age: 24
    }
  })

  it('should be defined', () => {
    expect(useAsyncValidator).to.be.exist
  })

  it('should pass', () => {
    runHook(() => {
      const rules: Rules = {
        name: {
          type: 'string'
        },
        age: {
          type: 'number'
        }
      }
      const { pass, errors, isFinished, then } = useAsyncValidator(form, rules)
      then(() => {
        expect(isFinished()).to.be.eq(true)
        expect(pass()).to.be.eq(true)
        expect(errors()).to.be.deep.eq([])
      })
    })
  })

  it('should async', () => {
    return runAsyncHook(async () => {
      const rules: Rules = {
        name: {
          type: 'string'
        },
        age: {
          type: 'number'
        }
      }
      const { pass, errors, isFinished, then } = useAsyncValidator(form, rules)
      await nextTick()
      expect(isFinished()).to.be.eq(false)
      expect(pass()).to.be.eq(false)
      expect(errors()).to.be.deep.eq([])

      await then(() => {
        expect(isFinished()).to.be.eq(true)
        expect(pass()).to.be.eq(true)
        expect(errors()).to.be.deep.eq([])
      })
    })
  })

  it('should can be await', () => {
    return runAsyncHook(async () => {
      const rules: Rules = {
        name: {
          type: 'string'
        },
        age: {
          type: 'number'
        }
      }
      const { pass, errors, isFinished } = await useAsyncValidator(form, rules)
      await nextTick()
      expect(isFinished()).to.be.eq(true)
      expect(pass()).to.be.eq(true)
      expect(errors()).to.be.deep.eq([])
    })
  })

  it('should fail to validate', () => {
    return runAsyncHook(async () => {
      const rules: Rules = {
        name: {
          type: 'string',
          min: 5,
          max: 20,
          message: 'name length must be 5-20'
        },
        age: {
          type: 'number'
        }
      }
      const { pass, errors, isFinished } = await useAsyncValidator(form, rules, {
        validateOption: {
          suppressWarning: true
        }
      })
      await nextTick()
      expect(isFinished()).to.be.eq(true)
      expect(pass()).to.be.eq(false)
      expect(errors()).to.to.be.deep.eq([
        {
          field: 'name',
          fieldValue: 'jelf',
          message: 'name length must be 5-20'
        }
      ])
    })
  })

  it('should reactive', () => {
    return runAsyncHook(async () => {
      const [form, setForm] = createSignal({
        name: 'jelf',
        age: 24
      })

      const [rules] = createSignal({
        name: {
          type: 'string',
          min: 5,
          max: 20,
          message: 'name length must be 5-20'
        },
        age: {
          type: 'number'
        }
      }) as Signal<Rules>

      const { pass, errors, isFinished } = await useAsyncValidator(form, rules, {
        validateOption: {
          suppressWarning: true
        }
      })
      await nextTick()
      expect(isFinished()).to.be.eq(true)
      expect(pass()).to.be.eq(false)
      expect(errors()).to.be.deep.eq([
        {
          field: 'name',
          fieldValue: 'jelf',
          message: 'name length must be 5-20'
        }
      ])

      setForm(state => ({
        ...state,
        name: 'okxiaoliang4'
      }))
    })
  })
})
