import { Note } from '@solidjs-use/docs-components'
import { For } from 'solid-js'
import { usePreferredLanguages } from 'solidjs-use'

const Demo = () => {
  const languages = usePreferredLanguages()

  return (
    <>
      <Note class="mb-2">Preferred languages:</Note>
      <div>
        <For each={languages()}>{lang => <code class="mr-2">{lang}</code>}</For>
      </div>
    </>
  )
}

export default Demo
