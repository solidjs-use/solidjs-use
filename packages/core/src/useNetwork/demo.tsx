import { stringify } from '@solidjs-use/docs-utils'
import { useNetwork } from 'solidjs-use'

const Demo = () => {
  const network = useNetwork()
  return (
    <>
      <pre lang="yaml">{stringify(network)}</pre>
    </>
  )
}

export default Demo
