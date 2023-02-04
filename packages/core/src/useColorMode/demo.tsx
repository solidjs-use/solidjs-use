import { AiOutlineLaptop } from 'solid-icons/ai'
import { FaRegularMoon } from 'solid-icons/fa'
import { IoSunnyOutline } from 'solid-icons/io'
import { createEffect, Show } from 'solid-js'
import { useColorMode, useCycleList } from 'solidjs-use'
import type { Setter } from 'solid-js'
import type { BasicColorSchema } from 'solidjs-use'

const Demo = () => {
  const [mode, setMode] = useColorMode({
    emitAuto: true,
    initialValue: 'light'
  })
  const { next } = useCycleList(['light', 'dark', 'auto'], {
    initialValue: [mode, setMode as Setter<BasicColorSchema>]
  })

  createEffect(() => {
    document.body.className = `hope-ui-${mode() === 'auto' ? 'dark' : mode()}`
  })

  return (
    <>
      <button onClick={() => next()}>
        <Show when={mode() === 'dark'}>
          <FaRegularMoon class="inline-block align-middle" />
        </Show>
        <Show when={mode() === 'light'}>
          <IoSunnyOutline class="inline-block align-middle" />
        </Show>
        <Show when={mode() === 'auto'}>
          <AiOutlineLaptop class="inline-block align-middle" />
        </Show>
        <span class="ml-2 capitalize align-middle">{mode()}</span>
      </button>
      <span class="p-4 opacity-50">← Click to change the color mode</span>
    </>
  )
}

export default Demo
