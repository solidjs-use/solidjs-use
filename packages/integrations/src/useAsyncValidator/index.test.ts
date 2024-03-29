import { runAsyncHook, runHook } from '@dream2023/cypress-ct-solid-js'
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

  it('immediate should can be work', () => {
    return runAsyncHook(async () => {
      const rules: Rules = {
        name: {
          type: 'string'
        },
        age: {
          type: 'number'
        }
      }
      const { pass, errors, isFinished, then } = useAsyncValidator(form, rules, { immediate: false })
      expect(isFinished()).to.be.eq(true)
      expect(pass()).to.be.eq(true)
      expect(errors()).to.be.deep.eq([])

      then(() => {
        expect(isFinished()).to.be.eq(true)
        expect(pass()).to.be.eq(true)
        expect(errors()).to.be.deep.eq([])
      })
    })
  })

  it('execute should can be work', () => {
    return runAsyncHook(async () => {
      const rules: Rules = {
        name: {
          type: 'string'
        },
        age: {
          type: 'number'
        }
      }
      const { isFinished, execute } = useAsyncValidator(form, rules, { immediate: false })
      const { pass, errors } = await execute()

      expect(isFinished()).to.be.eq(true)
      expect(pass).to.be.eq(true)
      expect(errors).to.be.deep.eq([])
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

  it('should fail to validate when use execute', () => {
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

      const { execute } = useAsyncValidator(form, rules, {
        validateOption: {
          suppressWarning: true
        },
        immediate: false
      })

      const { pass, errors } = await execute()

      expect(pass).to.be.eq(false)
      expect(errors).to.deep.eq([
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
      await nextTick()
      expect(pass()).to.be.eq(true)
      expect(errors()).to.deep.eq([])
    })
  })
})

describe('set manual true', () => {
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

  it('set immediate and manual at the same time', () => {
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
      const { pass, errors, then } = useAsyncValidator(form, rules, { immediate: false, manual: true })
      expect(pass()).to.be.eq(true)
      expect(errors()).to.deep.eq([])
      then(() => {
        expect(pass()).to.be.eq(true)
        expect(errors()).to.deep.eq([])
      })
    })
  })

  it('set manual, do not run validator automatically', () => {
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
      const { pass, errors, then } = useAsyncValidator(form, rules, { manual: true })
      expect(pass()).to.be.eq(true)
      expect(errors()).to.deep.eq([])
      then(() => {
        expect(pass()).to.be.eq(true)
        expect(errors()).to.deep.eq([])
      })
    })
  })

  it('manual trigger validator', () => {
    return runAsyncHook(async () => {
      const [form] = createSignal({
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

      const { execute, pass, errors } = useAsyncValidator(form, rules, { manual: true })

      expect(pass()).to.be.eq(true)
      expect(errors()).to.deep.eq([])

      // first trigger
      await execute()
      expect(pass()).to.be.eq(false)
      expect(errors()).to.be.deep.eq([
        {
          field: 'name',
          fieldValue: 'jelf',
          message: 'name length must be 5-20'
        }
      ])

      // second trigger
      form().name = 'okxiaoliang4'
      await execute()
      expect(pass()).to.be.eq(true)
      expect(errors()).to.deep.eq([])
    })
  })
})
