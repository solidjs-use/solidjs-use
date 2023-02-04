import { Note } from '@solidjs-use/docs-components'
import { stringify } from '@solidjs-use/docs-utils'
import axios from 'axios'
import { useAsyncState } from 'solidjs-use'

const Demo = () => {
  const { isLoading, state, isReady, execute } = useAsyncState(
    args => {
      const id = args?.id || 1
      return axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`).then(t => t.data)
    },
    {},
    {
      delay: 2000,
      resetOnExecute: false
    }
  )
  return (
    <>
      <div>
        <Note>Ready: {isReady().toString()}</Note>
        <Note>Loading: {isLoading().toString()}</Note>
        <pre lang="json" class="ml-2">
          {stringify(state())}
        </pre>
        <button onClick={() => execute(2000, { id: 2 })}>Execute</button>
      </div>
    </>
  )
}

export default Demo
