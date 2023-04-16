import { AiOutlineLaptop } from 'solid-icons/ai'
import { FaRegularMoon } from 'solid-icons/fa'
import { IoSunnyOutline } from 'solid-icons/io'
import { createEffect, Show } from 'solid-js'
import { useColorMode, useCycleList } from 'solidjs-use'
import type { Signal } from 'solid-js'

const Demo = () => {
  const [mode, setMode] = useColorMode({
    emitAuto: true,
    initialValue: 'light'
  })
  const { state, next } = useCycleList(['dark', 'light', 'auto'], {
    initialValue: [mode, setMode] as Signal<any>
  })

  createEffect(() => {
    document.body.className = `hope-ui-${mode() === 'auto' ? 'dark' : mode()}`
  })

  return (
    <>
      <button onClick={() => next()}>
        <Show when={state() === 'dark'}>
          <FaRegularMoon class="inline-block align-middle" />
        </Show>
        <Show when={state() === 'light'}>
          <IoSunnyOutline class="inline-block align-middle" />
        </Show>
        <Show when={state() === 'auto'}>
          <AiOutlineLaptop class="inline-block align-middle" />
        </Show>
        <span class="ml-2 capitalize align-middle">{state()}</span>
      </button>
      <span class="p-4 opacity-50">← Click to change the color mode</span>
    </>
  )
}

export default Demo
