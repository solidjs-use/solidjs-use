import { Note } from '@solidjs-use/docs-components'
import { createSignal, Show } from 'solid-js'
import { useObjectUrl } from 'solidjs-use'

const Demo = () => {
  const [file, setFile] = createSignal<File | undefined>()
  const objectUrl = useObjectUrl(file)
  const onFileChange = (e: Event) => {
    const target = e.currentTarget as HTMLInputElement
    const files = target.files
    setFile(() => (files && files.length > 0 ? files[0] : undefined))
  }
  return (
    <>
      <div>
        <Note class="mb-1">Select file:</Note>
        <input type="file" onInput={onFileChange} />

        <Note class="mt-4 mb-1">Object URL:</Note>
        <code>
          <Show when={objectUrl()} fallback={<span>none</span>}>
            <a href={objectUrl()} target="_blank">
              {objectUrl()}
            </a>
          </Show>
        </code>
      </div>
    </>
  )
}

export default Demo
