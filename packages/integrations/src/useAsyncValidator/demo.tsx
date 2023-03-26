import { Show } from 'solid-js'
import { BooleanDisplay } from '@solidjs-use/docs-components'
import { useAsyncValidator } from '@solidjs-use/integrations/useAsyncValidator'
import { createMutable } from 'solid-js/store'
import type { Rules } from 'async-validator'

const Demo = () => {
  const form = createMutable<{ email: string; name: string; age: number | undefined }>({
    email: '',
    name: '',
    age: undefined
  })
  const rules: Rules = {
    name: {
      type: 'string',
      min: 5,
      max: 20,
      required: true
    },
    age: {
      type: 'number',
      required: true
    },
    email: [
      {
        type: 'email',
        required: true
      }
    ]
  }

  const { pass, isFinished, errorFields } = useAsyncValidator(form, rules)
  return (
    <>
      <div>
        <code>pass:</code> <BooleanDisplay value={pass()} />
      </div>
      <div>
        <code>isFinished:</code> <BooleanDisplay value={isFinished()} />
      </div>
      <hr />
      <div flex="~ col gap-2">
        <div>
          Email:
          <input
            value={form.email}
            classList={{ '!border-red': !!errorFields()?.email?.length }}
            type="text"
            placeholder="Email"
            onInput={e => (form.email = e.currentTarget.value)}
          />
          <Show when={!!errorFields()?.email?.length}>
            <div text-red>{errorFields()!.email[0].message}</div>
          </Show>
        </div>
        <div>
          Name:{' '}
          <input
            value={form.name}
            classList={{ '!border-red': !!errorFields()?.name?.length }}
            type="text"
            placeholder="Name"
            onInput={e => (form.name = e.currentTarget.value)}
          />
          <Show when={!!errorFields()?.name?.length}>
            <div text-red>{errorFields()!.name[0].message}</div>
          </Show>
        </div>
        <div>
          Age:{' '}
          <input
            value={form.age}
            onInput={e => (form.age = Number(e.currentTarget.value))}
            classList={{ '!border-red': !!errorFields()?.age?.length }}
            type="number"
            placeholder="Age"
          />
          <Show when={!!errorFields()?.age?.length}>
            <div text-red>{errorFields()!.age[0].message}</div>
          </Show>
        </div>

        <div>
          <button disabled={!pass()}>Submit</button>
        </div>
      </div>
    </>
  )
}

export default Demo
