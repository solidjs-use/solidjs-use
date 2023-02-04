import { stringify } from '@solidjs-use/docs-utils'
import { useMouse } from 'solidjs-use'

const Demo = () => {
  const mouse = useMouse()
  return (
    <>
      <pre lang="yaml">
        {stringify({
          x: mouse.x,
          y: mouse.y,
          sourceType: mouse.sourceType
        })}
      </pre>
    </>
  )
}

export default Demo
