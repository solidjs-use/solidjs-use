import { stringify } from '@solidjs-use/docs-utils'
import { createSignal } from 'solid-js'
import { usePerformanceObserver } from 'solidjs-use'

const Demo = () => {
  const [entrys, setEntrys] = createSignal<PerformanceEntry[]>([])
  usePerformanceObserver(
    {
      entryTypes: ['paint']
    },
    list => {
      setEntrys(list.getEntries())
    }
  )
  const refresh = () => window.location.reload()
  return (
    <>
      <button onClick={refresh}>refresh</button>
      <pre lang="json">{stringify(entrys())}</pre>
    </>
  )
}

export default Demo
