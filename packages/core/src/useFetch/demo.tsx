import { Note } from '@solidjs-use/docs-components'
import { stringify } from '@solidjs-use/docs-utils'
import { useToggle } from '@solidjs-use/shared'
import { createMemo, createSignal, Show } from 'solid-js'
import { useFetch } from 'solidjs-use'

const Demo = () => {
  const [url, setUrl] = createSignal('https://httpbin.org/get')
  const [refetch, setRefetch] = createSignal(false)

  const [_, toggleRefetch] = useToggle([refetch, setRefetch])

  const { data, error, abort, statusCode, isFetching, isFinished, canAbort, execute } = useFetch(url, { refetch }).get()

  const state = {
    isFinished,
    isFetching,
    canAbort,
    statusCode,
    error,
    data: createMemo(() => {
      try {
        return JSON.parse(data() as string)
      } catch (e) {
        return null
      }
    })
  }
  return (
    <>
      <div>
        <div>
          <Note>The following URLs can be used to test different features of useFetch</Note>
          <div class="mt-2">
            Normal Request:
            <code>https://httpbin.org/get</code>
          </div>
          <div>
            Abort Request:
            <code>https://httpbin.org/delay/10</code>
          </div>
          <div>
            Response Error:
            <code>http://httpbin.org/status/500</code>
          </div>
        </div>

        <input value={url()} onInput={e => setUrl(e.currentTarget.value)} type="text" />
        <button onClick={() => execute()}>Execute</button>
        <button onClick={() => toggleRefetch()}>
          <Show when={refetch()} fallback={<i inline-block align-middle i-carbon-error />}>
            <i inline-block align-middle i-carbon-checkmark />
          </Show>

          <span class="ml-2">{refetch() ? 'Refetch On' : 'Refetch Off'}</span>
        </button>
        <Show when={canAbort()}>
          <button onClick={() => abort()} class="orange">
            Abort
          </button>
        </Show>
        <pre class="code-block">{stringify(state)}</pre>
      </div>
    </>
  )
}

export default Demo
