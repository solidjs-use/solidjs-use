import { runAsyncHook, runHook } from '@dream2023/cypress-solidjs'
import { nextTick } from '@solidjs-use/solid-to-vue'
import { createSignal } from 'solid-js'
import { useChangeCase } from '.'
import type { Options } from 'change-case'
import type { ChangeCaseType } from '.'

describe('useChangeCase', () => {
  interface objectValue {
    helloWorld: string
    solidjsuse: string
    delimiterHelloWorld: string
    delimiterSolidjsuse: string
  }
  type ObjectTypes = Omit<Record<ChangeCaseType, objectValue>, 'camelCase'>
  const helloWorld = 'helloWorld'
  const solidjsuse = 'solidjs use'
  const obj: ObjectTypes = {
    capitalCase: {
      helloWorld: 'Hello World',
      solidjsuse: 'Solidjs Use',
      delimiterHelloWorld: 'Hello-World',
      delimiterSolidjsuse: 'Solidjs-Use'
    },
    constantCase: {
      helloWorld: 'HELLO_WORLD',
      solidjsuse: 'SOLIDJS_USE',
      delimiterHelloWorld: 'HELLO-WORLD',
      delimiterSolidjsuse: 'SOLIDJS-USE'
    },
    dotCase: {
      helloWorld: 'hello.world',
      solidjsuse: 'solidjs.use',
      delimiterHelloWorld: 'hello-world',
      delimiterSolidjsuse: 'solidjs-use'
    },
    headerCase: {
      helloWorld: 'Hello-World',
      solidjsuse: 'Solidjs-Use',
      delimiterHelloWorld: 'Hello-World',
      delimiterSolidjsuse: 'Solidjs-Use'
    },
    noCase: {
      helloWorld: 'hello world',
      solidjsuse: 'solidjs use',
      delimiterHelloWorld: 'hello-world',
      delimiterSolidjsuse: 'solidjs-use'
    },
    paramCase: {
      helloWorld: 'hello-world',
      solidjsuse: 'solidjs-use',
      delimiterHelloWorld: 'hello-world',
      delimiterSolidjsuse: 'solidjs-use'
    },
    pascalCase: {
      helloWorld: 'HelloWorld',
      solidjsuse: 'SolidjsUse',
      delimiterHelloWorld: 'Hello-World',
      delimiterSolidjsuse: 'Solidjs-Use'
    },
    pathCase: {
      helloWorld: 'hello/world',
      solidjsuse: 'solidjs/use',
      delimiterHelloWorld: 'hello-world',
      delimiterSolidjsuse: 'solidjs-use'
    },
    sentenceCase: {
      helloWorld: 'Hello world',
      solidjsuse: 'Solidjs use',
      delimiterHelloWorld: 'Hello-world',
      delimiterSolidjsuse: 'Solidjs-use'
    },
    snakeCase: {
      helloWorld: 'hello_world',
      solidjsuse: 'solidjs_use',
      delimiterHelloWorld: 'hello-world',
      delimiterSolidjsuse: 'solidjs-use'
    }
  }

  ;(Object.keys(obj) as Array<keyof ObjectTypes>).forEach(key => {
    it(`base ${key}`, () => {
      return runAsyncHook(async () => {
        const [changeCase, setChangeCase] = useChangeCase(helloWorld, key)
        expect(changeCase()).to.be.eq(obj[key].helloWorld)
        setChangeCase(solidjsuse)
        await nextTick()
        expect(changeCase()).to.be.eq(obj[key].solidjsuse)
      })
    })

    it(`signal ${key}`, () => {
      runHook(() => {
        const [input, setInput] = createSignal(helloWorld)
        const changeCase = useChangeCase(input, key)
        expect(changeCase()).to.be.eq(obj[key].helloWorld)
        setInput(solidjsuse)
        expect(changeCase()).to.be.eq(obj[key].solidjsuse)
      })
    })

    it(`options ${key}`, () => {
      runHook(() => {
        const options: Options = {
          delimiter: '-'
        }
        const [changeCase, setChangeCase] = useChangeCase(helloWorld, key, options)
        expect(changeCase()).to.be.eq(obj[key].delimiterHelloWorld)
        setChangeCase(solidjsuse)
        expect(changeCase()).to.be.eq(obj[key].delimiterSolidjsuse)
      })
    })

    it(`function ${key}`, () => {
      runHook(() => {
        const input = () => helloWorld
        const changeCase = useChangeCase(input, key)
        expect(changeCase()).to.be.eq(obj[key].helloWorld)
      })
    })
  })
})
