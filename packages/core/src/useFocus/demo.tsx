import { Note } from '@solidjs-use/docs-components'
import { createSignal, Match, Switch } from 'solid-js'
import { useFocus } from 'solidjs-use'

const Demo = () => {
  const [text, setText] = createSignal<HTMLElement>()
  const [input, setInput] = createSignal<HTMLElement>()
  const [button, setButton] = createSignal<HTMLElement>()

  const [paragraphFocus, setParagraphFocus] = useFocus(text)
  const [inputFocus, setInputFocus] = useFocus(input, { initialValue: true })
  const [buttonFocus, setButtonFocus] = useFocus(button)

  return (
    <>
      <div>
        <p ref={setText} class={'demo-el px-2 rounded'} tabindex="0">
          Paragraph that can be focused
        </p>
        <input ref={setInput} class="demo-el" type="text" placeholder="Input that can be focused" />
        <button ref={setButton} class="demo-el button">
          Button that can be focused
        </button>
        <hr />
        <Note class="mb-2">
          <Switch fallback={<span>&nbsp;</span>}>
            <Match when={paragraphFocus()}>The paragraph has focus</Match>
            <Match when={inputFocus()}>The input control has focus</Match>
            <Match when={buttonFocus()}>The button has focus</Match>
          </Switch>
        </Note>
        <button
          class="button small !ml-0"
          classList={{ orange: paragraphFocus() }}
          onClick={() => setParagraphFocus(!paragraphFocus())}
        >
          Focus text
        </button>
        <button
          class="button small"
          classList={{ orange: paragraphFocus() }}
          onClick={() => setInputFocus(!inputFocus())}
        >
          Focus input
        </button>
        <button
          class="button small"
          classList={{ orange: paragraphFocus() }}
          onClick={() => setButtonFocus(!buttonFocus())}
        >
          Focus button
        </button>
      </div>
      <style>
        {`
      .demo-el:focus {
        opacity: .7;
        box-shadow: 0 0 2px 1px var(--c-brand);
      }
      `}
      </style>
    </>
  )
}

export default Demo
