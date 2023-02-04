import { stringify } from '@solidjs-use/docs-utils'
import { usePointer } from 'solidjs-use'

const Demo = () => {
  const pointer = usePointer()
  return (
    <>
      <pre class="select-none" style="touch-action: none">
        {stringify(pointer)}
      </pre>
    </>
  )
}

export default Demo
