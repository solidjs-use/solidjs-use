import { Note } from '@solidjs-use/docs-components'
import { createMemo, For } from 'solid-js'
import { useMagicKeys } from 'solidjs-use'
import type { ParentComponent } from 'solid-js'

const Key: ParentComponent<{ value: boolean }> = props => {
  return (
    <div
      class={`font-mono px-4 py-2 rounded ${
        props.value
          ? 'opacity-100 c-white bg-primary bg-opacity-15'
          : 'opacity-50 bg-gray-600 bg-opacity-10 dark:(bg-gray-400 bg-opacity-10)'
      }`}
    >
      {props.children}
    </div>
  )
}

const Demo = () => {
  // eslint-disable-next-line camelcase
  const { shift, s, o, l, i, d, j, u, e, s_o_l_i_d_j_s, u_s_e, current } = useMagicKeys({})
  const keys = createMemo(() => Array.from(current))

  return (
    <>
      <div class="flex flex-col md:flex-row">
        <img
          src="/solidjs.svg"
          class="h-38 py-8 m-auto transform transition duration-500"
          classList={{ 'opacity-0': !s_o_l_i_d_j_s(), 'rotate-180': shift() }}
        />

        <div>
          <Note class="text-center mt-0 mb-5">Press the following keys to test out</Note>
          <div class="flex gap-3 justify-center">
            <Key value={s()}>s</Key>
            <Key value={o()}>o</Key>
            <Key value={l()}>l</Key>
            <Key value={i()}>i</Key>
            <Key value={d()}>d</Key>
            <Key value={j()}>j</Key>
            <Key value={s()}>s</Key>
            <div class="mx-1" />
            <Key value={u()}>u</Key>
            <Key value={s()}>s</Key>
            <Key value={e()}>e</Key>
          </div>
          <div class="flex gap-3 justify-center mt-3">
            <Key value={shift()}>Shift</Key>
            <Key value={s_o_l_i_d_j_s()}>SolidJS</Key>
            <Key value={u_s_e()}>Use</Key>
          </div>
          <div class="text-center mt-4">
            <Note>Keys Pressed</Note>
            <div class="flex mt-2 justify-center space-x-1 min-h-1.5em">
              <For each={keys()}>{key => <code class="font-mono">{key}</code>}</For>
            </div>
          </div>
        </div>

        <img
          src="/solidjs-use.svg"
          class="h-38 py-8 m-auto transform transistion duration-500"
          classList={{ 'opacity-0': !u_s_e(), 'rotate-180': shift() }}
        />
      </div>
    </>
  )
}

export default Demo
