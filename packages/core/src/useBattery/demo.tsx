import { stringify } from '@solidjs-use/docs-utils'
import { useBattery } from 'solidjs-use'

const Demo = () => {
  const battery = useBattery()
  return (
    <>
      <div>
        <pre lang="yaml">{stringify(battery)}</pre>
      </div>
    </>
  )
}

export default Demo
