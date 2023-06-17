import { stringify } from '@solidjs-use/docs-utils'
import { createSignal, Show } from 'solid-js'
import { useFileSystemAccess } from 'solidjs-use'

const Demo = () => {
  const [dataType, setDataType] = createSignal<'Text' | 'ArrayBuffer' | 'Blob'>('Text')
  const res = useFileSystemAccess({
    dataType,
    types: [
      {
        description: 'text',
        accept: {
          'text/plain': ['.txt', '.html']
        }
      }
    ],
    excludeAcceptAllOption: true
  })

  async function onSave () {
    await res.save()
  }
  return (
    <>
      <div>
        <div flex="~ gap-1" items-center>
          <button onClick={() => res.open()}>Open</button>
          <button onClick={() => res.create()}>New file</button>
          <button disabled={!res.file()} onClick={onSave}>
            Save
          </button>
          <button disabled={!res.file()} onClick={() => res.saveAs()}>
            Save as
          </button>

          <div ml5>
            <div text-xs class="op50">
              DataType
            </div>
            <select
              value={dataType()}
              onChange={e => setDataType(e.currentTarget.value as 'Text' | 'ArrayBuffer' | 'Blob')}
              class="outline-none w-30 px2 py1 text-sm"
              border="~ main rounded"
            >
              <option value="Text">Text</option>
              <option value="ArrayBuffer">ArrayBuffer</option>
              <option value="Blob">Blob</option>
            </select>
          </div>
        </div>

        <pre class="code-block" lang="yaml">
          {stringify({
            isSupported: res.isSupported,
            file: res.file,
            fileName: res.fileName,
            fileMIME: res.fileMIME,
            fileSize: res.fileSize,
            fileLastModified: res.fileLastModified
          })}
        </pre>

        <Show when={!!res.data()}>
          <div>
            Content&nbsp;
            <Show when={typeof res.data() === 'string'} fallback={<span>{res.data()?.toString()}</span>}>
              <div>
                <textarea
                  rows="20"
                  cols="40"
                  w-full
                  value={res.data() as string}
                  onChange={e => res.setData(e.currentTarget.value)}
                />
              </div>
            </Show>
          </div>
        </Show>
      </div>
    </>
  )
}

export default Demo
