import { For } from 'solid-js'
import { useFileDialog } from 'solidjs-use'

const Demo = () => {
  const { files, open, reset, onChange } = useFileDialog()
  onChange(() => {
    /** do something with files */
  })

  return (
    <>
      <button type="button" onClick={() => open()}>
        Choose files
      </button>
      <button type="button" disabled={!files()} onClick={reset}>
        Reset
      </button>
      {!!files() && (
        <>
          {' '}
          <p>
            You have selected: <b>{`${files()?.length} ${files()?.length === 1 ? 'file' : 'files'}`} files</b>
          </p>
          <For each={files() as unknown as File[]}>{file => <li>{file.name}</li>}</For>
        </>
      )}
    </>
  )
}

export default Demo
