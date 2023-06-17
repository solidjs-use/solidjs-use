import { useChangeCase } from '@solidjs-use/integrations/useChangeCase'
import { createMemo, createSignal, For } from 'solid-js'
import type { ChangeCaseType } from '@solidjs-use/integrations/useChangeCase'

const Demo = () => {
  const arr: ChangeCaseType[] = [
    'camelCase',
    'capitalCase',
    'constantCase',
    'dotCase',
    'headerCase',
    'noCase',
    'paramCase',
    'pascalCase',
    'pathCase',
    'sentenceCase',
    'snakeCase'
  ]
  const [types] = createSignal(arr)
  const [input, setInput] = createSignal('helloWorld')
  const [type, setType] = createSignal<ChangeCaseType>(arr[0])
  const changeCase = createMemo(() => useChangeCase(input, type())())

  return (
    <>
      <div>
        <For each={types()}>
          {item => (
            <label class="radio">
              <input checked={item === type()} type="radio" onChange={() => setType(item)} />
              <span>{item}</span>
            </label>
          )}
        </For>
      </div>
      <input value={input()} onInput={e => setInput(e.currentTarget.value)} type="text" />
      <pre lang="yaml">{changeCase()}</pre>
      <style>
        {`input {
  --tw-ring-offset-width: 1px !important;
  --tw-ring-color: #8885 !important;
  --tw-ring-offset-color: transparent !important;
}

.radio {
  width: 8rem;
  margin-left: .5rem;
  margin-top: auto;
  margin-bottom: auto;
  display: inline-flex;
  cursor: pointer;
  user-select: none;
  align-items: center;
}

.radio input {
  appearance: none;
  padding: 0;
  -webkit-print-color-adjust: exact;
  color-adjust: exact;
  display: inline-block;
  vertical-align: middle;
  background-origin: border-box;
  flex-shrink: 0;
  background-color: #9ca3af4d;
  position: relative;
  height: 1rem;
  width: 1rem;
  user-select: none;
  border-radius: 9999px;
  margin-right: .25rem;
}

.radio input:checked::after {
  content: "";
  position: absolute;
  inset: 3px;
  border-radius: 9999px;
  --un-bg-opacity: 1;
  background-color: var(--hope-colors-primary9);
}
`}
      </style>
    </>
  )
}

export default Demo
