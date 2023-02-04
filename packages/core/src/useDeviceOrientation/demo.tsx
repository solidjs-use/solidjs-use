import { stringify } from '@solidjs-use/docs-utils'
import { useDeviceOrientation } from 'solidjs-use'

const Demo = () => {
  const orientation = useDeviceOrientation()
  return (
    <>
      <pre lang="yaml">{stringify(orientation)}</pre>
    </>
  )
}

export default Demo
