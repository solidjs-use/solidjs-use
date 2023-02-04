import { FaRegularMoon } from 'solid-icons/fa'
import { IoSunnyOutline } from 'solid-icons/io'
import { createEffect, Show } from 'solid-js'
import { useDark, useToggle } from 'solidjs-use'

const Demo = () => {
  const isDark = useDark({
    storageKey: 'theme-appearance'
  })
  const [value, toggleDark] = useToggle(isDark)

  createEffect(() => {
    document.body.className = `hope-ui-${value() ? 'dark' : 'light'}`
  })

  return (
    <>
      <button onClick={() => toggleDark()}>
        <Show when={value()} fallback={<IoSunnyOutline class="inline-block align-middle" />}>
          <FaRegularMoon class="inline-block align-middle" />
        </Show>
        <span class="ml-2 align-middle">{value() ? 'Dark' : 'Light'}</span>
      </button>
    </>
  )
}

export default Demo
