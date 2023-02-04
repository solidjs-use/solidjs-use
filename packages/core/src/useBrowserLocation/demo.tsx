import { stringify } from '@solidjs-use/docs-utils'
import { useBrowserLocation } from 'solidjs-use'

const Demo = () => {
  const location = useBrowserLocation()
  return (
    <>
      <div>
        <pre lang="yaml">{stringify(location())}</pre>
      </div>
    </>
  )
}

export default Demo
