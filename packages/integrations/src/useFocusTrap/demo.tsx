import { useFocusTrap } from '@solidjs-use/integrations/useFocusTrap'
import { createSignal } from 'solid-js'

const Demo = () => {
  const [target, setTarget] = createSignal<HTMLElement>()
  const { hasFocus, activate, deactivate } = useFocusTrap(target, {})
  return (
    <>
      <div class="flex flex-col items-center">
        <button onClick={() => activate()}>
          {hasFocus() ? 'Focus is trapped within form' : 'Trap focus within form'}
        </button>
        <input type="text" placeholder={hasFocus() ? "You can't focus me" : 'You can focus me'} />

        <div
          ref={setTarget}
          class="shadow-lg bg-gray-600 bg-opacity-10 dark:(bg-gray-400 bg-opacity-10) rounded max-w-96 mx-auto p-8"
        >
          <div class="flex flex-row items-center text-6xl text-center justify-center">{hasFocus() ? '🧐' : '😴'}</div>
          <input type="text" class="!w-12" placeholder="Email" />
          <input type="text" placeholder="Nickname" />
          <input placeholder="Password" type="text" />
          <div class="flex flex-row justify-center">
            <button onClick={() => deactivate()}>Free Focus</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Demo
