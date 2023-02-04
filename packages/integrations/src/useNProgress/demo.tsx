import { Note } from '@solidjs-use/docs-components'
import { useNProgress } from '@solidjs-use/integrations/useNProgress'
import './style.css'

const Demo = () => {
  const { isLoading, setLoading, progress } = useNProgress()
  return (
    <>
      <Note class="mb-2">Click to change progress status</Note>
      <button onClick={() => setLoading(!isLoading())}>{!isLoading() ? 'Start' : 'Stop'}</button>
      {isLoading() && <b class="ml-2">{((progress() ?? 0) * 100).toFixed(0)}%</b>}
    </>
  )
}

export default Demo
