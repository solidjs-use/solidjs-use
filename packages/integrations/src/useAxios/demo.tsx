import { Note } from '@solidjs-use/docs-components'
import { stringify } from '@solidjs-use/docs-utils'
import { useAxios } from '@solidjs-use/integrations/useAxios'

const Demo = () => {
  const { data, isLoading, isFinished, execute } = useAxios('https://jsonplaceholder.typicode.com/todos/1')
  return (
    <>
      <button onClick={() => execute()}>Execute</button>
      <Note>Loading: {String(isLoading())}</Note>
      <Note>Finished: {String(isFinished())}</Note>
      <pre lang="yaml">{stringify(data())}</pre>
    </>
  )
}

export default Demo
